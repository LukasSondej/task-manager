# Task Manager App ☑️

A full-stack web application for secure and efficient task management.
Built as a portfolio project to demonstrate end-to-end development skills with modern web technologies.

**🌐 Live Demo:** [https://task-manager-lukas-sondej.netlify.app](https://task-manager-lukas-sondej.netlify.app)

---

## 📋 Features

- **Secure Authentication** – User registration and login with JWT access tokens, refresh tokens, and bcrypt password hashing.
- **Task Management** – Create, edit, delete, and browse tasks with title, description and status.
- **State Management** – Centralized and predictable application state handled with **Redux Toolkit**.
- **Smart Validation** – End-to-end data validation on both frontend and backend using **Zod**.
- **Error Handling** – Clear, user-friendly toast notifications for all error scenarios.
- **Responsive UI** – Fully responsive design that works seamlessly on desktop and mobile.
- **Unit Testing** – Core business logic and Redux slices are covered by unit tests using **Vitest**.

---

## 📸 Screenshots

### 1. Main task dashboard

<img width="1913" height="938" alt="image" src="https://github.com/user-attachments/assets/bf64f543-0849-4152-94bf-927542683d1f" />


### 2. Smart form validation

<img width="1907" height="935" alt="image" src="https://github.com/user-attachments/assets/6669ae25-ca57-4b76-abce-f437457a7862" />


### 3. Task Management & Interactive Modals

<img width="1910" height="936" alt="image" src="https://github.com/user-attachments/assets/c25df11c-9bf0-4866-8cc9-423e9ea55c7b" />


---

## 🛠️ Tech Stack

### Frontend
- **React 19**
- **TypeScript**
- **Vite**
- **React Router v7**
- **Redux Toolkit** (state management)
- **Tailwind CSS v4** & **shadcn/ui**
- **React Hook Form** + **Zod** (form handling & validation)
- **Axios** (HTTP client)
- **Sonner** (toast notifications)
- **Vitest** (unit testing)

### Backend
- **Node.js** & **Express 5**
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL**
- **JWT** & **Bcrypt** (authentication & security)
- **Zod** (request validation)

---

## 🚀 Run Locally

Follow these steps to get the app running on your local machine.

### Prerequisites
- [Node.js](https://nodejs.org/) **v18 or newer**
- Yarn (or npm)
- [PostgreSQL](https://www.postgresql.org/) installed and running

### 1. Clone the repository

```bash
git clone https://github.com/LukasSondej/task-manager.git
cd task-manager
```

### 2. Backend setup

Open a terminal and navigate to the backend folder:

```bash
cd backend
yarn install
```

Create a `.env` file inside `backend/` with your database connection string and JWT secrets:

```env
DATABASE_URL="postgresql://your_user:your_password@localhost:5432/taskmanager"
JWT_SECRET="your_super_secret_key"
JWT_REFRESH_SECRET="your_refresh_secret_key"
PORT=3000
```

> **Note:** Replace `your_user`, `your_password` and secrets with your local credentials.

Push the database schema (creates all tables) and start the server:

```bash
npx prisma db push
yarn dev
```

✅ The API will be running at **http://localhost:3000**

### 3. Frontend setup

Open a new terminal window, go back to the project root, and enter the frontend folder:

```bash
cd frontend
yarn install
yarn dev
```

✅ The React app will open automatically at **http://localhost:5173**

---

## 📁 Project Structure

```
task-manager/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma         # Database schema (Prisma models)
│   ├── src/
│   │   ├── controllers/          # Express route controllers
│   │   ├── routes/               # API route definitions
│   │   ├── middlewares/          # JWT auth middlewares
│   │   ├── schemas/              # Zod validation schemas
│   │   └── index.ts              # Express entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/                  # Axios instance & interceptors
│   │   ├── app/                  # Redux store configuration
│   │   ├── components/           # Reusable UI & shadcn/ui components
│   │   ├── features/             # Redux slices (auth, tasks)
│   │   ├── pages/                # Login, Register, Dashboard
│   │   ├── schemas/              # Zod validation schemas
│   │   └── main.tsx              # React application entry point
│   └── package.json
└── README.md
```

---

## 👤 Author

**Łukasz Sondej** – [@LukasSondej](https://github.com/LukasSondej)
