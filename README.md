# 🏢 SISMN LLC — Architectural & Engineering Web Platform

[![Live Demo](https://img.shields.io/badge/Live%20Demo-sismnllc.vercel.app-00e5ff?style=for-the-badge&logo=vercel&logoColor=black)](https://sismnllc.vercel.app)
[![GitHub Repository](https://img.shields.io/badge/GitHub-imhocien%2Fsismnllc-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/imhocien/sismnllc)
[![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20TypeScript%20%7C%20Tailwind%20%7C%20GSAP-ffb703?style=for-the-badge)](https://github.com/imhocien/sismnllc)

Premier institutional architecture, multi-disciplinary structural engineering, and master land development digital platform. Grounded in surgical structural craft and Texas development discipline.

---

## 🌟 Key Features

- **🎬 Interactive Canvas Sequence Hero:** Smooth sub-frame image sequence driven by GSAP ScrollTrigger & Lenis smooth scrolling.
- **☁️ Floating Atmospheric Depth:** Volumetric floating cloud elements and parallax layering.
- **🏛️ Institutional Sections:**
  - **About the Firm:** History, engineering philosophy, and architectural governance.
  - **Disciplines & Services:** Commercial plazas, luxury residential engineering, land zoning, BIM & structural diagnostics.
  - **Featured Portfolio:** Showcase of completed institutional and master planning projects.
  - **Leadership & Engineers:** Executive profiles and technical credentials.
  - **Investor Portal & Consultation Request:** Interactive inquiry forms and downloadable prospectus material.
  - **FAQ & License Disclosures:** Comprehensive documentation including TBPE (#F-10492) and TBAE (#BR-4902) compliance.
- **📱 Fully Responsive & Optimized:** High Core Web Vitals performance, custom Tailwind design tokens, and smooth client-side routing.

---

## 🛠️ Tech Stack & Dependencies

- **Frontend Framework:** [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite 5](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) + [PostCSS](https://postcss.org/)
- **Animations & Motion:** [GSAP 3](https://gsap.com/) + ScrollTrigger, [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Deployment:** [Vercel](https://vercel.com/)

---

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (v18 or higher) and `npm` installed.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/imhocien/sismnllc.git
   cd sismnllc
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start local development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

### Production Build

To build the application for production deployment:

```bash
npm run build
```

To preview the built production bundle locally:

```bash
npm run preview
```

---

## 📂 Project Architecture

```
vex-hero/
├── public/                 # Static assets & canvas image sequences
├── src/
│   ├── components/         # Reusable UI components & Hero canvas logic
│   │   ├── ArchitecturalHero.tsx
│   │   ├── ImageSequenceCanvas.tsx
│   │   ├── FloatingSmokeClouds.tsx
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── pages/              # Route pages (Home, About, Services, Projects, etc.)
│   ├── data/               # Project data & firm disclosures
│   ├── index.css           # Global Tailwind CSS & typography tokens
│   ├── App.tsx             # Main routing setup
│   └── main.tsx            # React application entry point
├── tailwind.config.js      # Custom theme colors & typography scales
├── vite.config.ts          # Vite build configurations
└── package.json            # Project dependencies & scripts
```

---

## 👨‍💻 Author & Developer Credit

Designed & Developed with ❤️ by **[Hocien](https://github.com/imhocien)**

- **Portfolio:** [hocien.me](https://hocien.me)
- **GitHub:** [@imhocien](https://github.com/imhocien)
- **Live Site:** [sismnllc.vercel.app](https://sismnllc.vercel.app)
