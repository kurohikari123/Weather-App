#  WeatherApp 🌦️

![WeatherApp Demo GIF][demo-gif]

**WeatherApp** is a beautifully designed, modern weather dashboard that provides real-time weather data with a dynamic, time-of-day interface. Built with a React frontend and a secure Express.js backend, this application showcases a full-stack implementation of a real-world service.

---

### ✨ Features

-   **Dynamic Backgrounds:** The UI features 4 different background themes that change automatically based on the time of day (Morning, Midday, Afternoon, Night).(To be implemented)
-   **Real-time Weather Data:** Provides current temperature, conditions, and more by leveraging the OpenWeatherMap API.
-   **Manual Search:** Users can search for the weather in any city worldwide.
-   **Pre-defined Location Dropdown:** A dropdown menu is populated from a database, allowing users to select from a curated list of locations.
-   **Secure Backend:** The Express.js server handles all API calls, keeping the API key secure and off the client-side.
-   **Responsive Design:** A clean, modern UI that looks great on both desktop and mobile devices.(To be implemented)

---

### 🛠️ Tech Stack & Architecture

This project is built with a modern, full-stack architecture, separating the client and server for scalability.

#### Frontend

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Material-UI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

-   **React.js:** For building the dynamic and interactive user interface.
-   **Material-UI (MUI):** For a rich set of pre-built, production-ready UI components.
-   **Axios:** As a modern, promise-based HTTP client for making API calls to the backend.
-   **Custom SVGs & CSS:** For custom styling and the beautiful time-of-day backgrounds.(Assets available but you can change it)

#### Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

-   **Node.js:** As the JavaScript runtime environment.
-   **Express.js:** To create a robust and scalable REST API.
-   **MySQL2:** A high-performance driver to connect to and query the MySQL database.
-   **Dotenv:** To manage environment variables and keep API keys and database credentials secure.
-   **CORS:** To enable Cross-Origin Resource Sharing between the frontend and backend.

---

### 🚀 Getting Started

#### Prerequisites

-   Node.js (v14 or later)
-   npm
-   A running MySQL database instance
-   An API Key from [OpenWeatherMap](https://openweathermap.org/)

#### Setup

1.  **Clone the repo**
    ```sh
    git clone [Repository Link]
    cd client/Weather Application
    cd server
    ```

2.  **Setup the Backend (Express Server)**
    -   Navigate to the `backend` directory.
    -   Install NPM packages.
        ```sh
        cd server
        npm install
        ```
    -   Create a `.env` file in the `backend` root and add your credentials:
        ```env
        # Server Port
        PORT=3001

        # OpenWeatherMap API Key
        OPENWEATHER_API_KEY=your_openweathermap_api_key

        # MySQL Database Connection
        DB_HOST=localhost
        DB_USER=your_mysql_username
        DB_PASSWORD=your_mysql_password
        DB_DATABASE=your_database_name
        ```
    -   Start the backend server.
        ```sh
        npm run server
        ```
        Your server should now be running on `http://localhost:3001`.

3.  **Setup the Frontend (React App)**
    -   Navigate to the `frontend` directory.
    -   Install NPM packages.
        ```sh
        cd client/Weather Application
        npm install
        ```
    -   Start the frontend development server.
        ```sh
        npm run client
        ```
        Your React app should now be running and accessible at `http://localhost:{SOME PORT}`.

---

### 🌐 API Endpoints

The backend server exposes the following RESTful API endpoints:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/weather/locations` | Retrieves a list of all predefined locations from the database to populate the dropdown menu. |
| `GET` | `/api/weather/location/:id` | Fetches the current weather for a specific location using its database ID. |
| `GET` | `/api/weather/coords` | Fetches the current weather using `lat` and `lon` query parameters. Used for the automatic geolocation feature. |


<!-- Badges and Links -->
[demo-gif]: [Your GIF Link Here]
