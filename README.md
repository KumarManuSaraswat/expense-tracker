# Track Expenso

A full-stack MERN expense tracker app where users can register, log in, and manage personal expenses with category summaries and a clean dashboard UI.

## Live Demo
- Frontend: https://track-expenso.netlify.app/
- Backend: https://expense-tracker-api-iq2a.onrender.com/

## Features
- User registration and login with JWT authentication
- Protected routes for personal expense data
- Add, edit, and delete expenses
- Category-wise summary
- Total expense calculation
- Persistent login using localStorage
- Clean responsive light UI inspired by Comet/Perplexity

## Tech Stack
- Frontend: React, Vite, React Router, Axios, CSS
- Backend: Node.js, Express.js
- Database: MongoDB Atlas, Mongoose
- Auth: JWT, bcryptjs
- Deployment: Netlify (frontend), Render (backend)

## Folder Structure
```bash
expense-tracker/
  client/
  server/
```

## Local Setup

### 1. Clone the repository
```bash
git clone https://github.com/KumarManuSaraswat/expense-tracker.git
cd expense-tracker
```

### 2. Setup backend
```bash
cd server
npm install
```

Create a `.env` file inside `server/`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend:
```bash
npm run dev
```

### 3. Setup frontend
Open another terminal:

```bash
cd client
npm install
```

Create a `.env` file inside `client/`:

```env
VITE_API_URL=http://localhost:5000/api
```

Run frontend:
```bash
npm run dev
```

## Usage
- Register a new account or log in
- Add expenses with title, amount, category, date, and note
- Edit or delete expenses
- View total expenses and category summary

## What I Learned
This project helped me learn how to:
- build a full-stack MERN application from scratch
- connect React frontend with Express backend
- implement JWT authentication and protected routes
- manage MongoDB data with Mongoose
- deploy a frontend and backend separately

## Future Improvements
- Monthly charts and analytics
- Expense filters by date range
- Download expense report as PDF/CSV
- Better form validation and notifications

## Author
Built by Manu as a MERN portfolio project.