const newsData = {
  lastUpdated: "May 31, 2026",

  categories: {
    tech: {
      title: "Tech News",
      icon: "💻",
      stories: [
        {
          id: "tech-1",
          title: "Blue Origin New Glenn Rocket Explodes on Launchpad During Test Fire",
          summary: "Jeff Bezos' Blue Origin suffered a massive setback when its New Glenn rocket exploded during a static hotfire test at Cape Canaveral Space Force Station on May 28. The blast destroyed the rocket and severely damaged the launchpad, toppling a 600-foot lightning tower. No injuries were reported. The explosion threatens NASA's Artemis moon program timeline and puts Amazon's Leo satellite constellation plans at risk, just as SpaceX eyes a $1.25 trillion IPO.",
          source: "CBS News / NYT",
          url: "https://www.cbsnews.com/news/blue-origin-new-glenn-rocket-explodes-launchpad-florida",
          image: "https://d3i6fh83elv35t.cloudfront.net/static/2026/05/2026-05-29T110631Z_1539328339_RC2YILA1RFM7_RTRMADP_3_BLUE-ORIGIN-TEST-EXPLOSION-1024x574.jpg",
          category: "Space",
          date: "May 29, 2026"
        },
        {
          id: "tech-2",
          title: "Computex 2026 Kicks Off: Nvidia, AMD, Intel & Qualcomm Take Centre Stage in Taipei",
          summary: "Asia's largest tech show opens June 2 in Taipei with major chip announcements expected from Nvidia, AMD, Intel, and Qualcomm. Qualcomm unveiled its new Snapdragon C series targeting budget laptops from $300 and up, directly challenging Apple's $600 MacBook Neo. Acer is first to market with the Aspire Go 15 featuring the new chip. Samsung Display is also showcasing the world's first 4K 360Hz QD-OLED panel at the show.",
          source: "PCMag / Gizmodo",
          url: "https://gizmodo.com/qualcomms-new-compute-chip-wants-to-knock-the-macbook-neo-off-its-pedestal-2000764258",
          image: "https://gizmodo.com/app/uploads/2026/05/Acer-Aspire-Go-15-Qualcomm-C-1280x853.jpg",
          category: "Hardware",
          date: "May 28, 2026"
        },
        {
          id: "tech-3",
          title: "Samsung Unveils World's First 4K 360Hz QD-OLED Gaming Panel",
          summary: "Samsung Display revealed the world's first 4K 360Hz QD-OLED monitor panel at Computex 2026, featuring dual-mode support at 680Hz Full HD and Display HDR True Black 600 certification. The panel uses a new V-stripe pixel structure for improved text readability. Samsung is in talks with 10 global brands to supply the panel, with mass production slated for the second half of 2026 and consumer monitors expected in early 2027.",
          source: "Viktor's Reality / PCMag",
          url: "https://www.pcmag.com/news/computex-2026-preview-9-big-reveals-we-expect-at-asias-largest-tech-show",
          image: "https://cdn.mos.cms.futurecdn.net/KaedeAaVVbcPJthb58PNQn-2560-80.jpg",
          category: "Hardware",
          date: "May 28, 2026"
        },
        {
          id: "tech-4",
          title: "Apple Vision Pro 2 Ships 1.2 Million Units in First Two Weeks",
          summary: "Apple's Vision Pro 2 headset has shipped 1.2 million units in its first two weeks — 50% more than the original model in a comparable window. The new headset weighs 470g (down from 540g), retails at $1,099 (a $300 reduction), and features a redesigned Lumen waveguide display with silicon-photonic eye tracking. Unity reported a 62% increase in mixed-reality project submissions to its App Store in May, signalling rapid developer adoption.",
          source: "The Verge / MIT Media Lab",
          url: "https://llodo.com/technology/technology-news-may-2026-breakthroughs-market-shifts-and-real-world-impact-2.html",
          image: "https://rcuk.com/wp-content/uploads/2025/11/Blog-Header-Tech-Predictions-for-2026.png",
          category: "Consumer Tech",
          date: "May 27, 2026"
        },
        {
          id: "tech-5",
          title: "Microsoft to Unveil New Homegrown Coding Model at Build 2026 Conference",
          summary: "Microsoft will reveal a suite of new in-house AI models at its annual Build developer conference in San Francisco, including a coding model aimed at boosting GitHub Copilot usage. Additional models specialising in transcription, reasoning, speech, and image tasks are also planned. The move comes as Microsoft looks to reduce its dependence on OpenAI and reassert its AI leadership against rivals Google and Amazon.",
          source: "Reuters",
          url: "https://www.reuters.com/business/microsoft-release-new-coding-model-next-week-information-reports-2026-05-28",
          image: "https://i.ytimg.com/vi/sYy7KThSSvo/maxresdefault.jpg",
          category: "Software",
          date: "May 28, 2026"
        },
        {
          id: "tech-6",
          title: "S&P 500 Hits Record High as Tech Earnings Drive Eight-Week Rally",
          summary: "US equity markets extended their winning streak to eight consecutive weeks, with the S&P 500 reaching 7,580 — up 10.73% year-to-date. The NASDAQ surged 16.05% YTD to 26,972. Tech sector earnings are on pace for 27% year-over-year growth in Q1 2026, more than double consensus expectations. Raymond James CIO Larry Adam cited 'stronger than expected earnings — especially in technology' as the key driver.",
          source: "Raymond James",
          url: "https://www.raymondjames.com/sia/resources/2026/05/29/may-review-tech-earnings-drive-markets-despite-macro-uncertainty",
          image: "https://solutionsreview.com/wp-content/uploads/2026/04/Artificial-Intelligence-2026-05-01.jpg",
          category: "Business",
          date: "May 29, 2026"
        },
        {
          id: "tech-7",
          title: "Russian Spies Aggressively Targeting Western Technology as Sanctions Bite",
          summary: "Three senior European intelligence officials told the Associated Press that Russia's intelligence agencies have significantly escalated efforts to steal Western technology and defence secrets as wartime sanctions squeeze the country's economy. Officials warned that treating Russia as a comparable Western-style nation is 'very dangerous,' as the country operates under fundamentally different rules of engagement in the intelligence space.",
          source: "Associated Press",
          url: "https://www.ottumwacourier.com/news/business/russian-spies-are-aggressively-seeking-western-technology-as-sanctions-bite-officials-say/article_db692f0d-b158-595b-82c7-34c0507905d5.html",
          image: "https://lookaside.instagram.com/seo/google_widget/crawler/?media_id=3865189751918109934",
          category: "Cybersecurity",
          date: "May 29, 2026"
        },
        {
          id: "tech-8",
          title: "US Army Asks Vendors to 'Jailbreak' Their Own Systems in Integration Push",
          summary: "The US Army has launched a 'right to integrate' initiative, asking its technology vendors to actively break open their own proprietary systems to allow seamless data sharing across Army platforms. The effort aims to end the longstanding problem of soldiers having to act as their own system integrators on the battlefield. Officials say the current fragmented tech ecosystem creates dangerous operational gaps in combat scenarios.",
          source: "Federal News Network",
          url: "https://federalnewsnetwork.com/army/2026/05/army-asks-its-vendors-to-jailbreak-their-own-systems",
          image: "https://i.ytimg.com/vi/PPcQH0_ciV8/maxresdefault.jpg",
          category: "Defence Tech",
          date: "May 29, 2026"
        },
        {
          id: "tech-9",
          title: "Open-Source ESMFold2 Surpasses AlphaFold3 in Protein Structure Prediction",
          summary: "Chan Zuckerberg Biohub released ESMFold2, a fully open-source AI model that its developers say outperforms Google DeepMind's AlphaFold3 in protein structure prediction. The model was used to build a comprehensive atlas of protein biology, covering the most unknown regions of the proteome. Scientists praised the open-source approach, though the model enters an increasingly crowded field of competing protein-structure AI systems.",
          source: "Nature",
          url: "https://www.nature.com/articles/d41586-026-01686-3",
          image: "https://hjfjyu.com/wp-content/uploads/2026/05/The-Latest-AI-News-We-Announced-in-May-2026.jpg",
          category: "Science & Tech",
          date: "May 27, 2026"
        },
        {
          id: "tech-10",
          title: "California Lawmakers Pass Bills Limiting AI in Healthcare, Education & Energy",
          summary: "California legislators passed a series of bills requiring humans to retain key decision-making roles in healthcare, K-12 education, and the state's electrical and gas systems — explicitly limiting AI autonomy in these sectors. The bills cleared their originating chambers ahead of the legislative deadline. Labour groups backing the measures argued that 'accepting catastrophic job displacement is a political choice,' as over 85,000 US tech jobs have been cut in 2026 so far.",
          source: "SF Examiner",
          url: "https://www.sfexaminer.com/news/technology/policymakers-divided-over-response-to-ai-job-loss-fears/article_ee980ecf-50d3-434e-883b-b47ea2c1ed9c.html",
          image: "https://unrot.co/_next/image?url=https%3A%2F%2Fbuildfastwithai.s3.eu-north-1.amazonaws.com%2Funrot-blog-images%2F3b351ac5-084a-4f76-8960-a54225f71593-8674300c-b7c1-4f53-95b4-9ce6ca728a96.png&w=3840&q=75",
          category: "Policy",
          date: "May 30, 2026"
        }
      ]
    },

    ai: {
      title: "AI Model Updates",
      icon: "🤖",
      stories: [
        {
          id: "ai-1",
          title: "Anthropic Launches Claude Opus 4.8 with Effort Control & Mid-Task Instruction Updates",
          summary: "Anthropic released Claude Opus 4.8, a new flagship model with improved coding capabilities and two major developer features: an effort control slider letting users choose response depth vs. speed, and support for system entries inside the messages array — allowing developers to update Claude's instructions mid-task without breaking the prompt cache. Anthropic also announced it is nearing a $65B Series H funding round at a $965B post-money valuation.",
          source: "Anthropic",
          url: "https://www.anthropic.com/news/claude-opus-4-8",
          image: "https://imfounder.com/wp-content/uploads/2026/05/7-explosive-ai-update-may-2026.jpg",
          category: "LLM Release",
          date: "May 28, 2026"
        },
        {
          id: "ai-2",
          title: "Anthropic Plans to Release Mythos-Class AI Models to All Customers 'Within Weeks'",
          summary: "Alongside Opus 4.8, Anthropic announced it has made 'swift progress' on safety safeguards that will allow it to release Mythos-level models — previously deemed too dangerous for public release due to advanced cybersecurity capabilities — to all customers within weeks. A small number of organisations are currently using Claude Mythos Preview for cybersecurity work under Project Glasswing.",
          source: "Bloomberg / Insurance Journal",
          url: "https://www.insurancejournal.com/news/national/2026/05/29/871703.htm",
          image: "https://solutionsreview.com/wp-content/uploads/2026/04/Artificial-Intelligence-2026-05-01.jpg",
          category: "AI Safety",
          date: "May 29, 2026"
        },
        {
          id: "ai-3",
          title: "Gemini 3.5 Flash Goes GA as Default Model for 900M+ Google App Users",
          summary: "Google made Gemini 3.5 Flash generally available on May 19, replacing gemini-3-flash-preview as the default model in the Gemini app and AI Mode in Google Search worldwide. The rollout instantly reached 900 million Gemini app monthly active users and 1 billion AI Mode MAU, making it the single highest-reach model launch of May 2026. Google also launched Managed Agents in the Gemini API and Gemini Omni Flash on the same day.",
          source: "Digital Applied",
          url: "https://www.digitalapplied.com/blog/ai-model-releases-may-2026-complete-tracker",
          image: "https://www.digitalapplied.com/blog/ai-model-releases-may-2026-complete-tracker/article-image",
          category: "LLM Release",
          date: "May 19, 2026"
        },
        {
          id: "ai-4",
          title: "Cursor Releases Composer 2.5: Lowest Per-Task Cost of Any Frontier Coding Model",
          summary: "Cursor launched Composer 2.5, its new coding-focused model, delivering the lowest effective per-task cost of any frontier-class model at launch — $0.10 uncached at 100K input / 20K output tokens. The model is positioned as the most significant pricing event for coding teams in 2026, undercutting rivals at a time when overall AI compute costs are rising sharply due to agentic workflows consuming far more tokens per task.",
          source: "Digital Applied / YouTube",
          url: "https://www.digitalapplied.com/blog/ai-model-releases-may-2026-complete-tracker",
          image: "https://hjfjyu.com/wp-content/uploads/2026/05/The-Latest-AI-News-We-Announced-in-May-2026.jpg",
          category: "Coding AI",
          date: "May 18, 2026"
        },
        {
          id: "ai-5",
          title: "OpenAI Foundation Commits $250M to Address AI-Driven Job Displacement",
          summary: "The OpenAI Foundation announced a $250 million commitment on May 27 toward grants, research partnerships, and direct programmes to help workers and economies navigate AI-driven job displacement. The announcement came the same week Meta laid off 8,000 employees (10% of its workforce), Intuit cut 3,000 workers citing AI efficiencies, and Cisco shed nearly 4,000 jobs. Through April 2026, over 85,000 US tech jobs had been eliminated — a 33% increase year-over-year.",
          source: "Medium / Reuters",
          url: "https://medium.com/write-a-catalyst/ai-update-may-28-dda600580b50",
          image: "https://unrot.co/_next/image?url=https%3A%2F%2Fbuildfastwithai.s3.eu-north-1.amazonaws.com%2Funrot-blog-images%2F3b351ac5-084a-4f76-8960-a54225f71593-8674300c-b7c1-4f53-95b4-9ce6ca728a96.png&w=3840&q=75",
          category: "AI & Society",
          date: "May 27, 2026"
        },
        {
          id: "ai-6",
          title: "Microsoft Copilot Studio Computer-Use Goes GA Across All Commercial Geographies",
          summary: "Microsoft made its Copilot Studio computer-use agent capability generally available to all commercial geographies on May 13, marking the most significant enterprise automation deployment event of May 2026. The feature allows AI agents to directly operate desktop applications and web browsers on behalf of users. Microsoft also plans to unveil additional homegrown models at its Build 2026 conference covering transcription, reasoning, speech, and image tasks.",
          source: "Digital Applied",
          url: "https://www.digitalapplied.com/blog/ai-model-releases-may-2026-complete-tracker",
          image: "https://imfounder.com/wp-content/uploads/2026/05/7-explosive-ai-update-may-2026.jpg",
          category: "Enterprise AI",
          date: "May 13, 2026"
        }
      ]
    },

    malaysia: {
      title: "Malaysia News",
      icon: "🇲🇾",
      stories: [
        {
          id: "my-1",
          title: "PM Anwar Raises Sabah's Special Grant Interim Payment to RM1.5 Billion",
          summary: "Prime Minister Anwar Ibrahim announced an increase in Sabah's special grant interim payment from RM600 million to RM1.5 billion for the coming year, while visiting the state for the Kaamatan harvest festival. The announcement comes as Sabah continues to press for its full 40% revenue entitlement under the Malaysia Agreement 1963. Anwar said he wants to be known as a leader who keeps his promises and takes care of all races, religions, and states.",
          source: "Straits Times / Malay Mail",
          url: "https://www.straitstimes.com/asia/se-asia/sabahs-special-grant-interim-payment-increased-to-483-million-next-year-says-pm-anwar",
          image: "https://lookaside.instagram.com/seo/google_widget/crawler/?media_id=3903669065403073947",
          category: "Politics",
          date: "May 30, 2026"
        },
        {
          id: "my-2",
          title: "Malaysia Condemns Israel's Plan to Seize 70% of Gaza as 'Evil and Unacceptable'",
          summary: "Malaysia's Foreign Ministry issued a strong condemnation of Israel's announced plan to seize and expand control over 70% of the Gaza Strip, calling it 'illegal, politically unacceptable, and an egregious violation of international law.' Wisma Putra called on the international community and the UN to unequivocally reject the plan, reiterating Malaysia's unwavering solidarity with the Palestinian people and support for an independent Palestinian state based on pre-1967 borders.",
          source: "Bernama",
          url: "https://bernama.com/en/news.php?id=2563130",
          image: "https://lookaside.instagram.com/seo/google_widget/crawler/?media_id=3864878297423414122",
          category: "Foreign Affairs",
          date: "May 30, 2026"
        },
        {
          id: "my-3",
          title: "Malaysia Joins 16 Nations to Launch Underwater Infrastructure Security Framework at Shangri-La Dialogue",
          summary: "Malaysia, Singapore, and 15 other nations launched the GUIDE initiative at the Shangri-La Dialogue in Singapore — a new framework to strengthen the security of critical underwater infrastructure (CUI) including undersea cables and pipelines vital for global communications and trade. Defence Minister Mohamed Khaled Nordin also stated that Malaysia will prioritise arms deals with countries willing to transfer technology, as part of a new policy of defence self-reliance.",
          source: "NST / Free Malaysia Today",
          url: "https://www.freemalaysiatoday.com/category/nation/2026/05/30/technology-transfer-is-key-in-arms-deals-says-khaled",
          image: "https://lookaside.instagram.com/seo/google_widget/crawler/?media_id=3865491637929593098",
          category: "Defence",
          date: "May 30, 2026"
        }
      ]
    },

    football: {
      title: "Football News",
      icon: "⚽",
      stories: [
        {
          id: "fb-1",
          title: "FIFA World Cup 2026 Final Preparations Underway as Nations Assemble Squads",
          summary: "With the FIFA World Cup 2026 just weeks away, national teams across the globe are assembling their squads and beginning training camps. Germany's squad arrived at their Herzogenaurach homeground under Julian Nagelsmann, while France's Kylian Mbappé arrived in style for the French camp. Spain's teenage sensation Lamine Yamal is set to feature in his first-ever World Cup. US security officials are also activating emergency operation plans to handle drone threats and potential terrorism at host venues.",
          source: "FOX Sports / CBS News",
          url: "https://www.foxsports.com/watch-vertical/fmc-a6cer9kofxyr9uqw",
          image: "https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2026-05/260527-nrg-stadium-world-cup-preparation-vl-453p-7fef08.jpg",
          category: "World Cup 2026",
          date: "May 31, 2026"
        },
        {
          id: "fb-2",
          title: "World Cup Ticket Prices Spark Investigations as Scalpers Drive Costs to $2M",
          summary: "FIFA World Cup 2026 ticket prices have reached extraordinary levels on the secondary market, with some packages reportedly fetching up to $2 million, prompting investigations by consumer protection authorities. CNN reported that the pricing surge is drawing scrutiny from regulators in multiple host cities. Demand is being driven by the tournament's expanded 48-team format and the prestige of the first World Cup co-hosted by the USA, Canada, and Mexico.",
          source: "CNN",
          url: "https://www.foxsports.com/soccer/canadian-premier-league-forge-fc-hamilton-vs-cavalry-fc-may-31-2026-game-boxscore-677614",
          image: "https://media.cnn.com/api/v1/images/stellar/prod/ap26071571319065.jpg?c=original&q=w_860,c_fill",
          category: "World Cup 2026",
          date: "May 29, 2026"
        },
        {
          id: "fb-3",
          title: "Brazil vs Panama & USA vs Senegal: World Cup Warm-Up Friendlies on May 31",
          summary: "Several high-profile international friendlies are taking place on May 31 as nations finalise their World Cup preparations. Brazil face Panama in a final tune-up, while the USA host Senegal in a key test at MLS venues. Poland take on Ukraine in a European friendly, and Australia face Mexico. These matches serve as the last major opportunities for coaches to assess squad depth and tactical setups before the tournament begins.",
          source: "FOX Sports / MLS Soccer",
          url: "https://www.foxsports.com/soccer/friendlies-men-brazil-vs-panama-may-31-2026-game-boxscore-763786",
          image: "https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=1428348201985429",
          category: "International Football",
          date: "May 31, 2026"
        },
        {
          id: "fb-4",
          title: "FC Barcelona Round-Up: Latest News Ahead of World Cup Break",
          summary: "FC Barcelona's latest news cycle covers squad updates and player movements as the club prepares for the summer break ahead of the FIFA World Cup. Several Barça stars including Lamine Yamal are set to represent their national teams at the tournament. The club is also monitoring the transfer market, with the World Cup expected to influence valuations and potential signings for the 2026-27 season.",
          source: "Yahoo Sports",
          url: "https://sports.yahoo.com/articles/fc-barcelona-news-30-may-090000936.html",
          image: "https://lookaside.instagram.com/seo/google_widget/crawler/?media_id=3908047965588340275",
          category: "Club Football",
          date: "May 30, 2026"
        },
        {
          id: "fb-5",
          title: "Countries Revolt Against FIFA Over 2026 World Cup Concerns; 5 Nations Consider Boycott",
          summary: "A growing number of nations are expressing serious grievances with FIFA over the organisation and commercial terms of the 2026 World Cup, with reports suggesting at least five countries are considering a boycott. Concerns centre on revenue distribution, scheduling conflicts, and FIFA's governance. The controversy adds political tension to what is already the most logistically complex World Cup in history, spanning 16 cities across three countries.",
          source: "Soccer Fifa / Ballin News",
          url: "https://www.foxsports.com/soccer/friendlies-men-poland-vs-ukraine-may-31-2026-game-boxscore-827895",
          image: "https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=976282742042399",
          category: "World Cup 2026",
          date: "May 29, 2026"
        }
      ]
    },

    world: {
      title: "World News",
      icon: "🌍",
      stories: [
        {
          id: "wn-1",
          title: "Blue Moon on May 31: Rare Calendar Blue Moon Also a Micromoon",
          summary: "A rare calendar blue moon — the second full moon in a single calendar month — occurs on May 31, 2026, the first since August 30, 2023. The event coincides with the moon being at apogee (its farthest point from Earth), making it a micromoon that appears slightly smaller and dimmer than usual. The blue moon is visible across Asia on the evening of May 30 and will be one of the most photographed astronomical events of 2026.",
          source: "Economic Times",
          url: "https://m.economictimes.com/news/new-updates/blue-moon-may-31-2026-will-this-rare-lunar-event-be-visible-in-india-when-where-how-to-watch-it-what-it-means-for-zodiac-signs-and-how-it-differs-from-supermoon/articleshow/131403508.cms",
          image: "https://i.ytimg.com/vi/R3gKBY_X9HU/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAitkUP6GQ5_KdpjxjdaE-ku01ehA",
          category: "Science",
          date: "May 31, 2026"
        },
        {
          id: "wn-2",
          title: "Russian Drone Enters Romanian Airspace, Strikes Apartment Building in Galati",
          summary: "A Russian Geran-2 drone (the Russian-produced version of Iran's Shahed-136) entered Romanian airspace and struck a residential apartment building in Galati — approximately 7km from the Ukrainian border — injuring at least two civilians. Romania scrambled two F-16 fighters and an IAR 330 helicopter in response. The incident marks a serious escalation, with NATO member Romania's territory directly hit by Russian munitions targeting Ukrainian infrastructure along the Danube.",
          source: "Institute for the Study of War",
          url: "https://understandingwar.org/research/russia-ukraine/roca-update-template-body-05-21-25",
          image: "https://i.ytimg.com/vi/9d-jqR5F1CY/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCn2UJ0xO-Ma9cTUp0zzmH_OAZl5Q",
          category: "War & Conflict",
          date: "May 29, 2026"
        },
        {
          id: "wn-3",
          title: "US Defence Secretary Hegseth at Shangri-La Dialogue: Praises Asian Allies, Omits Taiwan",
          summary: "US Defence Secretary Pete Hegseth addressed the Shangri-La Dialogue security forum in Singapore on May 30, praising Asian partners — including Australia, Indonesia, Japan, Malaysia, the Philippines, South Korea, Singapore, Thailand, and Vietnam — for boosting defence spending. Notably, Hegseth omitted Taiwan from his roll call of allies, a significant diplomatic signal. He also called out New Zealand as 'freeloading' off American military protection.",
          source: "Business Times Singapore",
          url: "https://www.businesstimes.com.sg/international/global/hegseth-hails-asian-partners-boosting-security-spending",
          image: "https://lookaside.instagram.com/seo/google_widget/crawler/?media_id=3864989928984030151",
          category: "Geopolitics",
          date: "May 30, 2026"
        }
      ]
    }
  }
};

// Export for use in the news website
if (typeof module !== "undefined" && module.exports) {
  module.exports = newsData;
}