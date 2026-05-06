# 📦 Logistics Tracker

A logistics delivery tracking application built with React and Vite.
Designed to simulate a real-world shipment management system with full
CRUD functionality and a clean dark UI.

---

## 🚀 Live Demo

[View on Vercel](https://logistics-tracker-tau.vercel.app)

---

## ✨ Features

- Add new delivery shipments with a form
- Delete existing deliveries
- Filter deliveries by status (Pending, In Transit, Delivered)
- Sort deliveries by date or recipient name
- Dynamic UI updates with React state management
- Empty state handling when no results match filters
- Responsive design — works on mobile and desktop
- Component-scoped styling with CSS Modules

---

## 🛠️ Tech Stack

- React 18
- Vite
- CSS Modules
- Mock API (ready to swap for AfterShip, ShipEngine, or EasyPost)

---

## 📂 Project Structure

src/
├── components/
│   ├── Header.jsx
│   ├── Header.module.css
│   ├── AddDeliveryForm.jsx
│   ├── AddDeliveryForm.module.css
│   ├── DeliveryCard.jsx
│   ├── DeliveryCard.module.css
│   ├── FilterSort.jsx
│   └── FilterSort.module.css
├── App.jsx
├── App.module.css
├── mockApi.js
└── main.jsx

---

## 🔧 Getting Started

Clone the repo and run locally:

```bash
npm install
npm run dev
```

---

## 🔄 Swapping the Mock API

All API calls are isolated in `src/mockApi.js`. To connect a real
carrier API like AfterShip or ShipEngine, replace the functions in
that file with real fetch() calls using your API key. No other files
need to change.

---

## 👨‍💻 Author

Built by [Karina Mallory] as part of a frontend developer portfolio.