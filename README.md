# CarSet Task Management API

## Overview
The CarSet Task Management API is a backend service for managing tasks related to luxury car rentals. It supports user authentication, secure task management, and robust error handling.

## Features
- User registration and login with JWT authentication
- Secure password hashing with bcrypt
- Create, retrieve, update, complete, and delete tasks (CRUD)
- Get a single task by ID
- Public endpoint to add a task without authentication
- Centralized error handling middleware
- MongoDB integration with Mongoose

## Tech Stack
- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Tokens (JWT)
- Bcrypt
- express-validator

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Kentswindells45/carset-task-api.git
   cd carset-task-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**  
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

### Running the Application

1. **Start the server:**
   ```bash
   npm start
   ```

2. The server will run on `http://localhost:5000` (or the port specified in your `.env`).

## API Endpoints

### Authentication
- **POST /api/auth/register** — Register a new user
- **POST /api/auth/login** — Login and receive a JWT

### Task Management (Protected: require JWT in `Authorization` header)
- **POST /api/tasks** — Create a new task
- **GET /api/tasks** — Retrieve all tasks for the authenticated user
- **GET /api/tasks/:id** — Retrieve a single task by ID
- **PUT /api/tasks/:id** — Update an existing task
- **PATCH /api/tasks/:id/complete** — Mark a task as completed
- **DELETE /api/tasks/:id** — Delete a task

### Public Task Endpoint
- **POST /api/tasks/add** — Add a new task without authentication (for demo/testing)

## Error Handling

All errors are handled by a centralized error handler and returned in the following format:
```json
{
  "success": false,
  "message": "Error message here"
}
```

## Usage Example

### Register a User
```bash
curl -X POST http://localhost:5000/api/auth/register \
-d '{"name": "John Doe", "email": "john@example.com", "password": "password123"}' \
-H "Content-Type: application/json"
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
-d '{"email": "john@example.com", "password": "password123"}' \
-H "Content-Type: application/json"
```

### Create a Task (Authenticated)
```bash
curl -X POST http://localhost:5000/api/tasks \
-d '{"title": "Verify vehicle documents", "description": "Check all necessary documents."}' \
-H "Authorization: Bearer your_jwt_token" \
-H "Content-Type: application/json"
```

## License
MIT

---
Oppong Kelvin