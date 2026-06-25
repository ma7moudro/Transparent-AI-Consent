# 🛡️ Transparent AI Consent

**Official Submission for the 3rd Presidential African Youth in AI & Robotics Competition (2026)**  
**Category:** Ethical AI  
**Origin:** Proudly developed in Kafr El-Sheikh, Egypt 🇪🇬  

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://transparent-ai-consent.vercel.app/)
[![Frontend](https://img.shields.io/badge/Vite-React-blue?style=flat&logo=vite)](#)
[![Backend](https://img.shields.io/badge/Node.js-Express-green?style=flat&logo=node.js)](#)
[![Database](https://img.shields.io/badge/Prisma-v5.14.0-1B222D?style=flat&logo=prisma)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=flat&logo=typescript)](#)

---

## 🌐 Live Demo & Website
**Experience the platform live here:**  
🔗 **[Transparent AI Consent - Live Application](https://transparent-ai-consent.vercel.app/)**

---

## 📌 Executive Summary
In the era of rapid digital transformation across the African continent, "Consent by Exhaustion" has become a critical vulnerability. Everyday users are forced to accept lengthy, complex, and highly legalistic Privacy Policies without reading them, systematically obscuring how their data is mined, sold, or used for AI training. 

**Transparent AI Consent** is a Legal-Tech platform designed to bridge the gap between constitutional privacy rights and modern software engineering. It acts as an ethical shield, translating complex legal jargon into transparent, actionable insights for the average citizen.

## ⚙️ How It Works
By leveraging an advanced LLM through a strictly formatted legal-persona prompt, the application analyzes any given privacy policy and instantly returns a 4-point breakdown:
1. **Targeted Data:** Exactly what personal data is being harvested.
2. **Data Brokerage:** Whether the data is sold to third parties.
3. **AI Training:** Whether the user's data is explicitly used to train proprietary AI models.
4. **Ethical Risk Level:** A calculated risk assessment based on international data protection frameworks.

## 🏗️ Technical Architecture
This repository is structured to ensure high performance, maintainability, and strict development stability.

### Tech Stack
* **Frontend:** React with TypeScript, bundled via Vite for lightning-fast HMR and optimized builds[cite: 2].
* **Backend:** A robust Node.js server handling secure requests and logic[cite: 2].
* **AI Integration:** Dedicated API routes engineered with strict anti-hallucination prompts to process legal texts[cite: 2].
* **Database & ORM:** Prisma **v5.14.0** (Explicitly locked to this stable version to ensure flawless schema generation and avoid build conflicts).

### Project Structure
```text
├── api/
│   └── analyze.ts       # AI prompt engineering and API logic[cite: 2]
├── src/
│   ├── App.tsx          # Main React application component[cite: 2]
│   ├── index.css        # Global styling and UI configurations[cite: 2]
│   └── main.tsx         # React DOM entry point[cite: 2]
├── server.ts            # Backend server configuration[cite: 2]
├── index.html           # Vite HTML template[cite: 2]
├── package.json         # Project dependencies and scripts[cite: 2]
├── tsconfig.json        # TypeScript compiler configurations[cite: 2]
└── vite.config.ts       # Vite bundler settings[cite: 2]
