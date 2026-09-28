# 🍅 Focus - Modern Pomodoro & Productivity Web App

<div align="center">
  <img src="public/logo-bird.png" alt="Focus Logo" width="120" height="120" />
  <p><b>Aplikasi Pomodoro elegan berbasis web untuk meningkatkan produktivitas harianmu.</b></p>
</div>

---

## 🎯 Purpose & Features

**Focus** is a feature-rich, sleek, and minimalist Pomodoro timer web application designed to help users boost their daily productivity, manage tasks effectively, customize ambient focus sounds, and track their study or work habits over time.

* **Customizable Pomodoro Timer:** Easily adjust focus durations, short breaks, and long breaks to match your workflow.
* **Core Task Management:** Assign tasks directly to the active timer session. Completed focus sessions automatically log time and update historical charts.
* **Ambient Soundscapes:** Built-in seamless loop audio player featuring rain, forest, waves, and fireplace sounds to enhance concentration.
* **Do Not Disturb (DND) Mode:** Blocks distractions while a focus session is actively running.
* **Multiple Color Themes:** Switch between modern aesthetic themes with smooth transition loading effects.
* **Profile & Data Management:** Multi-profile switching support with options to manage and delete profiles cleanly.
* **Productivity History & Analytics:** Visual charts tracking your focus consistency and total completed tasks.
* **Progressive Web App (PWA):** Fully installable directly onto mobile or desktop devices as a native application via the in-app Settings menu.

## 🛠️ Tech Stack & Languages

* **Frontend Framework:** React (Vite)
* **Styling:** Tailwind CSS
* **Languages:** JavaScript (ES6+), HTML5, CSS3
* **Icons & UI Assets:** Lucide React / Custom SVG / 3D Illustrations
* **State & Storage:** React Hooks & Browser LocalStorage

## 📂 Project Structure

```text
Focus/
├── public/
│   ├── sounds/           # Local ambient sound .mp3 files
│   ├── logo-bird.png     # Application logo & branding
│   ├── manifest.json     # PWA Web App Manifest
│   └── sw.js             # Service Worker for offline support
├── src/
│   ├── components/       # Reusable UI elements & modals
│   ├── screens/          # Main application views (Home, Timer, History, Settings)
│   ├── hooks/            # Custom logic hooks (Timer, Audio, DND, PWA Install)
│   ├── utils/            # Helper functions
│   ├── App.jsx           # Root wrapper component
│   ├── MainApp.jsx       # Core application layout & routing logic
│   └── index.css         # Tailwind & custom styling directives
├── package.json          # Project dependencies & scripts
├── tailwind.config.js    # Tailwind configuration
└── vite.config.js        # Vite bundler configuration
```

## 🚀 Getting Started & Local Installation

If you want to run or test this project locally on your machine, follow these simple steps:

### 1. Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your computer.

### 2. Clone the Repository

Open your terminal and clone the repository:

```bash
git clone https://github.com/Pusc4l/Focus.git
cd Focus
```

### 3. Install Dependencies

Install all required project packages via npm:

```bash
npm install
```

### 4. Run Development Server

Start the local development server:

```bash
npm run dev
```

### 5. Build for Production & PWA Testing

To create an optimized production build:

```bash
npm run build
npm run preview
```

## 📄 License & Copyright

© 2026 Muhammad Triarso Pascal. All rights reserved. Built with passion for productivity and portfolio excellence.