# mern-auth


Welcome to the **MERN Authentication System**! This project demonstrates how to build a secure authentication system using the MERN. The system includes user registration, login, and authentication features, providing a robust backend API and a clean, user-friendly frontend.

---

## Table of Contents

1. [Overview](#overview)
2. [Technologies](#technologies)
3. [Project Structure](#project-structure)
4. [Setup](#setup)
   - [Backend Setup](#backend-setup)
   - [Frontend Setup](#frontend-setup)
5. [Usage](#usage)
6. [Features](#features)
7. [Contributing](#contributing)
8. [License](#license)
9. [Contact](#contact)

---

## Overview

This project implements authentication with JWT (JSON Web Tokens) for secure API communication. The backend is built using **Node.js** with **Express.js**, and the frontend is built using **React.js**. MongoDB is used for storing user data, and authentication is achieved with password hashing (using **bcryptjs**) and token-based authorization.

---

## Technologies

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB
  - JWT (JSON Web Token)
  - bcryptjs (for password hashing)
  - dotenv (for environment variables)

- **Frontend**:
  - React.js
  - Axios (for API requests)
  - React Router (for routing)
  - React Redux

---

## Project Structure

```plaintext
.
├── backend/                    # Backend folder
│   ├── config/                  # Database and JWT config
│   ├── controllers/             # Business logic for routes
│   ├── middleware/              # Middleware functionality
│   ├── models/                  # MongoDB models
│   ├── routes/                  # API routes
│   ├── utils/                   # Utility functions (e.g., authentication middleware)
│   ├── server.js                # Server entry point
│   └── .env                     # Environment variables (DB URI, JWT secret, etc.)
│
├── frontend/                    # Frontend folder
│   ├── public/                  # Public assets (HTML, images)
│   ├── src/                     # Source files
│   │   ├── assets/              # Assets
│   │   ├── components/          # React components
│   │   ├── screens/             # Screens
│   │   ├── slices/              # Redux
│   │   ├── App.js               # Main React component
│   │   └── main.js              # React entry point
│   └── package.json             # Frontend dependencies and scripts
│
├── .gitignore                   # Git ignore file
└── README.md                    # Project readme
```

## Backend Setup

1. Clone the repository:

```plaintext
git clone https://github.com/TanveerNS/mern-auth.git
cd mern-auth/backend
```

2. Install backend dependencies:

npm install

3. Run the backend server:

npm start

The backend will now be running on http://localhost:5000.

## Frontend Setup

1. Navigate to the frontend folder:

cd frontend

2. Install frontend dependencies:

Install frontend dependencies:

npm install

Run the frontend development server:

npm start

The frontend will now be running on http://localhost:3000.