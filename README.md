# Comment App

This is a simple comment application built with Next.js for the frontend and Node.js for the backend, using Socket.IO for real-time comment updates and MySQL as the database.

## Table of Contents
- [Getting Started](#getting-started)
- [Running the Application](#running-the-application)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Database Setup](#database-setup)

## Getting Started

1. Clone the repository:
    ```bash
    git clone https://github.com/WadkarNaved15/Real-Time-Comment-System.git
    cd Real-Time-Comment-System
    ```

2. Install dependencies for both frontend and backend:
    ```bash
    cd client
    npm install
    cd ../server
    npm install
    ```

## Running the Application

### Frontend

You have two options to run the Next.js application:

1. For development mode:
    ```bash
    cd client
    npm run dev
    ```

2. For production mode (after building):
    ```bash
    cd client
    npm run build
    npm start
    ```

### Backend

You have two options to run the Node.js server:

1. For development mode:
    ```bash
    cd server
    npm run dev
    ```

2. For production mode:
    ```bash
    cd server
    node server.js
    ```

## Database Setup

1. Ensure MySQL Server is running.
2. Create a new database:
   ```sql
   CREATE DATABASE your_database_name;
   CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

## Environment Configuration

To configure the application environment, please follow these steps:

1. Rename the `.env.example` file to `.env` in both client & server.
2. Open the newly created `.env` file and input the necessary values as specified in the example.
