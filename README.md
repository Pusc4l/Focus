# 🍅 Focus - Modern Pomodoro & Productivity Web App

<div align="center">
  <img src="public/logo-bird.png" alt="Focus Logo" width="120" height="120" />
  <p><b>Aplikasi Pomodoro elegan berbasis web untuk meningkatkan produktivitas harianmu.</b></p>
</div>

---

## 🎯 What is Focus & The Pomodoro Technique?

**Focus** is a feature-rich, sleek, and minimalist Pomodoro timer web application designed to help users boost daily productivity, manage tasks effectively, customize ambient focus sounds, and track study or work habits over time. 

The **Pomodoro Technique** is a time management method developed by Francesco Cirillo in the late 1980s. It uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks. This method helps maintain high concentration and prevents mental fatigue.

## 👥 Target Audience

**Focus** is built for anyone looking to optimize their workflow and eliminate procrastination, including:
* **Students:** Managing study sessions, exam preparation, and homework routines.
* **Remote Workers & Freelancers:** Structuring deep-work hours and balancing screen time.
* **Developers & Creatives:** Maintaining high-concentration coding or design blocks with soothing ambient sounds.
* **Anyone seeking better time management:** Anyone who wants a lightweight, distraction-free tool to accomplish daily goals.

## ✨ Core Features

* **Customizable Pomodoro Timer:** Easily adjust focus durations, short breaks, and long breaks to match your personal workflow.
* **Floating Mini Player (Spotify Style):** An interactive draggable widget that stays active in the background, allowing you to control timers, mute ambient sounds, or skip sessions seamlessly.
* **Ambient Soundscapes:** Built-in seamless loop audio player featuring rain, forest, waves, and fireplace sounds to enhance concentration.
* **Real Do Not Disturb (DND) Mode:** Locks unnecessary navigation tabs while a focus session is actively running.
* **Audio & Haptic Alerts:** Integrated Web Audio API chime alerts and device vibrations when a session ends.
* **Animated Mascots & Modern UI Themes:** Dynamic color themes (Warm Gradient, Cool Pastel, Sakura Pastel) paired with cute, smooth-animated mascots and high-contrast timers.
* **Productivity History & Analytics:** Visual charts tracking your focus consistency and total completed tasks.
* **Progressive Web App (PWA):** Fully installable directly onto mobile or desktop devices as a native application.

## 🛠️ Tech Stack & Languages

* **Frontend Framework:** React (Vite)
* **Styling:** Tailwind CSS
* **Languages:** JavaScript (ES6+), HTML5, CSS3
* **Audio & Animations:** Web Audio API, Framer Motion / Custom CSS Keyframes
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
│   ├── components/       # Reusable UI elements, modals, & FloatingPlayer
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

To run or test this project locally on your machine, follow these simple steps:

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