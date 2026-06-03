const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const util = require('util');

// Converts standard callbacks into promises so we can run them sequentially using await
const execPromise = util.promisify(exec);

// Post-processing: Fix unescaped ASCII double quotes used as Chinese quotation marks inside JS strings.
// Pattern: CJK char + " + CJK-only content (no ASCII structural chars) + " + CJK char
// Replace inner quotes with CJK corner brackets「」which are safe in JS strings.
function sanitizeChineseQuotes(text) {
    const cjk = '\\u4e00-\\u9fff\\u3400-\\u4dbf\\uff00-\\uffef\\u3000-\\u303f';
    const punct = '\\uff0c\\u3002\\u3001\\uff1b\\uff1a\\uff01\\uff1f\\u2026\\u2014\\uff5e\\u00b7\\uff08\\uff09';
    const charClass = `[${cjk}${punct}]`;
    const inner = `[^",:{}\\[\\]]{1,50}`;
    const regex = new RegExp(`(${charClass})"(${inner})"(?=${charClass})`, 'g');
    return text.replace(regex, '$1「$2」');
}

async function runDailyAutomation() {
    console.log("Connecting to proxy and initiating Smart Batching pipeline...");

    const fetchTime = new Date();
    const timestamp = fetchTime.toLocaleString('en-US', { 
        weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short' 
    });

    // Strategy: Hardcode the UI text locally to save thousands of API tokens!
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
    3. MINIFY the output Javascript. Do not use any tabs, indents, or unnecessary line breaks.
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
    3. MINIFY the output Javascript. Do not use any tabs, indents, or unnecessary line breaks.
    4. In Chinese text, use「」for quotation marks, NEVER use ASCII double quotes inside string values.

    OUTPUT FORMAT: Print ONLY the raw inner category objects separated by commas, wrapped in a single javascript code block. You MUST follow this exact blueprint structural layout down to the exact key names:
    { name: 'Football', items: [ { id: 'fb-001', date: 'Date', source: 'Source', image_url: 'URL', article_url: 'URL', en: { title: 'Title', summary: '1 short sentence.', details: ['D1', 'D2'] }, zh: { title: '标题', summary: '摘要', details: ['详情1', '详情2'] } } ] },
    { name: 'Worldwide', items: [ { id: 'ww-001', date: 'Date', source: 'Source', image_url: 'URL', article_url: 'URL', en: { title: 'Title', summary: '1 short sentence.', details: ['D1', 'D2'] }, zh: { title: '标题', summary: '摘要', details: ['详情1', '详情2'] } } ] }" --dangerously-skip-permissions --model claude-sonnet-4-6`;

    try {
        // Run Step 1
        console.log("⏳ Fetching Batch 1: Tech, AI, and Malaysia News...");
        const { stdout: stdout1 } = await execPromise(prompt1.replace(/\r?\n|\r/g, " "), { encoding: 'utf8' });

        // Run Step 2
        console.log("⏳ Fetching Batch 2: Football and Worldwide News...");
        const { stdout: stdout2 } = await execPromise(prompt2.replace(/\r?\n|\r/g, " "), { encoding: 'utf8' });

        // Extract raw data from markdown blocks
        const regex = /```javascript([\s\S]*?)```/;
        const match1 = stdout1.match(regex);
        const match2 = stdout2.match(regex);

        if (match1 && match1[1] && match2 && match2[1]) {
            const part1Text = sanitizeChineseQuotes(match1[1].trim());
            const part2Text = sanitizeChineseQuotes(match2[1].trim());

            // Stitch the text blocks back together with a clean structural bridge comma
            const combinedCategories = `${part1Text},\n    ${part2Text}`;

            // Rebuild your master file template entirely locally using clean variables
            const finalScriptOutput = `const newsData = {\n  lastUpdated: '${timestamp}',\n  ui: ${JSON.stringify(uiTemplate, null, 2)},\n  categories: [\n    ${combinedCategories}\n  ]\n};`;

            // Write the cleanly concatenated file to your folder
            fs.writeFileSync(path.join(__dirname, 'news_data.js'), finalScriptOutput, 'utf8');
            console.log("\x1b[32m%s\x1b[0m", "✅ Success! news_data.js has been beautifully consolidated and updated locally.");

            // Initiate GitHub Deployments
            console.log("Pushing fresh batch updates to GitHub Pages...");
            const gitCommand = 'git add news_data.js && git commit -m "Automated daily news update (Batched Build)" && git push origin main';
            await execPromise(gitCommand);
            console.log("\x1b[36m%s\x1b[0m", "🚀 Website deployed successfully! Fresh batch data is live!");

        } else {
            console.error("❌ Extraction Error: One of the batch outputs failed to return valid structural data fragments.");
        }
    } catch (err) {
        console.error(`❌ Automation Crash: ${err.message}`);
    }
}

runDailyAutomation();