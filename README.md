# EthAum.ai - The Revenue Operating System for Startups

### 🏆 Submission for EthAum Venture Partners Hackathon
**Team:** [Your Team Name]
**Tagline:** Stopping the "Death Valley" curve for Series A startups by unifying Launch, Intelligence, Revenue, and Trust into one AI-driven ecosystem.

---

## 💡 The Problem
Series A-D startups ($1M - $50M ARR) currently face a fragmented, expensive growth journey:
1.  **Buzz is fleeting:** Product Hunt launches fade in 24 hours.
2.  **Validation is expensive:** Gartner reports cost $50k+ and take months.
3.  **Strategy is static:** Founders can't afford 24/7 consulting.
4.  **Resilience is untested:** Most startups fail because they cannot predict external crises (recessions, lawsuits).

## 🛠 The Solution: EthAum.ai
EthAum.ai is an **AI-Powered Revenue Operating System**. We accelerate startups through the entire lifecycle using four integrated engines:

### 1. 🚀 The Viral Launchpad (Product Hunt Style)
* **Live Launch Dashboard:** Founders submit startups instantly to a live Supabase database.
* **Viral Mechanics:** Real-time upvoting with **Confetti Explosions** to drive engagement.
* **Smart Trending Badges:**
    * 🔥 **Trending:** Appears automatically when upvotes > 5.
    * 🏆 **#1 Product of the Day:** Golden glow effect when upvotes > 20.
* **CRUD Control:** Full ability to manage and delete listings real-time.

### 2. 🧠 The Intelligence Engine (Gartner Style)
* **Dynamic AI Quadrant Chart:** Our GPT-4 Engine analyzes the startup's description in real-time and plots them on a matrix (Execution vs. Vision).
    * *Leaders, Challengers, Visionaries, Niche Players.*
* **Interactive Legend:** Explains the quadrant positioning to users.
* **AI Analyst Reports:** Generates a full **SWOT Analysis** (Strengths, Risks, Roadmap) and an **Investor Sentiment Score** (0-100) with one click.

### 3. 🔮 The Strategy Engine (Consulting Style)
* **EthAum Oracle:** A context-aware **AI Chatbot** that acts as a 24/7 Board Member. It knows the startup's specific weaknesses and answers strategic questions (e.g., "How do I raise Series B?").
* **Crisis Simulator 3000:** A "Stress Test" module that simulates disasters to test business resilience.
    * *Scenarios:* Economic Crash, Big Tech Copycat, Massive Lawsuit.
    * *Output:* Survival Probability Score & AI-predicted outcome.

### 4. ⚡ The Revenue & Trust Engine (AppSumo + G2 Style)
* **Smart Pilot Deals:** Auto-structured "Enterprise Pilot Packages" ($4,999 POCs) to bypass long sales cycles.
* **Verified Reviews:** LinkedIn-verified identity badges to build enterprise trust.
* **ROI Metrics:** Tracks "Time to Value" and "ROI Speed" directly on the card.

---

## ⚙️ Tech Stack

### Core Framework
* **Frontend:** Next.js 14 (App Router)
* **Language:** TypeScript (Strict Mode)
* **Styling:** Tailwind CSS (Enterprise Dark Mode + Animated Gradients)

### Backend & AI
* **Database:** Supabase (PostgreSQL)
* **AI Logic:** OpenAI API (GPT-4 Turbo)
* **Server Actions:** Next.js API Routes (`/api/generate-report`, `/api/oracle-chat`, `/api/stress-test`)

### Visualization & UI
* **Charts:** Recharts (Scatter Plots with Custom Axis)
* **Icons:** Lucide React
* **Effects:** Canvas Confetti, CSS Keyframe Animations (Shining Text, Pulse Effects)

---

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### 1. Clone the repository
```bash
git clone [https://github.com/YOUR_USERNAME/ethaum-hackathon.git](https://github.com/YOUR_USERNAME/ethaum-hackathon.git)
cd ethaum-hackathon
```
### 2. Install dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Set up Environment Variables
Create a `.env.local` file and add your Supabase credentials:
\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_key
\`\`\`

### 4. Run the Development Server
\`\`\`bash
npm run dev
\`\`\`
Visit `http://localhost:3000` to see the Revenue OS in action.

---

## 🧪 How to Demo (The "Wow" Path)

1.  **Launch a Startup**
    * Create **"NeuralFlow"** (AI Supply Chain) and **"Old School Paper Co."** (Manual Labor).

2.  **Show the Graph**
    * Open "NeuralFlow" to see it in the **Leaders** quadrant.
    * Open "Old School Paper" to see it in **Niche Players**.

3.  **Generate Report**
    * Click **"Generate AI Report"** to see the Investor Sentiment Score (e.g., 92/100).

4.  **Consult the Oracle**
    * Ask the chatbot: *"How do I beat my competitors?"*

5.  **Run a Stress Test**
    * Click **"Economic Crash"** for NeuralFlow → **High Survival**.
    * Click **"Big Tech Copycat"** for Old School Paper → **0% Survival**.

6.  **Check Trust**
    * Show the **"Verified via LinkedIn"** badges in the Review section.

---

## 🔮 Future Roadmap

* **Stripe Connect:** Process the $4,999 Pilot Deal payments directly on-platform.
* **LinkedIn Integration:** Automated OAuth verification for reviewer identities.
* **Predictive Churn:** AI analysis of user sentiment to predict startup growth.

---

> *Built with ❤️ for the EthAum Venture Partners Hackathon.*