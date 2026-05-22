# 🎓 Production-Ready Student Management System (SMS)

A complete, production-ready, full-stack Student Management System built using a premium modern UI and high-performance cloud & DevOps integrations.

---

## 🚀 Tech Stack

### Frontend
* **React** (v18+) for dynamic component lifecycle management
* **Tailwind CSS** for custom design-system and glassmorphism styling
* **Axios** for interceptor-based authorized HTTP client communications
* **React Router DOM** for protected declarations, routing, and location state sync

### Backend
* **Node.js & Express.js** for MVC structured REST API layer
* **JWT Authentication** for stateless secure sessions (JSON Web Tokens)
* **Mongoose** (MongoDB Object Modeling) for schemas and transactional queries

### Database
* **MongoDB Atlas** (Cloud Database) or **Local MongoDB Server**

### DevOps & Cloud
* **Docker & Docker Compose** for multi-container orchestration
* **Nginx** configured as a high-performance reverse proxy & static asset server
* **Jenkins** with a fully declarative, robust CI/CD pipeline (`Jenkinsfile`)
* **GitHub Actions** for CI check-suites and validation workflows (`deploy.yml`)
* **AWS EC2 / Render / Railway** production-ready deployment configurations

---

## 🛠️ Features

### 1. Secure Authentication
* **Admin Login Portal** with real-time field validation.
* **Stateless JWT Guard** implemented via express-level middleware.
* **Protected Routes** in React that automatically route unauthenticated users.
* **Synchronized Session Lifecycle** where logging out destroys local state securely.

### 2. Full Student CRUD Operations
* **Add Student Profile**: Instantly record full names, roll numbers, email addresses, course streams, contact information, and address records.
* **Interactive Directory**: Displays a beautiful administrative grid with real-time responsive columns.
* **Update Records**: Edit existing profiles with pre-populated input fields and instantaneous database persistence.
* **Secure Deletion**: Delete records safely using integrated Mongoose operations.
* **Search & Filters**: Perform live matches across name, roll number, email, and courses simultaneously.

### 3. Comprehensive Schema Architecture
* `name`: string, required, trimmed.
* `rollNumber`: string, required, unique, indexed.
* `email`: string, required, unique, lowercased, validated.
* `course`: string, required, trimmed.
* `phone`: string, required, trimmed.
* `address`: string, required, trimmed.
* `timestamps`: auto-generated database fields (CreatedAt, UpdatedAt).

### 4. Interactive Dashboard
* **Dynamic Analytics**: Real-time counter showing the exact total count of student records in the database.
* **Recent Entries Feed**: Automatically shows details of recently added students.
* **Sync Indicators**: Beautiful active indicators matching visual layout design principles.

---

## 📂 Project Structure

```bash
student-management-system/
│
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── client/
│   ├── public/                 # Static public files
│   ├── src/
│   │   ├── components/         # Protected routes, Alert, Navbar, Sidebar
│   │   ├── pages/              # Login, Dashboard, Student List, Add/Edit forms
│   │   ├── services/           # Axios client instance
│   │   ├── utils/              # Token storage handlers
│   │   ├── App.js              # Base router and layout engine
│   │   └── index.js            # Frontend entry point
│   ├── Dockerfile              # Multi-stage optimized UI build container
│   ├── package.json            # React dependencies and proxy configuration
│   └── tailwind.config.js      # Styling framework tailwind configurations
├── server/
│   ├── config/
│   │   └── db.js               # Mongoose database bootstrapper
│   ├── controllers/
│   │   ├── authController.js   # JWT authentication handler
│   │   └── studentController.js# Student CRUD & filter implementation
│   ├── middleware/
│   │   ├── authMiddleware.js   # Authorization request header filter
│   │   ├── errorHandler.js     # Express general exception catcher
│   │   └── notFound.js         # Fallback 404 handler
│   ├── models/
│   │   └── Student.js          # Mongoose Schema for Students
│   ├── routes/
│   │   ├── authRoutes.js       # Auth endpoint registration
│   │   └── studentRoutes.js    # Student endpoints registration
│   ├── Dockerfile              # Backend microservice runner
│   ├── index.js                # Express boot script
│   └── package.json            # Server-side package declarations
├── nginx/
│   └── nginx.conf              # Reverse proxy routing rules
├── .env.example                # Sample environment variables
├── docker-compose.yml          # Global multi-container deployment recipe
├── Jenkinsfile                 # Jenkins declarative pipeline script
└── README.md                   # System configuration & operational playbook
```

---

## ⚙️ Environment Configuration

Create a `.env` file in the root directory (and copy it inside `/server/.env` for native development).

```env
# MongoDB Connection URI (Use 127.0.0.1 for local dev, Compose handles docker service automatically)
MONGO_URI=mongodb://127.0.0.1:27017/student-management

# Secret token key for JWT verification
JWT_SECRET=supersecretjwtkey12345!

# Administrative authentication defaults
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=SecureAdmin123!

# Port for back-end microservice
PORT=5000

# Client origin for CORS authorization
CLIENT_URL=http://localhost:3000
```

---

## 🏃 Run Commands & Local Execution

### Option A: Standard Native Setup (Without Containers)

If you have Node.js and MongoDB installed locally:

1. **Start MongoDB Service**: Ensure your local MongoDB server is running on `port 27017`.
2. **Setup Backend**:
   ```bash
   cd server
   npm install
   npm run dev
   ```
   *The server will start on port 5000 and log "MongoDB connected".*
3. **Setup Frontend**:
   ```bash
   cd client
   npm install
   npm start
   ```
   *The React development server will start and open your browser to `http://localhost:3000`.*

---

### Option B: High-Fidelity Docker Setup (Containerized)

To build and orchestrate the entire production-grade stack (Frontend, Backend, Database, Nginx Reverse Proxy) in a single command:

```bash
docker-compose up --build -d
```

#### Container Ports & Endpoint Map:
* **Nginx Entry Point**: `http://localhost:80` (Proxies requests internally)
* **React Dev Interface**: `http://localhost:3000`
* **Node API Server**: `http://localhost:5000`
* **MongoDB Instance**: `http://localhost:27017`

To shut down the orchestrated environment:
```bash
docker-compose down -v
```

---

## 📡 REST API Reference

All requests must supply the JSON header `Content-Type: application/json`. Protected endpoints require an `Authorization: Bearer <TOKEN>` header.

| Endpoint | Method | Security | Description |
|---|---|---|---|
| `/api/auth/login` | `POST` | Public | Auth admin, returns JWT & user profile |
| `/api/students` | `GET` | Protected | Queries, filters, and searches students |
| `/api/students` | `POST` | Protected | Adds new student profile record |
| `/api/students/:id`| `GET` | Protected | Fetches a single student profile by ID |
| `/api/students/:id`| `PUT` | Protected | Updates existing student fields |
| `/api/students/:id`| `DELETE` | Protected| Safely removes a student profile from DB |

#### Sample Login Request Body (`POST /api/auth/login`)
```json
{
  "email": "admin@example.com",
  "password": "SecureAdmin123!"
}
```

#### Sample Student Create Request (`POST /api/students`)
```json
{
  "name": "Jane Doe",
  "rollNumber": "CS2026001",
  "email": "jane.doe@example.com",
  "course": "Computer Science",
  "phone": "+15550199",
  "address": "123 University Drive, Tech City"
}
```

---

## 🛠️ DevOps CI/CD Workflows

### 1. GitHub Actions (Continuous Integration)
The deployment workflow in `.github/workflows/deploy.yml` triggers on any push to the `main` branch:
1. Sets up **Node.js (v20)** environment.
2. Resolves frontend and backend dependencies using npm caches.
3. Builds the production-ready React client bundle.
4. Executes standard pipeline validation.
5. Performs dry Docker image builds for backend, frontend, and Nginx containers.

### 2. Jenkins declarative pipeline (`Jenkinsfile`)
Standard stages executed on your Jenkins worker nodes:
* **Checkout**: Clones the active Git branch.
* **Install Backend**: Installs server-side dependencies.
* **Install Frontend**: Installs client-side dependencies.
* **Build Frontend**: Compiles static React files via Webpack.
* **Test**: Runs automated test suites.
* **Build Docker Images**: Assembles containers.
* **Deploy**: Orchestrates updates with zero-downtime using `docker-compose up -d --remove-orphans`.

---

## ☁️ Production Deployment Guide

### Deploying to AWS EC2
1. Spin up an **Ubuntu Server** on AWS.
2. Configure **Security Groups** to open ports `80` (HTTP) and `443` (HTTPS).
3. Connect via SSH and install Docker:
   ```bash
   sudo apt update
   sudo apt install -y docker.io docker-compose
   sudo systemctl enable --now docker
   ```
4. Clone this repository onto the instance.
5. Create a production `.env` file with your secure environment configurations.
6. Launch the production containers under Nginx:
   ```bash
   sudo docker-compose up -d --build
   ```

### Deploying to Render / Railway
* **Frontend Hosting**: Deploy `/client` as a **Static Web App**. Configure the Build Command to `npm run build` and the output Publish Directory to `build/`. Add a `REACT_APP_API_URL` environment variable pointing to your backend service.
* **Backend Hosting**: Deploy `/server` as a **Web Service**. Configure start command to `npm start`. Bind your database by injecting your cloud-managed `MONGO_URI` connection string.
