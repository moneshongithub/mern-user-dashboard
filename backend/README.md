# 🚀 Mini SaaS User Management Dashboard

## 📌 Project Overview

This is a full-stack MERN application where admins can:

* Manage users (Create, Edit, Delete)
* Track user activity (last login & API usage)
* Filter and search users
* View paginated user data

---

## 🛠️ Tech Stack

* **Frontend:** React.js
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Authentication:** JWT (JSON Web Token)
* **Security:** bcrypt (password hashing), rate limiting

---

## ✨ Features

### 🔐 Authentication

* User registration & login
* JWT-based authentication
* Role-based access (Admin/User)

---

### 👥 User Management (Admin)

* Create user
* Update user
* Delete user
* View all users

---

### 📊 Activity Tracking

* Last login tracking
* API activity logging
* Stored in MongoDB

---

### 🔍 Filters & Search

* Search by name/email
* Filter by:

  * Active in last 24 hours
  * Active in last 7 days
  * Inactive users

---

### ⚡ API Optimization

* Pagination support
* Rate limiting implemented
* Clean RESTful APIs

---

### ⚛️ Frontend

* Login page
* Dashboard with:

  * User table
  * Filters
  * Search
  * Pagination

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone <your-repo-link>
cd mern-user-dashboard
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/user-dashboard
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## 🔗 API Endpoints

### Auth

* POST `/api/auth/register`
* POST `/api/auth/login`

### Users (Admin only)

* GET `/api/users`
* POST `/api/users`
* PUT `/api/users/:id`
* DELETE `/api/users/:id`

---

## 🧪 Sample Credentials

```bash
Email: admin@test.com
Password: 123456
```

---

## 📌 Notes

* Only admin users can manage users
* Token must be sent in Authorization header:

  ```
  Bearer <token>
  ```

---

## 🎯 Conclusion

This project demonstrates a complete MERN stack implementation with authentication, user management, activity tracking, and optimized APIs.
