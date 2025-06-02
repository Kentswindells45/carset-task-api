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
   MONGODB_URI=mongodb://127.0.0.1:27017/carset-task-api
   JWT_SECRET=SECRET_KEY
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