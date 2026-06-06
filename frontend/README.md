# 🏭 Smart Payroll & Attendance Management System

A React-based payroll and attendance management system designed to automate employee work tracking, attendance monitoring, and salary calculation using real-time timer logic and local storage.

---

## 🚀 Project Overview

This project simulates a real-world HR system for small industries (like spinning mills) where employee working hours are tracked using start/stop timers, and salary is calculated automatically based on total worked hours.

All data is managed on the frontend using React Context API and stored in localStorage for persistence.

---

## 🧠 Architecture
React App
│
├── Context API (Global State Management)
│ ├── Employees Data
│ ├── Active Timers
│ └── Work Records
│
├── Pages / Components
│ ├── Dashboard
│ ├── Employees
│ ├── Attendance (Timer System)
│ └── Salary (Calculation View)
│
└── localStorage
└── Persistent Data Layer




## 🔄 Data Flow


User Action (Add Employee / Start Work / Stop Work)
↓
Context API (State Update)
↓
Timer Logic (Date.now() calculation)
↓
Work Record Stored (hours, id, date)
↓
Salary Calculation (hours × rate)
↓
UI Re-render (React Updates Screen)




---

## ✨ Features

- 👨‍💼 Employee management (Add & View)
- ⏱ Real-time work timer (Start / Stop)
- 📊 Automatic working hours calculation
- 💰 Salary calculation based on hours
- 📄 Employee-wise salary report
- 📦 localStorage persistence
- 📱 Fully responsive UI (Tailwind CSS)
- 🎯 Simple & clean dashboard design

---

## ⚙️ Tech Stack

- React.js
- Context API
- useState / useEffect
- Tailwind CSS
- JavaScript (ES6+)
- localStorage

---

## 💡 Core Concept

- Each employee has a unique ID
- Start Work → stores timestamp
- Stop Work → calculates duration
- Records stored as:
  - employee id
  - hours worked
  - date
- Salary = total hours × fixed rate

---

## 📌 Use Case

This project can be used as a prototype for:

- Small factories (Spinning mills)
- Basic HR attendance systems
- Learning React state management
- Portfolio demonstration project

---

## 📈 Future Improvements

- PDF payslip generation
- Advanced reports (charts)
- Role-based login system
- Backend integration (optional upgrade)
- Monthly salary breakdown

---

## 👨‍💻 Author

Frontend React project built for learning real-world state management, timer logic, and payroll simulation.