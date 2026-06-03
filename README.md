<p align="center">
  <img src="https://img.shields.io/badge/AI--Powered-News%20Dashboard-f59e0b?style=for-the-badge&logo=lightning&logoColor=white" alt="AI-Powered News Dashboard"/>
</p>

<h1 align="center">📰 The Daily Brief</h1>

<p align="center">
  <em>A premium news dashboard that fetches, curates, and presents the day's top stories — powered by AI, built for humans.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"/>
  <img src="https://img.shields.io/badge/Vanilla_JS-F7DF1E?style=flat&logo=javascript&logoColor=black" alt="JavaScript"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Claude_AI-6B4FBB?style=flat&logo=anthropic&logoColor=white" alt="Claude AI"/>
</p>

---

## ✨ What Is This?

**The Daily Brief** is a self-updating news dashboard that runs a daily AI pipeline to gather, translate, and display news across 5 categories — all rendered in a clean, responsive single-page app.

No backend. No database. Just a smart build script, an AI model, and static files served on GitHub Pages.

> *"What if your morning news briefing built itself every day?"*

---

## 🎯 Features

| Feature | Description |
|---------|-------------|
| 🤖 **AI-Curated Content** | Claude fetches and summarizes the latest news via live web search |
| 🌓 **Dark / Light Mode** | Toggle between themes with smooth transitions |
| 🌐 **Bilingual (EN / 中文)** | Full English and Chinese translations for every article |
| 📱 **Fully Responsive** | Desktop sidebar + mobile bottom nav, works on any screen |
| 🗂️ **5 News Categories** | Tech · AI · Malaysia · Football · Worldwide |
| 👁️ **Dismiss Stories** | Hide articles you're not interested in (persists in localStorage) |
| ⚡ **Zero Dependencies** | Pure HTML/CSS/JS frontend — no frameworks, no build step to view |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                  get_news.bat                        │
│            (one-click daily trigger)                 │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│              build_dashboard.js                      │
│                                                     │
│  1. Spawns Claude CLI with Tavily search tool       │
│  2. Fetches top stories in 2 parallel batches       │
│  3. Sanitizes output (Chinese quote fix, etc.)      │
│  4. Writes news_data.js                             │
│  5. Commits & pushes to GitHub                      │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│               GitHub Pages                          │
│                                                     │
│  index.html ← loads news_data.js                    │
│  Renders cards, sidebar, mobile nav dynamically     │
└─────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start

### View the Dashboard

👉 **[Live Site](https://jerrytanzx.github.io/daily-brief-news/)**

### Run the Pipeline Locally

**Prerequisites:**
- [Node.js](https://nodejs.org/) (v18+)
- [Claude CLI](https://docs.anthropic.com/en/docs/claude-code) installed and authenticated
- Tavily MCP tool configured in Claude CLI

**Steps:**

```bash
# Clone the repo
git clone https://github.com/JerryTanZX/daily-brief-news.git
cd daily-brief-news

# Run the news fetch pipeline
node build_dashboard.js

# Or on Windows, just double-click:
get_news.bat
```

The script will:
1. Query Claude to search the web for today's top stories
2. Generate bilingual summaries (EN + ZH)
3. Write `news_data.js` with fresh content
4. Auto-commit and push to GitHub (updates the live site)

---

## 📁 Project Structure

```
daily-brief-news/
├── index.html            # The entire frontend (single-file SPA)
├── news_data.js          # AI-generated news data (auto-updated daily)
├── build_dashboard.js    # Node.js orchestrator — runs the AI pipeline
├── get_news.bat          # Windows one-click launcher
├── README.md             # You are here
└── .gitignore
```

---

## 🧠 How the AI Pipeline Works

The build script runs **two parallel batches** through Claude (Sonnet) with live web search:

| Batch | Categories |
|-------|-----------|
| Batch 1 | Tech News, AI Updates, Malaysia News |
| Batch 2 | Football, Worldwide |

Each batch returns structured JavaScript objects with:
- Source attribution and article URLs
- Thumbnail images
- Bilingual titles, summaries, and bullet-point details

A **post-processing sanitizer** catches edge cases (like unescaped Chinese quotation marks) before writing the final file — because even AI needs a copy editor. 😄

---

## 🎨 Design Philosophy

- **Newspaper-inspired typography** — Playfair Display for headlines, Source Sans 3 for body
- **Subtle textures** — noise overlay and glass-morphism cards
- **Warm color palette** — ink tones with amber accents
- **Motion with purpose** — accordion reveals, hover lifts, fade-in animations
- **Accessibility** — semantic HTML, proper contrast ratios, keyboard-navigable

---

## 🛠️ Built With

- **Frontend:** HTML5, Tailwind CSS (CDN), Vanilla JavaScript
- **AI Engine:** [Claude](https://anthropic.com) (Sonnet) via Claude CLI
- **Web Search:** [Tavily](https://tavily.com) search API (MCP tool)
- **Hosting:** GitHub Pages
- **Automation:** Node.js + Windows batch script

---

## 📝 License

This project is open source and available for learning and inspiration.

---

<p align="center">
  <strong>Made with ☕ and AI by <a href="https://github.com/JerryTanZX">Jerry Tan</a></strong>
</p>
