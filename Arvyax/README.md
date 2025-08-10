
# Arvyax Wellness Session Platform

Full-stack demo app built with **React frontend** and **Node/Express + MongoDB backend**.  
Features include:  
- User registration/login with JWT authentication  
- Public sessions browsing  
- User sessions management (draft + publish)  
- Session editor with auto-save support  

---

## Project Structure

```

root/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── .env.example
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── .env.example
│   │   └── ...
│   ├── package.json
│   └── ...
└── README.md

````

---

## Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v16 or above recommended)  
- npm (comes with Node.js)  
- MongoDB instance (local or cloud)  

---

## Installation & Setup

### Backend

1. Navigate to backend folder:  
   ```bash
   cd backend
````

2. Copy environment file and update your credentials (MongoDB URI, JWT secret):

   ```bash
   cp .env.example .env
   ```
3. Install required packages:

   ```bash
   npm install express mongoose bcryptjs jsonwebtoken cors
   npm install --save-dev nodemon
   ```
4. Start the backend server in development mode with auto-reload:

   ```bash
   npm run dev
   ```

   > **Note:** `npm run dev` should be configured in your `package.json` scripts as `"dev": "nodemon server.js"`

---

### Frontend

1. Navigate to frontend folder:

   ```bash
   cd frontend
   ```
2. (Optional) Copy `.env.example` if you want to customize environment variables:

   ```bash
   cp .env.example .env
   ```
3. Install required packages:

   ```bash
   npm install react react-dom axios react-icons react-toastify
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```
4. Start frontend dev server:

   ```bash
   npm start
   ```

   > Frontend expects backend API base URL in `.env` as `REACT_APP_API_URL` (default: `http://localhost:4000/api`)

---

## Running Locally

* Backend API runs on: `http://localhost:4000/api`
* Frontend runs on: `http://localhost:4000` or the port specified by your React setup

---

## API Endpoints

| Method | Route                         | Description                                                              | Auth Required |
| ------ | ----------------------------- | ------------------------------------------------------------------------ | ------------- |
| POST   | `/api/auth/register`          | Register new user (`{ email, password }`)                                | No            |
| POST   | `/api/auth/login`             | Login user (`{ email, password }`)                                       | No            |
| GET    | `/api/sessions`               | Get all public sessions                                                  | No            |
| GET    | `/api/my-sessions`            | Get all sessions of logged-in user                                       | Yes           |
| GET    | `/api/my-sessions/:id`        | Get single session by ID                                                 | Yes           |
| POST   | `/api/my-sessions/save-draft` | Save or update draft session (`{ id?, title, tags: [], json_file_url }`) | Yes           |
| POST   | `/api/my-sessions/publish`    | Publish a session (`{ id, title, tags: [], json_file_url }`)             | Yes           |

---

## Notes & Recommendations

* **Authentication:** JWT tokens are stored in `localStorage` for simplicity. For better security, consider storing tokens in httpOnly, secure cookies.
* **Security:** Add rate limiting, input validation, sanitization, and proper error handling in production.
* **File Uploads:** If your sessions require uploading JSON or other files, implement secure upload handlers (e.g., AWS S3, Cloudinary).
* **Deployment:**

  * Backend: Railway, Render, Heroku, etc.
  * Frontend: Vercel, Netlify, or any static hosting

---

## Important Packages Used

### Backend

* `express` — Web server framework
* `mongoose` — MongoDB object modeling
* `bcryptjs` — Password hashing
* `jsonwebtoken` — JWT token management
* `cors` — Cross-origin resource sharing
* `nodemon` — Auto restart backend on changes (dev dependency)

### Frontend

* `react`, `react-dom` — React core libraries
* `axios` — HTTP client
* `react-icons` — UI icons
* `react-toastify` — Toast notifications
* `tailwindcss`, `postcss`, `autoprefixer` — Styling framework and processors

---

## Troubleshooting

* **MongoDB Connection Issues:** Verify MongoDB URI in `.env` and that your database is running.
* **CORS Errors:** Ensure backend has `cors` configured to allow frontend origin.
* **Port Conflicts:** Adjust ports in backend `server.js` and frontend `.env` as needed.

---

## License

MIT License © 2025 Your Name

---

## Contact

For questions or contributions, please reach out: [niteshkumarsharma831@gmail.com](mailto:niteshkumarsharma831@gmail.com)
---

Thank you for using **Arvyax Wellness Session Platform**! 🚀

```

---

If you want me to generate `.env.example` samples or `package.json` scripts, just say!
```
