# CarSet Task Management API

## Overview
The CarSet Task Management API is a backend service designed to help the CarSet operations team manage tasks related to luxury car rentals. This API allows users to authenticate, create, retrieve, update, complete, and delete tasks efficiently.

## Features
- User authentication with JWT
- Task management with CRUD operations
- Secure password storage using hashing

## Tech Stack
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JSON Web Tokens (JWT)
- Bcrypt for password hashing

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- MongoDB (local or cloud instance)
- npm (Node package manager)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/carset-task-api.git
   cd carset-task-api
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your MongoDB connection string and JWT secret:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

### Running the Application

1. Start the server:
   ```
   npm start
   ```

2. The server will run on `http://localhost:3000` (or the port specified in your code).

## API Endpoints

### Authentication
- **POST /auth/register**: Register a new user
- **POST /auth/login**: Secure login for users

### Task Management
- **POST /tasks**: Create a new task
- **GET /tasks**: Retrieve all tasks for the authenticated user
- **PUT /tasks/:id**: Edit an existing task
- **PATCH /tasks/:id/complete**: Mark a task as completed
- **DELETE /tasks/:id**: Delete a task

## Usage Examples

### Register a User
```bash
curl -X POST http://localhost:3000/auth/register -d '{"name": "John Doe", "email": "john@example.com", "password": "password123"}' -H "Content-Type: application/json"
```

### Create a Task
```bash
curl -X POST http://localhost:3000/tasks -d '{"title": "Verify vehicle documents", "description": "Check all necessary documents for the vehicle.", "assignedUserId": "user_id_here"}' -H "Authorization: Bearer your_jwt_token" -H "Content-Type: application/json"
```

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- Inspired by the need for efficient task management in the luxury car rental industry.