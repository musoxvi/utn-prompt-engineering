# React + Vite

# Final Project - UTN Prompt Engineering

This project is the final assignment for the **Prompt Engineering** course at UTN. It focuses on leveraging AI tools for programming and software development. The application is built using **React**, **Vite**, and **Material UI**, and is designed to manage mattress inventory efficiently.

## Technologies Used

* **React**: Frontend library for building user interfaces
* **Vite**: Fast build tool and development server
* **Material UI**: UI components for a modern design
* **React Query**: Data fetching and caching management
* **MUI Table**: Displaying structured data in a tabular format

## Features

* Add, update, and delete mattresses
* Upload and manage mattress images
* Display inventory in a dynamic table
* Toast notifications for user feedback
* API integration for CRUD operations

## Getting Started

### Prerequisites

Ensure you have the following installed:

* [Node.js](https://nodejs.org/) (LTS version recommended)
* [Git](https://git-scm.com/)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/your-repo.git
   ```
2. Navigate to the project directory:
   ```sh
   cd your-repo
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

### Running the Project

To start the development server, run:

```sh
npm run dev
```

This will launch the application at `http://localhost:5173/` by default.

### Building for Production

To create a production build, use:

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
📦 frontend
 ┣ 📂 node_modules   # Dependencies
 ┣ 📂 public         # Static assets
 ┣ 📂 src
 ┃ ┣ 📂 assets       # Images and static files
 ┃ ┣ 📂 components   # Reusable UI components
 ┃ ┣ 📂 context      # React context for global state
 ┃ ┣ 📂 pages        # Page components
 ┃ ┣ 📂 router       # Routing configuration
 ┃ ┣ 📂 services     # API service functions
 ┃ ┣ 📜 App.jsx      # Main app component
 ┃ ┣ 📜 index.css    # Global styles
 ┃ ┗ 📜 main.jsx     # Application entry point
 ┣ 📜 .eslintrc.js   # ESLint configuration
 ┣ 📜 vite.config.js # Vite configuration
 ┗ 📜 package.json   # Project dependencies and scripts
```

## Environment Variables

Create a `.env` file in the project root and add the necessary API keys:

```
VITE_API_URL=https://your-api-url.com
```

## License

This project is for educational purposes as part of the UTN Prompt Engineering course.

---

For any questions or contributions, feel free to reach out!

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
