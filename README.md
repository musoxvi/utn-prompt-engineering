# utn-prompt-engineering

# Final Project - UTN Prompt Engineering

This project is the final assignment for the **Prompt Engineering** course at UTN. It focuses on leveraging AI tools for programming and software development. The application consists of a **frontend** built with React and a **backend** using Node.js, Express, and MongoDB. Firebase is also integrated for authentication via Google Login.

## 🎥 App Demo

![Demo](frontend/src/assets/demo.gif)

## Technologies Used

### Frontend

* **React**: Frontend library for building user interfaces
* **Vite**: Fast build tool and development server
* **Material UI**: UI components for a modern design
* **React Query**: Data fetching and caching management
* **MUI Table**: Displaying structured data in a tabular format

### Backend

* **Node.js**: JavaScript runtime for backend development
* **Express.js**: Lightweight web framework for building APIs
* **MongoDB**: NoSQL database for data storage
* **Firebase**: Authentication service (Google Login)

## Features

* Add, update, and delete mattresses
* Upload and manage mattress images
* Display inventory in a dynamic table
* Secure authentication with Google Login
* API integration for CRUD operations
* Toast notifications for user feedback

## Getting Started

### Prerequisites

Ensure you have the following installed:

* [Node.js](https://nodejs.org/) (LTS version recommended)
* [MongoDB](https://www.mongodb.com/) (For backend database storage)
* [Git](https://git-scm.com/)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/musoxvi/utn-prompt-engineering
   ```
2. Navigate to the project directory:
   ```sh
   cd utn-prompt-engineering
   ```
3. Install dependencies for both frontend and backend:
   ```sh
   cd frontend && npm install
   cd ../backend && npm install
   ```

### Running the Project

#### Start the Backend

1. Navigate to the backend directory:
   ```sh
   cd backend
   ```
2. Start the backend server:
   ```sh
   npm run dev
   ```

#### Start the Frontend

1. Open a new terminal and navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Start the frontend development server:
   ```sh
   npm run dev
   ```

This will launch the application at `http://localhost:5173/` by default.

### Building for Production

To create a production build for the frontend:

```sh
npm run build
```

To preview the build locally:

```sh
npm run preview
```

### Linting

To check and fix code formatting issues:

```sh
npm run lint
```

## Project Structure

```
📦 utn-prompt-engineering
 ┣ 📂 backend        # Backend service (Node.js + Express)
 ┃ ┣ 📂 models       # Database models
 ┃ ┣ 📂 routes       # API endpoints
 ┃ ┣ 📂 controllers  # Business logic
 ┃ ┣ 📂 config       # Database and Firebase config
 ┃ ┗ 📜 server.js    # Main server entry point
 ┣ 📂 frontend       # Frontend application (React + Vite)
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📂 assets       # Images and static files
 ┃ ┃ ┣ 📂 components   # Reusable UI components
 ┃ ┃ ┣ 📂 context      # React context for global state
 ┃ ┃ ┣ 📂 pages        # Page components
 ┃ ┃ ┣ 📂 router       # Routing configuration
 ┃ ┃ ┣ 📂 services     # API service functions
 ┃ ┃ ┣ 📜 App.jsx      # Main app component
 ┃ ┃ ┣ 📜 index.css    # Global styles
 ┃ ┃ ┗ 📜 main.jsx     # Application entry point
 ┣ 📜 .gitignore      # Git ignored files
 ┣ 📜 README.md       # Project documentation
 ┣ 📜 package.json    # Project dependencies and scripts
 ┗ 📜 vite.config.js  # Vite configuration
```

## Environment Variables

Create a `.env` file in both the backend and frontend directories.

### Frontend `.env`:

```
VITE_API_URL=https://your-api-url.com
VITE_FIREBASE_API_KEY=your_firebase_api_key
```

### Backend `.env`:

```
MONGO_URI=mongodb://your-mongo-db-uri
FIREBASE_API_KEY=your_firebase_api_key
PORT=5000
```

## License

This project is for educational purposes as part of the UTN Prompt Engineering course.
