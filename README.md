# GeniProduct AI Studio

Design a responsive full-stack dashboard for "GeniProduct AI", an enterprise SaaS platform and AI product marketplace where users can run, manage, and monitor custom AI workflows and ML models.

Visual Style:

- Clean, modern B2B SaaS aesthetic with crisp slate gradients, subtle borders, high contrast badges, and smooth dark/light mode support.

Core Views & Pages:

1. Auth & Onboarding Flow:

   - Split-screen auth layout: Left side features dynamic AI generation showcase/animation, right side features Login/Register forms with Google/GitHub SSO.

2. Navbar & Navigation:

   - Top Bar: Company Logo, Global Search bar, API Credit counter widget ("1,450 / 2,000 Credits remaining"), Notifications dropdown, and User Avatar menu.

3. Dashboard / Overview Tab:

   - Quick Metrics Cards: "API Requests Today", "Active Models Deployed", "Tokens Used", "Monthly Spend".

   - Usage Chart: Interactive line/area graph visualizing daily token usage over time.

4. AI Tools / Marketplace Tab:

   - Grid of AI Product cards (e.g., "Document Summarizer", "Code Refactor AI", "Image Enhancer", "Sentiment Analyzer").

   - Each card features an icon, tag, description, credit cost, and an "Action / Launch" button.

5. Interactive AI Workspace (Active Product Tool View):

   - Split-screen layout:

     - Left Panel: Form controls and parameters (e.g., File Drag-and-Drop, Temperature Slider, Model Version Selector, Input Textarea).

     - Right Panel: Real-time Output preview area with tabs for "Raw Response", "JSON Output", and "Analytics / Latency Specs".

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://genaisaasproduct.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/fb120eeb-a488-4f81-aaf7-98fd4fc6df92).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
