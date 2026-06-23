# 🛒 PyShop - Modern E-Commerce Platform

![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green.svg)

A full-stack e-commerce web application built with a microservices-inspired architecture. PyShop features a robust FastAPI backend, a responsive React frontend, and uses PostgreSQL for persistent data and Redis for ultra-fast shopping cart management. Everything is fully containerized using Docker for a seamless developer experience.

## 📋 Table of Contents
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

- **JWT Authentication:** Secure user registration, login, and Role-Based Access Control (Admin vs Customer).
- **Ultra-Fast Shopping Cart:** Built on top of Redis for real-time state management and ephemeral storage.
- **Product Management:** Full CRUD operations for products (Admin only).
- **Relational Database:** Orders, users, and products stored safely in PostgreSQL using SQLAlchemy ORM.
- **Dockerized Environment:** One-command deployment using Docker Compose. No local dependency nightmares.
- **Automatic API Docs:** Interactive Swagger UI and ReDoc generated out-of-the-box by FastAPI.

---

## 💻 Tech Stack

### Frontend
- React.js (Vite)
- TailwindCSS
- Axios (for API requests)

### Backend
- Python 3.10+
- FastAPI
- SQLAlchemy & Pydantic
- Passlib & Bcrypt (Password Hashing)
- PyJWT (Authentication)

### Infrastructure & Databases
- PostgreSQL (Primary Relational Database)
- Redis (In-memory Cache / Cart Database)
- Docker & Docker Compose

---

## 📁 Project Structure

```text
PyShop/
├── backend/                # FastAPI application
│   ├── app/                # Main application code
│   │   ├── api/            # API routers and endpoints
│   │   ├── core/           # Config, security, and DB setup
│   │   ├── models/         # SQLAlchemy models
│   │   ├── schemas/        # Pydantic schemas
│   │   └── main.py         # FastAPI entry point
│   ├── requirements.txt    # Python dependencies
│   └── Dockerfile          # Backend container configuration
├── frontend/               # React application (Vite)
│   ├── src/                # Components, pages, hooks, etc.
│   ├── package.json        # Node dependencies
│   └── Dockerfile          # Frontend container configuration
├── docker-compose.yml      # Orchestrates all services
└── README.md               # Project documentation
```

---

## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.
- [Git](https://git-scm.com/) installed.

### 1. Clone the repository

```bash
git clone https://github.com/dereksxt/PyShop.git
cd PyShop
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory and add your environment variables:

```env
# Database Configuration
POSTGRES_USER=postgres
POSTGRES_PASSWORD=yourpassword
POSTGRES_DB=pyshop_db
POSTGRES_HOST=db
POSTGRES_PORT=5432

# Redis Configuration
REDIS_URL=redis://redis:6379/0

# Security
SECRET_KEY=your_super_secret_jwt_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### 3. Build and Run with Docker

Start all services (Frontend, Backend, PostgreSQL, and Redis) using Docker Compose:

```bash
docker-compose up --build
```

### 4. Access the Application

Once the containers are up and running:

| Service | URL |
|---|---|
| Frontend (React) | http://localhost:5173 |
| Backend API | http://localhost:8000 |
| Swagger UI | http://localhost:8000/docs |
| ReDoc | http://localhost:8000/redoc |

> To stop the application, press `Ctrl+C` or run `docker-compose down`.

---

## 📖 API Documentation

The backend exposes a fully documented RESTful API. When running the application locally, visit [http://localhost:8000/docs](http://localhost:8000/docs) to interact with the endpoints. You can create users, authenticate to get a JWT token, and test the cart and product endpoints directly from your browser.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/dereksxt/PyShop/issues).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by [dereksxt](https://github.com/dereksxt)
