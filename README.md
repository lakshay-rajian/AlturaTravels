# 🏔️ Altura Travels

Altura Travels is a full-stack modern web application for a premier travel agency specializing in extraordinary journeys across North India and Uttarakhand. It features a stunning, highly responsive frontend and a robust backend to manage travel packages, customer bookings, travel blogs, and an administrative dashboard.

## 🚀 Live Demo
- **Frontend (Vercel):** [https://altura-travels.vercel.app](https://altura-travels.vercel.app) *(or your specific Vercel URL)*
- **Backend API (Render):** `https://altura-backend-6y6f.onrender.com`

---

## 🛠️ Technology Stack

### Frontend
- **React.js (Vite)** - Fast, modern UI library
- **Tailwind CSS** - Utility-first styling for beautiful, responsive design
- **React Router** - Client-side routing for SPA experience
- **Axios** - For fetching data from the backend API

### Backend
- **Node.js & Express.js** - Scalable server architecture
- **MongoDB & Mongoose** - NoSQL database for flexible data modeling
- **JWT (JSON Web Tokens)** - Secure authentication and authorization
- **Multer** - Middleware for handling local image uploads

---

## ✨ Key Features

- **Dynamic Travel Packages:** Browse curated travel packages with location, duration, budget filtering, and sorting capabilities.
- **Booking System:** Authenticated users can book trips, select travel dates, and manage their reservations.
- **Travel Blogs:** A rich blog section with category filters and search, allowing admins to share travel stories and guides.
- **Admin Dashboard:** A secure panel for administrators to:
  - Add, edit, and delete travel packages
  - Manage and publish travel blogs
  - Track and update customer bookings
  - Handle image uploads for packages and blogs
- **Premium UI/UX:** Features modern design aesthetics, including glowing gradient hero sections, glassmorphism elements, and fully responsive layouts.

---

## ⚙️ Local Development Setup

Follow these instructions to run the project locally.

### 1. Clone the repository
```bash
git clone https://github.com/lakshay-rajian/AlturaTravels.git
cd AlturaTravels
```

### 2. Setup the Backend
Open a terminal and navigate to the backend directory:
```bash
cd altura-backend
npm install
```

Create a `.env` file in the `altura-backend` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

Start the backend server:
```bash
npm run dev
```

### 3. Setup the Frontend
Open a new terminal and navigate to the root directory:
```bash
npm install
```

Create a `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:5000/api
VITE_IMAGE_URL=http://localhost:5000
```

Start the frontend development server:
```bash
npm run dev
```

---

## 📦 Deployment Information

- **Frontend (Vercel):** The frontend is configured as a Single Page Application (SPA). The `vercel.json` file handles rewriting all routes to `index.html` to prevent 404 errors on refresh.
- **Backend (Render):** The backend serves the API and static images from the `/uploads` directory. Environment variables (like `CLIENT_URL`) must be properly set in the Render dashboard to prevent CORS issues.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page if you want to contribute.

## 📝 License

This project is licensed under the MIT License.
