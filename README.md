<div align="center">

# 🎓 ScholarStream – Client Side  
### Scholarship Management Platform (Frontend)

🌐 **Live Website:** https://scholar-stream-by-ashiqur.web.app/ <br>
📁 **Repository Type:** Client / Frontend  <br>
🧑‍💻 **Tech Stack:** MERN (Frontend)

</div>

---

## 🧠 Project Purpose

**ScholarStream** is a modern, user-friendly scholarship discovery and management platform designed to help students easily find and apply for scholarships, while enabling administrators and moderators to manage applications efficiently.

The client-side focuses on:
- Clean UI/UX
- Role-based dashboards
- Secure authentication
- Smooth navigation
- Responsive and recruiter-attractive design

---

## 🚀 Live Preview

🔗 **Live Site:** https://scholar-stream-by-ashiqur.web.app/
⚠️ Fully reload-safe on all routes  
⚠️ No CORS / 404 / 504 issues  

---

## 🖼️ Project Preview

![Project Preview](../src/assets/scholar-stream.gif)

---

## 🎯 Key Features

### 🌍 Public Features
- Home page with animated hero section (Framer Motion)
- Dynamic **Top Scholarships**
- Advanced **Search, Filter, Sort & Pagination**
- Scholarship details with reviews & recommendations
- Secure authentication (Email/Password + Google)

### 👤 Student Features
- Apply for scholarships via Stripe payment
- Track application status
- Pay later if payment fails
- Add, edit & delete reviews
- Wishlist scholarships

### 🧑‍💼 Moderator Features
- Review applications
- Provide feedback
- Update application status
- Moderate student reviews

### 🛠️ Admin Features
- Add / Update / Delete scholarships
- Manage users & roles
- Platform analytics with charts
- Full dashboard control

---

## 🧩 Pages & Routes

| Page | Access |
|----|----|
| Home | Public |
| All Scholarships | Public |
| Scholarship Details | Public |
| Login / Register | Public |
| Checkout / Payment | Private |
| Dashboard | Role-Based |
| 404 Error Page | Public |

---

## 🔐 Authentication & Security

- Firebase Authentication
- JWT-based protected routes
- Role-based authorization
- Environment variable protected keys
- Reload-safe private routing

---

## 🎨 UI & Design Highlights

✔ DaisyUI only (No external UI frameworks)  
✔ Consistent color theme  
✔ Equal card sizes & grid layout  
✔ Fully responsive (Mobile / Tablet / Desktop)  
✔ Skeleton loaders on all data-fetching pages  
✔ Custom 404 error page  

---

## ⚙️ Technologies Used

### Frontend
- React
- React Router DOM
- Firebase Authentication
- Axios
- Stripe JS
- Framer Motion
- DaisyUI + Tailwind CSS
- Recharts (Analytics)
- SweetAlert2

---

## 📦 NPM Packages

```bash
react
react-router-dom
firebase
axios
@stripe/react-stripe-js
@stripe/stripe-js
framer-motion
sweetalert2
recharts