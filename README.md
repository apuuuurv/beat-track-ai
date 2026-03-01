<div align="center">

<img width="160" alt="BeatTrack Logo" src="https://github.com/user-attachments/assets/fd53f3d9-136f-42bc-b6eb-7591046acdb5" />

# 🫀 BeatTrack

### At-Home Cardiovascular Risk Assessment — Powered by AI

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Flask](https://img.shields.io/badge/Flask-2-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![Python](https://img.shields.io/badge/Python-3.9+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![scikit-learn](https://img.shields.io/badge/Scikit--learn-1.x-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white)](https://scikit-learn.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

[🌐 Live Demo](#) &nbsp;·&nbsp; [📂 Explore the Code](#) &nbsp;·&nbsp; [🐛 Report a Bug](#) &nbsp;·&nbsp; [✨ Request a Feature](#)

</div>

---

> [!CAUTION]
> **Medical Disclaimer:** BeatTrack is an **educational and exploratory tool only**. It is not a substitute for professional medical diagnosis, advice, or treatment. Model predictions are probabilistic and non-diagnostic. Always consult a qualified healthcare provider regarding any medical condition.

---

## 📌 Overview

**BeatTrack** is a production-grade, full-stack AI web application that assesses cardiovascular risk from **8 key health metrics** — directly in the browser. By pairing a modern, **mobile-first React frontend** with a robust **Python/Flask machine learning backend**, BeatTrack delivers instant, data-driven risk insights within a clinically aware, guardrail-protected interface.

This project demonstrates the full lifecycle of an applied ML product: from data preprocessing and model serialization, through a RESTful API layer, to an animated, accessible user experience deployed on cloud infrastructure.

---

## ✨ Key Features

| Feature | Description |
| :--- | :--- |
| 🤖 **AI-Powered Assessment** | Scikit-learn classification model computes cardiovascular risk probability from structured clinical inputs |
| 📱 **Mobile-First UI** | Pixel-perfect responsiveness via Tailwind CSS — designed for smartphones first, desktops second |
| ⚡ **Real-Time Feedback** | Dynamic form validation, automated Max Heart Rate estimation, and smooth auto-scroll to results |
| 🏥 **Clinical Guardrails** | Range-bound input validation ensures Blood Pressure, Cholesterol, and Heart Rate remain physiologically plausible before any data reaches the model |
| 🐳 **Docker Ready** | Fully containerized Flask backend for consistent, environment-agnostic deployment across any host |
| 🎨 **Polished UX** | Framer Motion page transitions and a custom animated preloader deliver a premium, app-like feel |

---

## 🛠️ Tech Stack

**Frontend**

| Technology | Role |
| :--- | :--- |
| **React 18** (via Vite) | Component-based UI with blazing-fast HMR during development |
| **Tailwind CSS** | Utility-first, responsive styling system |
| **Framer Motion** | Declarative animation library for smooth, performant transitions |
| **shadcn/ui** | Accessible, unstyled component primitives |
| **Lucide React** | Crisp, consistent SVG icon library |

**Backend & Machine Learning**

| Technology | Role |
| :--- | :--- |
| **Python 3.9+** | Core language for the API server and ML pipeline |
| **Flask + Flask-CORS** | Lightweight WSGI framework with cross-origin request handling |
| **Scikit-learn** | Model training, feature engineering, and real-time inference |
| **Pandas** | Data ingestion, cleaning, and preprocessing |
| **Joblib** | Model serialization and `.pkl` persistence |

**Infrastructure & Deployment**

| Platform | Service |
| :--- | :--- |
| **Vercel** | Frontend hosting with global edge CDN |
| **Render** | Backend API hosting via Docker container |

---

## 🔬 ML Model — The 8 Clinical Data Points

The model accepts **8 patient-friendly inputs** to generate a risk prediction. All fields are protected by **clinical guardrails** that reject physiologically invalid values before they ever reach the model.

| # | Feature | Input Type | Valid Range / Options |
| :-: | :--- | :--- | :--- |
| 1 | **Age** | Numeric | 18 – 100 years |
| 2 | **Biological Sex** | Select | Male / Female |
| 3 | **Chest Pain Type** | Select | Typical Angina · Atypical Angina · Non-Cardiac · Asymptomatic |
| 4 | **Resting Blood Pressure** | Numeric | 80 – 200 mm Hg |
| 5 | **Serum Cholesterol** | Numeric | 100 – 600 mg/dL |
| 6 | **Fasting Blood Sugar > 120 mg/dL** | Toggle | Yes / No |
| 7 | **Maximum Heart Rate Achieved** | Numeric | 60 – 220 bpm |
| 8 | **Exercise-Induced Angina** | Toggle | Yes / No |

> 💡 **Smart Estimation:** If the user's Maximum Heart Rate is unknown, BeatTrack automatically calculates an age-based estimate and pre-fills the field — reducing friction without sacrificing clinical relevance.

---

## 🚀 Getting Started

<details>
<summary><strong>📋 Prerequisites</strong></summary>

<br>

Ensure the following are installed before proceeding:

- [Node.js](https://nodejs.org/) **v18+**
- [Python](https://www.python.org/downloads/) **v3.9+**
- [Git](https://git-scm.com/)
- *(Optional)* [Docker](https://www.docker.com/) — for running the containerized backend

</details>

---

<details>
<summary><strong>⚙️ Step 1 — Clone the Repository</strong></summary>

<br>

```bash
git clone https://github.com/YOUR_USERNAME/beat-track.git
cd beat-track
```

</details>

---

<details>
<summary><strong>🐍 Step 2 — Set Up the Backend (Flask + ML Model)</strong></summary>

<br>

```bash
# Navigate into the backend directory
cd backend

# Create a virtual environment (strongly recommended)
python -m venv venv

# Activate the environment — macOS / Linux
source venv/bin/activate

# Activate the environment — Windows
venv\Scripts\activate

# Install all Python dependencies
pip install -r requirements.txt

# Start the Flask development server
python app.py
```

> ✅ The API will be live at **`http://127.0.0.1:5000`**

</details>

---

<details>
<summary><strong>⚛️ Step 3 — Set Up the Frontend (React + Vite)</strong></summary>

<br>

Open a **new terminal window**, then:

```bash
# Navigate into the frontend directory
cd frontend

# Install all Node.js dependencies
npm install
```

**Configure the environment variable:**

Create a file named `.env` inside the `frontend/` directory and add the following line:

```bash
VITE_API_URL=http://127.0.0.1:5000
```

**Start the development server:**

```bash
npm run dev
```

> ✅ The application will be available at **`http://localhost:5173`**

</details>

---

## 📁 Project Structure

<details>
<summary><strong>View Full Directory Tree</strong></summary>

<br>

```
beat-track/
│
├── backend/                   # 🐍 Flask API & Machine Learning Pipeline
│   ├── app.py                 # Application entry point & API route definitions
│   ├── requirements.txt       # Python package dependencies
│   ├── Dockerfile             # Docker containerization configuration
│   └── model.pkl              # Serialized, pre-trained Scikit-learn classifier
│
└── frontend/                  # ⚛️  React + Vite User Interface
    ├── src/
    │   ├── components/        # Reusable UI components (Preloader, Form, Cards)
    │   ├── pages/             # Top-level views (Dashboard, Prediction Results)
    │   └── App.jsx            # Root component & client-side routing
    ├── .env                   # Local environment variables (git-ignored)
    ├── package.json           # Node.js dependency manifest & dev scripts
    └── tailwind.config.js     # Tailwind CSS theme extensions & plugin config
```

</details>

---

## 🌐 Live Deployment

| Service | Status | URL |
| :--- | :---: | :--- |
| **Frontend** — Vercel | 🟢 Live | [Visit BeatTrack App](https://beat-track-ai.vercel.app/) |
| **Backend API** — Render | 🟢 Live | [View API Endpoint](https://beat-track-ai.onrender.com) |

> ⚠️ **Note:** The backend is hosted on Render's free tier. The first request after a period of inactivity may take **15–30 seconds** to cold-start the container. Subsequent requests will be fast.

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](./LICENSE) for full details.

---

<div align="center">

Engineered with ❤️ and clinical care by **[Your Name](https://github.com/YOUR_USERNAME)**

*If you found this project useful, please consider giving it a ⭐ — it helps a lot!*

</div>
