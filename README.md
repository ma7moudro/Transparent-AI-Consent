🛡️ Transparent AI Consent

Official Submission for the 3rd Presidential African Youth in AI & Robotics Competition (2026)

Category: Ethical AI

Origin: Proudly developed in Kafr El-Sheikh, Egypt 🇪🇬
[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://transparent-ai-consent.vercel.app/)
[![Frontend](https://img.shields.io/badge/Vite-React-blue?style=flat&logo=vite)](#)
[![Backend](https://img.shields.io/badge/Node.js-Express-green?style=flat&logo=node.js)](#)
[![Database](https://img.shields.io/badge/Prisma-v5.14.0-1B222D?style=flat&logo=prisma)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=flat&logo=typescript)](#)

---

🌐 Live Demo & Website

Experience the platform live here:

🔗 Transparent AI Consent - Live Application

📌 Executive Summary

In the era of rapid digital transformation across the African continent, "Consent by Exhaustion" has become a critical vulnerability. Everyday users are forced to accept lengthy, complex, and highly legalistic Privacy Policies without reading them, systematically obscuring how their data is mined, sold, or used for AI training.

Transparent AI Consent is a Legal-Tech platform designed to bridge the gap between constitutional privacy rights and modern software engineering. It acts as an ethical shield, translating complex legal jargon into transparent, actionable insights for the average citizen.

⚙️ How It Works

By leveraging an advanced LLM through a strictly formatted legal-persona prompt, the application analyzes any given privacy policy and instantly returns a 4-point breakdown:

Targeted Data: Exactly what personal data is being harvested.

Data Brokerage: Whether the data is sold to third parties.

AI Training: Whether the user's data is explicitly used to train proprietary AI models.

Ethical Risk Level: A calculated risk assessment based on international data protection frameworks.

🏗️ Technical Architecture

This repository is structured to ensure high performance, maintainability, and strict development stability.

Tech Stack

Frontend: React with TypeScript, bundled via Vite for lightning-fast HMR and optimized builds.

Backend: A robust Node.js server handling secure requests and logic.

AI Integration: Dedicated API routes engineered with strict anti-hallucination prompts to process legal texts.

Database & ORM: Prisma v5.14.0 (Explicitly locked to this stable version to ensure flawless schema generation and avoid build conflicts).

Project Structure

├── api/
│   └── analyze.ts       # AI prompt engineering and API logic
├── src/
│   ├── App.tsx          # Main React application component
│   ├── index.css        # Global styling and UI configurations
│   └── main.tsx         # React DOM entry point
├── server.ts            # Backend server configuration
├── index.html           # Vite HTML template
├── package.json         # Project dependencies and scripts
├── tsconfig.json        # TypeScript compiler configurations
└── vite.config.ts       # Vite bundler settings


🚀 Getting Started (Local Setup)

To run this Legal-Tech prototype locally, follow these steps:

Clone the repository:

git clone https://github.com/yourusername/transparent-ai-consent.git
cd transparent-ai-consent


Install dependencies:

npm install


Environment Variables:
Create a .env file in the root directory to store your credentials securely:

GEMINI_API_KEY=your_google_gemini_api_key_here
DATABASE_URL=your_database_connection_string


Initialize the Database:

npx prisma generate
npx prisma db push


Start the Development Server:
Launch both the Vite frontend and the Node backend:

npm run dev


🌍 Vision & Continental Impact

As Egypt hosts the 2026 edition of this prestigious competition, this project reflects the nation's and the continent's commitment to digital sovereignty. By empowering the African youth and everyday citizens to understand their digital footprint, we force global tech platforms to adopt ethical transparency. This is more than a software tool; it is a scalable digital governance infrastructure.

Developed with a deep commitment to legal integrity and robust software architecture.
