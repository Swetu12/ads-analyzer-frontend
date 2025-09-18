<h1 align="center" style="font-weight: bold;">🚀 AdLytix</h1>

<p align="center">
  <a href="#technologies">Technologies</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#collaborators">Collaborators</a>
</p>

<p align="center">
    AdLytix is a CSV/JSON Ads Analyzer built with Next.js and Supabase. It helps users analyze ad performance data, generate actionable insights, and improve ROI.
</p>

<p align="center">
  <a href="https://www.halexxwebdev.com/">📱 Visit this Project</a>
</p>

---

## 🧠 Project Overview

AdLytix was built with two main goals in mind:

1. **Showcase my skills** in building scalable frontend applications.
2. **Boost productivity and ROI** by allowing the users to predict future decisions based on the analysis generated.

Although this is an **Individual Project**, the application has much bigger potential.

---

## 🏗️ Development Insights

### 👨‍💻 Frontend (by Alexandru Geroc)
- Built using **Next.js**, **TypeScript**, and **Tailwind CSS 4.0**.
- Focused heavily on **code quality**, **performance**, and **scalability**.
- I adopted an architecture that's suitable for **large-scale SaaS apps**.

### 💡 Technical Decisions
- **Supabase** for backend services — provides authentication, database, and storage solutions.
- **Zustand** for state management — lightweight, scalable, and easy to set up.
- **React Hook Form** for form validation — highly structured and easy to read.
- **Next.js** for the main framework.
- **Next.js Route Groups** (like `(foldername)`) used to isolate layouts and keep `layout.tsx` files clean and purpose-specific.

### 📁 Folder Structure
The project uses the `src` directory to keep everything organized:

src/
├── app/
|  ├── (application)/
|  |   ├── dashboard/
|  |   ├── settings/
|  ├── (auth)/
|  |   ├── confirm-email/
|  |   ├── forgot-password/
|  |   ├── login/
|  |   ├── reset-password/
|  |   ├── sign-up/
|  ├── api/
|  |  ├── analyze/
|  |  ├── checkout_sessions/
|  |  ├── stripe-webhook/
|  ├── pricing/
├── components/
|  ├── auth/
|  ├── dashboard/
|  |  ├── analysis/
|  ├── landing/
|  ├── layout/
|  ├── settings/
|  ├── ui/
├── data/
|  ├── layout/
├── lib/
|  ├── constants/
|  ├── hooks/
|  ├── stores/
|  |  ├── analysis/
|  |  ├── global/
|  ├── types/
├── supabase-config/

Each part of the codebase has a clear responsibility—for example, separate files for **api**, **auth**, **contexts**, and **stores**. This structure helps developers understand and navigate the project quickly.

---

## 🎨 Layout

<p align="center">
<a href="https://streamable.com/r3xrz4">
  <img src="/public/ads-analyzer-preview.png" alt="Website Preview" width="1000px">
</a>
</p>

---

## ✨ Features

- **Authentication**
    - Sign-In
    - Sign-Up
        - Email Confirmation
    - Forgot Password
        - Multi-Step Recovery

- **Dashboard Interface**
    - Dynamic Data Visualization
- **Analysis Interface**
    - Campaign Creation
    - CSV/JSON File Upload
    - Interactive Charts & Graphs
    - Dashboard Analysis Reports
    - Export Analysis Reports (PDF)

- **Settings**
    - Change Email (with MFA)
    - Change Password

- **Other**
    - Log Out
    - Secured Routes via Middleware
    - OAuth Integration

---

## 💻 Technologies

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS 4.0**
- **Supabase**

---

## 🚀 Getting Started

To get a local copy up and running:

### ✅ Prerequisites

Make sure you have:

- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)

### 📥 Clone the Repository

```bash
git clone https://github.com/Swetu12/ads-analyzer-frontend
cd ads-analyzer-frontend

▶️ Start the Project

npm install
npm run dev
```

## 📝 Key Takeaways / Learning Points

- **Frontend Architecture:** Learned how to improve a Next.js project for scalability using route groups and `src`-based organization.
- **State Management:** Practical experience with **Zustand** for lightweight and maintainable global state.
- **Forms & Validation:** Improved form handling and validation using **React Hook Form**.
- **Supabase Integration:** Learned and gained hands-on experience with third party backend services like Supabase for authentication, database management, and storage.
- **UI/UX:** Built a dashboard with interactive charts and exportable reports, emphasizing user experience.
- **Portfolio Skills:** Demonstrated ability to build a full-featured SaaS-like app individually, showcasing code quality, scalability, and professional frontend practices.


🤝 Collaborators
<p>Give a ⭐ if you like this project!</p> <table> <tr> <td align="center"> <a href="https://github.com/Swetu12"> <img src="https://avatars.githubusercontent.com/u/102142947?v=4" width="100px;" alt="Alexandru Geroc"/><br> <sub><b>Alexandru Geroc</b></sub> </a> </td> </tr> </table>
