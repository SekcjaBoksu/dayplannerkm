# DayPlannerKM

DayPlannerKM is a task management application built using a **Spring Boot** backend, **MySQL** database, and a **React.js** frontend. It supports managing tasks, tracking completion, and viewing tasks by date.

---

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Setup Instructions](#setup-instructions)
    - [Backend (Spring Boot)](#backend-spring-boot)
    - [Frontend (React)](#frontend-react)
- [Features](#features)
- [Project Structure](#project-structure)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Troubleshooting](#troubleshooting)
---

## Getting Started

### Prerequisites

1. **XAMPP**: Install [XAMPP](https://www.apachefriends.org/download.html).
   - Ensure that **Apache** and **MySQL** are running in XAMPP.
2. **Java**: Install JDK 11 or later.
3. **Node.js and npm**: Install the latest versions of Node.js and npm.

---

## Setup Instructions

### Backend (Spring Boot)

1. Navigate to the `backend` directory:
   ```bash
   cd backend

2. Install dependencies:
   ```bash
   npm install

3. Start the frontend development server:
   ```bash
   npm run dev
4. Open the application in your browser at the address provided by the terminal (usually http://localhost:5173).
### Features
1. Task Management: Add, edit, delete, and mark tasks as completed.
2. Calendar View: View tasks by specific dates.
3. All Tasks View: See all tasks in a list with filtering and searching.
4. Progress Tracker: Visualize task completion using a gauge.
### Project Structure
## Backend
- TaskController: Manages API endpoints for tasks.
- TaskService & TaskServiceImplementation: Business logic for task operations.
- TaskRepository: Interface for database operations.
- Task: Entity representing a task in the database.
## Frontend
- Calendar: Displays tasks by date using a Material-UI calendar.
- TaskList: Manages tasks for a specific date.
- AllTasksList: Displays all tasks with a search and edit/delete functionality.
- TaskCompletionGauge: Visualizes the completion rate of tasks.
### Troubleshooting
1. Backend not starting?
- Ensure that MySQL is running in XAMPP.
- Verify your database credentials in application.properties.
2. Frontend not loading?
- Check that the backend is running at http://localhost:8080.
- Ensure dependencies are installed with npm install.

