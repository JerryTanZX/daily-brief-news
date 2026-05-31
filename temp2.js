const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log("Connecting to proxy and fetching live news data (this may take a minute)...");

// Command forcing Claude to output text ONLY, completely ignoring disk tools
const rawPrompt = `claude -p "Use the tavily search tool with include_images: true to execute live web searches for today's news in 5 exact categories: 1) 10 general tech stories (excluding AI models). 2) AI model updates (Gemini, Claude, ChatGPT). 3) Top 3 highly breaking/controversial local news in Malaysia (omit if none are critical). 4) Top 5 football news (top 5 European leagues, stars, 2026 World Cup). 5) 3 interesting worldwide general news stories. 

Do NOT try to use local disk tools like Write or Bash. Instead, print the finished code directly to the screen wrapped inside a single javascript markdown block. 

You MUST strictly follow this exact structural blueprint layout down to the exact property names, array formats, and bilingual objects. Do not use objects for categories; use an array of objects:

const newsData = {
  ui: {
    en: { siteTitle: 'The Daily Brief', subtitle: 'Premium Edition', readMore: 'Read Full Article', notInterested: 'Not Interested', categories: { 'Tech News': 'Tech News', 'AI Updates': 'AI Updates', 'Malaysia News': 'Malaysia News', 'Football': 'Football', 'Worldwide': 'Worldwide' } },
    zh: { siteTitle: '每日简报', subtitle: '豪华版', readMore: '阅读全文', notInterested: '不感兴趣', categories: { 'Tech News': '科技新闻', 'AI Updates': 'AI更新', 'Malaysia News': '马来西亚新闻', 'Football': '足球新闻', 'Worldwide': '环球动态' } }
  },
  categories: [
    {
      name: 'Tech News',
      items: [
        {
          id: 'tech-001',
          source: 'Source Name',
          image_url: 'URL_HERE',
          article_url: 'URL_HERE',
          en: { title: 'English Title', summary: 'English summary...', details: ['Detail 1', 'Detail 2'] },
          zh: { title: '中文标题', summary: '中文摘要...', details: ['详情1', '详情2'] }
        }
      ]
    }
  ]
};" --dangerously-skip-permissions --model claude-sonnet-4-6`;

const command = rawPrompt.replace(/\r?\n|\r/g, " ");

exec(command, { maxBuffer: 1024 * 1024 * 10 }, (error, stdout, stderr) => {
    if (error) {
        console.error(`Execution Error: ${error}`);
        return;
    }

    // Isolate the clean JavaScript code block from Claude's text response
    const regex = /```javascript([\s\S]*?)```/;
    const match = stdout.match(regex);

    if (match && match[1]) {
        const cleanJS = match[1].trim();
        fs.writeFileSync(path.join(__dirname, 'news_data.js'), cleanJS, 'utf8');
        console.log("\x1b[32m%s\x1b[0m", "Success! news_data.js has been cleanly updated bypassing the proxy bug.");
    } else {
        console.error("Error: Could not extract clean code layout. Raw engine output:");
        console.log(stdout);
    }
});