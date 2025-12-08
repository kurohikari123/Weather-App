import "./App.css";
import WeatherPage from "./components/WeatherDashboard";
import Login from "./components/Login.jsx"
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS

function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

         {/* Need to validate before navigating directly to the dashboard */}
        <Route path="/dashboard" element={<WeatherPage />} />
      </Routes>
      {/* Your application content */}
       <ToastContainer />
    </BrowserRouter>

  );
}

export default App;
