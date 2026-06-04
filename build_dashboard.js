const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const util = require('util');

const execPromise = util.promisify(exec);

// Post-processing: Fix unescaped ASCII double quotes used as Chinese quotation marks inside JS strings.
function sanitizeChineseQuotes(text) {
    const cjk = '\\u4e00-\\u9fff\\u3400-\\u4dbf\\uff00-\\uffef\\u3000-\\u303f';
    const punct = '\\uff0c\\u3002\\u3001\\uff1b\\uff1a\\uff01\\uff1f\\u2026\\u2014\\uff5e\\u00b7\\uff08\\uff09';
    const charClass = `[${cjk}${punct}]`;
    const inner = `[^",:{}\\[\\]]{1,50}`;
    const regex = new RegExp(`(${charClass})"(${inner})"(?=${charClass})`, 'g');
    return text.replace(regex, '$1「$2」');
}

// String-aware minifier: strips whitespace/newlines outside of string literals.
// Handles both single and double quoted strings and escaped chars safely.
function minifyJS(text) {
    let result = '';
    let inStr = false;
    let strChar = '';
    let escaped = false;
    for (let i = 0; i < text.length; i++) {
        const c = text[i];
        if (escaped) {
            result += c;
            escaped = false;
            continue;
        }
        if (inStr) {
            if (c === '\\') { escaped = true; result += c; continue; }
            if (c === strChar) inStr = false;
            result += c;
            continue;
        }
        // Outside strings: skip whitespace and newlines
        if (c === '"' || c === "'") { inStr = true; strChar = c; result += c; continue; }
        if (c === '\n' || c === '\r') continue;
        if (c === ' ' || c === '\t') {
            // Collapse multiple spaces to one only between tokens that need it
            // (JS object/array syntax never needs spaces, so we can drop all)
            continue;
        }
        result += c;
    }
    return result;
}

// Validate JS syntax by wrapping categories text in a test object and parsing it.
// Returns null on success, or the error message string on failure.
function validateSyntax(categoriesText) {
    try {
        new Function(`const __test={categories:[${categoriesText}]};`);
        return null;
    } catch (e) {
        return e.message;
    }
}

// Ask Claude to fix broken JS output. Returns the fixed categories text or throws.
async function repairWithClaude(brokenText, errorMessage, batchLabel) {
    console.log(`🔧 Syntax error in ${batchLabel}: "${errorMessage}". Asking Claude to repair...`);
    const repairPrompt = `claude -p "You are a JavaScript syntax repair tool. A code snippet has a syntax error and you must fix it so it runs without any errors.

SYNTAX ERROR: ${errorMessage}

BROKEN SNIPPET:
\`\`\`javascript
${brokenText}
\`\`\`

INSTRUCTIONS:
1. Identify the exact cause of the syntax error (missing bracket, brace, quote, comma, etc.).
2. Fix ONLY what is broken. Do NOT change any data values, URLs, text content, or news items.
3. Before outputting, mentally run through the fixed code and confirm: every { has a matching }, every [ has a matching ], every string is properly closed, no trailing commas before } or ].
4. Use 2-space indentation so the structure is easy to read.
5. In Chinese text, use「」for quotation marks — NEVER use ASCII double quotes inside string values.
6. Output ONLY the corrected javascript code block with zero explanation." --dangerously-skip-permissions --model claude-sonnet-4-6`;

    const { stdout } = await execPromise(repairPrompt.replace(/\r?\n|\r/g, ' '), { encoding: 'utf8' });
    const regex = /```javascript([\s\S]*?)```/;
    const match = stdout.match(regex);
    if (!match || !match[1]) throw new Error('Claude repair response contained no code block.');
    return match[1].trim();
}

// Extract, sanitize, validate, and repair (if needed) a batch output.
// Returns minified categories text ready to stitch, or throws after max retries.
async function processBatch(stdout, batchLabel, MAX_RETRIES = 2) {
    const regex = /```javascript([\s\S]*?)```/;
    const match = stdout.match(regex);
    if (!match || !match[1]) throw new Error(`${batchLabel}: No javascript code block found in output.`);

    let text = sanitizeChineseQuotes(match[1].trim());

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
        const err = validateSyntax(text);
        if (!err) {
            // Valid — minify and return
            console.log(`✅ ${batchLabel}: Syntax valid${attempt > 0 ? ` after ${attempt} repair(s)` : ''}.`);
            return minifyJS(text);
        }
        if (attempt === MAX_RETRIES) {
            throw new Error(`${batchLabel}: Syntax still invalid after ${MAX_RETRIES} repair attempts. Last error: ${err}`);
        }
        // Repair and retry
        text = await repairWithClaude(text, err, batchLabel);
        text = sanitizeChineseQuotes(text);
    }
}

async function runDailyAutomation() {
    console.log("Connecting to proxy and initiating Smart Batching pipeline...");

    const fetchTime = new Date();
    const timestamp = fetchTime.toLocaleString('en-US', {
        weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short'
    });

    const uiTemplate = {
        en: {
            siteTitle: 'The Daily Brief', subtitle: 'Premium Edition', readMore: 'Read Full Article', notInterested: 'Not Interested',
            categories: { 'Tech News': 'Tech News', 'AI Updates': 'AI Updates', 'Malaysia News': 'Malaysia News', 'Football': 'Football', 'Worldwide': 'Worldwide' }
        },
        zh: {
            siteTitle: '每日简报', subtitle: '豪华版', readMore: '阅读全文', notInterested: '不感兴趣',
            categories: { 'Tech News': '科技新闻', 'AI Updates': 'AI更新', 'Malaysia News': '马来西亚新闻', 'Football': '足球新闻', 'Worldwide': '环球动态' }
        }
    };

    // BATCH 1 PROMPT: Categories 1, 2, and 3
    const prompt1 = `claude -p "Use the tavily search tool with include_images: true for live web searches. Current time: ${timestamp}. STRICT 24-HOUR RULE: Only include articles published within the last 24 hours. Max 4 items per category. If none match, return empty array.
    Categories: 1) Top 4 general tech news (excluding AI models). 2) Top 4 AI model updates. 3) Top 4 local news in Malaysia.

    TOKEN LIMIT WARNING: You MUST:
    1. Limit 'summary' text to 1 short sentence.
    2. Limit 'details' array to MAXIMUM 3 short bullet points per language.
    3. Format the output Javascript with 2-space indentation. Each object property on its own line. This makes bracket structure easy to verify — every opening { or [ must have a matching closing } or ] on its own line.
    4. In Chinese text, use「」for quotation marks, NEVER use ASCII double quotes inside string values.

    OUTPUT FORMAT: Print ONLY the raw inner category objects separated by commas, wrapped in a single javascript code block. Do NOT wrap in an outer array. You MUST follow this exact blueprint structural layout down to the exact key names:
    { name: 'Tech News', items: [ { id: 'tech-001', date: 'Date', source: 'Source', image_url: 'URL', article_url: 'URL', en: { title: 'Title', summary: '1 short sentence.', details: ['D1', 'D2'] }, zh: { title: '标题', summary: '摘要', details: ['详情1', '详情2'] } } ] },
    { name: 'AI Updates', items: [ { id: 'ai-001', date: 'Date', source: 'Source', image_url: 'URL', article_url: 'URL', en: { title: 'Title', summary: '1 short sentence.', details: ['D1', 'D2'] }, zh: { title: '标题', summary: '摘要', details: ['详情1', '详情2'] } } ] },
    { name: 'Malaysia News', items: [ { id: 'my-001', date: 'Date', source: 'Source', image_url: 'URL', article_url: 'URL', en: { title: 'Title', summary: '1 short sentence.', details: ['D1', 'D2'] }, zh: { title: '标题', summary: '摘要', details: ['详情1', '详情2'] } } ] }" --dangerously-skip-permissions --model claude-sonnet-4-6`;

    // BATCH 2 PROMPT: Categories 4 and 5
    const prompt2 = `claude -p "Use the tavily search tool with include_images: true for live web searches. Current time: ${timestamp}. STRICT 24-HOUR RULE: Only include articles published within the last 24 hours. Max 4 items per category.
    Categories: 4) Top 4 football news (top 5 European leagues, stars, 2026 World Cup). 5) Top 4 interesting worldwide news.

    TOKEN LIMIT WARNING: You MUST:
    1. Limit 'summary' text to 1 short sentence.
    2. Limit 'details' array to MAXIMUM 3 short bullet points per language.
    3. Format the output Javascript with 2-space indentation. Each object property on its own line. This makes bracket structure easy to verify — every opening { or [ must have a matching closing } or ] on its own line.
    4. In Chinese text, use「」for quotation marks, NEVER use ASCII double quotes inside string values.

    OUTPUT FORMAT: Print ONLY the raw inner category objects separated by commas, wrapped in a single javascript code block. You MUST follow this exact blueprint structural layout down to the exact key names:
    { name: 'Football', items: [ { id: 'fb-001', date: 'Date', source: 'Source', image_url: 'URL', article_url: 'URL', en: { title: 'Title', summary: '1 short sentence.', details: ['D1', 'D2'] }, zh: { title: '标题', summary: '摘要', details: ['详情1', '详情2'] } } ] },
    { name: 'Worldwide', items: [ { id: 'ww-001', date: 'Date', source: 'Source', image_url: 'URL', article_url: 'URL', en: { title: 'Title', summary: '1 short sentence.', details: ['D1', 'D2'] }, zh: { title: '标题', summary: '摘要', details: ['详情1', '详情2'] } } ] }" --dangerously-skip-permissions --model claude-sonnet-4-6`;

    try {
        // Run both batches
        console.log("⏳ Fetching Batch 1: Tech, AI, and Malaysia News...");
        const { stdout: stdout1 } = await execPromise(prompt1.replace(/\r?\n|\r/g, " "), { encoding: 'utf8' });

        console.log("⏳ Fetching Batch 2: Football and Worldwide News...");
        const { stdout: stdout2 } = await execPromise(prompt2.replace(/\r?\n|\r/g, " "), { encoding: 'utf8' });

        // Process each batch: extract → sanitize → validate → repair if needed → minify
        const part1Text = await processBatch(stdout1, 'Batch 1');
        const part2Text = await processBatch(stdout2, 'Batch 2');

        // Stitch together
        const combinedCategories = `${part1Text},\n    ${part2Text}`;

        // Final combined validation before writing
        const finalErr = validateSyntax(combinedCategories);
        if (finalErr) throw new Error(`Combined categories failed final validation: ${finalErr}`);

        // Rebuild master file
        const finalScriptOutput = `const newsData = {\n  lastUpdated: '${timestamp}',\n  ui: ${JSON.stringify(uiTemplate, null, 2)},\n  categories: [\n    ${combinedCategories}\n  ]\n};`;

        fs.writeFileSync(path.join(__dirname, 'news_data.js'), finalScriptOutput, 'utf8');
        console.log("\x1b[32m%s\x1b[0m", "✅ Success! news_data.js has been validated and updated.");

        // Push to GitHub
        console.log("Pushing fresh batch updates to GitHub Pages...");
        const gitCommand = 'git add news_data.js && git commit -m "Automated daily news update" && git push origin main';
        await execPromise(gitCommand);
        console.log("\x1b[36m%s\x1b[0m", "🚀 Website deployed successfully!");

    } catch (err) {
        console.error(`❌ Automation Crash: ${err.message}`);
    }
}

runDailyAutomation();
