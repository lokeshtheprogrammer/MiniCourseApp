# Mini Course Subscription App

A full-stack MERN application for subscribing to mini courses.

## Features

- **Authentication**: JWT-based login (no signup required, per specs).
- **Authentication**: JWT-based Signup and Login.
- **Course Listing**: View available free and paid courses.
- **Course Details**: Detailed view with subscription options.
- **Subscription Logic**: 
  - Free courses: Instant subscription.
  - Paid courses: Requires valid promo code (`BFSALE25`) for 50% discount.
- **My Courses**: Dashboard of subscribed courses.
- **Tech Stack**: React, Node.js, Express, MongoDB (Mongoose), Bootstrap.

## Prerequisites

- Node.js (v14+)
- MongoDB (Local or Atlas)
- Git

## Setup Instructions

### 1. Database Setup

Ensure you have MongoDB running or use the provided Atlas URI in `backend/.env`.

```env
MONGO_URI=mongodb+srv://admin:admin@cluster0.xir5dho.mongodb.net/?appName=Cluster0
```

### 2. Backend Setup

```bash
cd backend
npm install
npm run seed  # Seeding dummy users and courses
npm run dev   # Starts server on port 5000
```

**Dummy Users:**
- Email: `admin@example.com` / Password: `password123`
- Email: `john@example.com` / Password: `password123`
- Email: `jane@example.com` / Password: `password123`
- Email: `bob@example.com` / Password: `password123`
- Email: `alice@example.com` / Password: `password123`

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

The app will run on `http://localhost:3000`.

## API Endpoints

- `POST /auth/signup` - Register a new user
- `POST /auth/login` - Login user
- `GET /courses` - Get all courses
- `GET /courses/:id` - Get course details
- `POST /subscribe` - Subscribe to a course (Protected)
- `GET /my-courses` - Get user subscriptions (Protected)

🚀 Deployment
✅ Backend (Koyeb)

Push backend folder to GitHub (as separate repo or set root directory as backend).

Login to Koyeb and click Create Service.

Select GitHub repo and branch.

Set Environment Variables:

PORT = 8000

MONGO_URI = <your_mongodb_atlas_url>

JWT_SECRET = <your_secret_key>

NODE_ENV = production

Build Command:

npm install


Start Command:

node server.js


Deploy and copy your backend live URL:

Example:

https://your-backend.koyeb.app

✅ Frontend (Vercel)

Push frontend folder to GitHub.

Login to Vercel and click New Project.

Import your GitHub frontend repo.

Set Environment Variable in Vercel:

Key:

VITE_API_URL


Value:

https://your-backend.koyeb.app


Build Command:

npm run build


Output Directory (Publish Directory):

dist


Click Deploy and get your frontend live URL:

Example:

https://your-frontend.vercel.app
