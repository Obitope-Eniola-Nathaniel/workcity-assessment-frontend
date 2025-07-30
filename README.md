# Workcity Client & Project Manager – Frontend (React)

This is the **frontend** application for the Workcity Full-Stack Developer Assessment. Built with **React**, **React Router**, **Axios**, and styled using **Tailwind CSS**. It interacts with a Node.js/Express API backend and includes full client/project management, authentication with JWT, and role-based access control.

---

##  Features

- ✅ Login / Signup (JWT Auth)
- ✅ AuthContext for token sharing across components
- ✅ Client Dashboard (View, Add, Edit, Delete)
- ✅ Project Dashboard (View, Add, Edit, Delete)
- ✅ View Projects under a specific client
- ✅ Fully responsive UI using Tailwind CSS
- ✅ Route protection for authenticated views

---

##  Technologies

- React
- React Router DOM
- Axios
- Tailwind CSS
- Context API


---

## Setup Instructions

### 1. Clone the frontend repo

```bash
git clone https://github.com/Obitope-Eniola-Nathaniel/workcity-assessment-frontend.git
cd workcity-frontend
```



### 4. Start the development server

```bash
npm run dev
```

Frontend will be live at: `http://localhost:3000`

---

## 🗂️ Project Structure

```bash
├── public/
├── src/
│   ├── api/                # Axios config
│   ├── components/         # Reusable components (Navbar, etc.)
│   ├── context/            # AuthContext (Token sharing)
│   ├── pages/              # Route pages (Login, Dashboard, etc.)
│   ├── App.jsx             # Route definitions
│   ├── main.jsx            # App entry point
│   └── index.css           # Tailwind base styles
├── .env                    # API URL config
├── tailwind.config.js      # Tailwind customization
├── vite.config.js          # Vite config
```

---
## 🧠 Assumptions

* The backend API is secured with JWT, and all private routes require a Bearer token.
* The logged-in user is stored in context using React’s Context API.
* API responses follow standard REST patterns (e.g., `GET /clients`, `POST /projects`, etc.).


---

## Optional Enhancements

* Loading spinners or skeleton loaders
* Toast messages for success/errors
* Paginated client/project lists
* Filter or search clients/projects

---

## License

MIT

---

## Contact

If you have any questions or suggestions, feel free to reach out or open an issue in the repository.



