## Setup Instructions

- Run `npm install` to install all dependencies (including nodemon).
- Start the development server with `npm run dev`.

## API Overview

This project implements a Task Manager API with full CRUD operations:

- **GET /tasks**: Get all tasks
- **GET /tasks/:id**: Get a task by ID
- **POST /tasks**: Add a new task
- **PUT /tasks/:id**: Update an existing task
- **DELETE /tasks/:id**: Delete a task

## Notes

- All endpoints are available under `tasks` if you use the provided router setup.
- Make sure to run the server from the project root directory.
