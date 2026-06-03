<p align="center">
  <img src="https://img.shields.io/badge/AI驱动-新闻仪表盘-f59e0b?style=for-the-badge&logo=lightning&logoColor=white" alt="AI驱动新闻仪表盘"/>
</p>

<h1 align="center">📰 每日简报</h1>

<p align="center">
  <em>一款高品质新闻仪表盘，每天自动抓取、整理并呈现当日热点资讯——由 AI 驱动，为人而生。</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"/>
  <img src="https://img.shields.io/badge/Vanilla_JS-F7DF1E?style=flat&logo=javascript&logoColor=black" alt="JavaScript"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Claude_AI-6B4FBB?style=flat&logo=anthropic&logoColor=white" alt="Claude AI"/>
</p>

<p align="center">
<a href="README.md">ENGLISH</a>
| 简体中文
</p>

---

## ✨ 这是什么？

**每日简报**是一款自动更新的新闻仪表盘，每天运行一条 AI 流水线，跨 5 个分类抓取、翻译并展示新闻——全部渲染在一个简洁响应式的单页应用中。

无需后端。无需数据库。只需一个智能构建脚本、一个 AI 模型，以及托管在 GitHub Pages 上的静态文件。

> *「如果你的早间新闻简报能每天自动生成，那会怎样？」*

---

## 🎯 功能特性

| 功能 | 说明 |
|------|------|
| 🤖 **AI 精选内容** | Claude 通过实时网络搜索抓取并总结最新新闻 |
| 🌓 **深色 / 浅色模式** | 流畅切换主题，过渡动画丝滑 |
| 🌐 **中英双语** | 每篇文章均提供完整的中英文翻译 |
| 📱 **完全响应式** | 桌面端侧边栏 + 移动端底部导航，适配任意屏幕 |
| 🗂️ **5 大新闻分类** | 科技 · AI · 马来西亚 · 足球 · 环球 |
| 👁️ **屏蔽文章** | 隐藏不感兴趣的内容（通过 localStorage 持久保存） |
| ⚡ **零依赖前端** | 纯 HTML/CSS/JS——无框架，无需构建即可运行 |

---

## 🏗️ 架构设计

```
┌─────────────────────────────────────────────────────┐
│                  get_news.bat                       │
│                （一键每日触发器）                     │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│              build_dashboard.js                     │
│                                                     │
│  1. 调用 Claude CLI 与 Tavily 搜索工具               │
│  2. 分两批并行抓取头条新闻                            │
│  3. 后处理清洗（修复中文引号等问题）                   │
│  4. 写入 news_data.js                               │
│  5. 提交并推送至 GitHub                              │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│               GitHub Pages                          │
│                                                     │
│  index.html ← 加载 news_data.js                     │
│  动态渲染卡片、侧边栏、移动端导航                      │
└─────────────────────────────────────────────────────┘
```

---

## 🚀 快速开始

### 查看仪表盘

👉 **[在线预览](https://jerrytanzx.github.io/daily-brief-news/)**

### 本地运行流水线

**前提条件：**
- [Node.js](https://nodejs.org/)（v18+）
- 已安装并完成身份验证的 [Claude CLI](https://docs.anthropic.com/en/docs/claude-code)
- 在 Claude CLI 中配置好 Tavily MCP 工具

**操作步骤：**

```bash
# 克隆仓库
git clone https://github.com/JerryTanZX/daily-brief-news.git
cd daily-brief-news

# 运行新闻抓取流水线
node build_dashboard.js

# 或在 Windows 上，直接双击：
get_news.bat
```

脚本将依次执行：
1. 调用 Claude 搜索今日热点新闻
2. 生成中英双语摘要
3. 将最新内容写入 `news_data.js`
4. 自动提交并推送至 GitHub（更新在线站点）

---

## 📁 项目结构

```
daily-brief-news/
├── index.html            # 完整前端（单文件 SPA）
├── news_data.js          # AI 生成的新闻数据（每日自动更新）
├── build_dashboard.js    # Node.js 调度器——运行 AI 流水线
├── get_news.bat          # Windows 一键启动器
├── README.md             # 英文说明文档
├── README.zh.md          # 中文说明文档（即本文件）
└── .gitignore
```

---

## 🧠 AI 流水线是如何运作的？

构建脚本通过 Claude（Sonnet）配合实时网络搜索，运行**两个并行批次**：

| 批次 | 分类 |
|------|------|
| 批次 1 | 科技新闻、AI 动态、马来西亚新闻 |
| 批次 2 | 足球新闻、环球资讯 |

每个批次返回结构化的 JavaScript 对象，包含：
- 来源标注与文章链接
- 缩略图
- 中英双语标题、摘要与要点列表

**后处理清洗器**会在写入文件前捕获边缘情况（如未转义的中文引号）——因为就算是 AI，也需要一位文字编辑。😄

---

## 🎨 设计理念

- **报纸风排版** — 标题使用 Playfair Display，正文使用 Source Sans 3
- **细腻质感** — 噪点叠加层与玻璃拟态卡片
- **温暖色调** — 墨水色系搭配琥珀色点缀
- **有意义的动效** — 手风琴展开、悬浮上浮、淡入动画
- **无障碍设计** — 语义化 HTML、合理对比度、键盘可导航

---

## 🛠️ 技术栈

- **前端：** HTML5、Tailwind CSS（CDN）、Vanilla JavaScript
- **AI 引擎：** [Claude](https://anthropic.com)（Sonnet）via Claude CLI
- **网络搜索：** [Tavily](https://tavily.com) 搜索 API（MCP 工具）
- **托管：** GitHub Pages
- **自动化：** Node.js + Windows 批处理脚本

---

## 📝 开源协议

本项目开源，欢迎学习与参考。

---

<p align="center">
  <strong>由 <a href="https://github.com/JerryTanZX">Jerry Tan</a> 用 ☕ 与 AI 倾心打造</strong>
</p>
