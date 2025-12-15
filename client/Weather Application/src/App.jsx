import "./App.css";
import WeatherPage from "./components/WeatherDashboard";
import Login from "./components/Login.jsx"
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS
import ProtectedRoutes from './helper/ProtectedRoutes.jsx'
import Register from './components/Register.jsx'

function App() {
  return (
   <BrowserRouter>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

         {/* Need to validate before navigating directly to the dashboard. maybe add a protected route */}
        <Route path="/dashboard" element={
          <ProtectedRoutes>
            <WeatherPage />
          </ProtectedRoutes>
        } />

      </Routes>

      {/* Your application content */}
       <ToastContainer />
    </BrowserRouter>

  );
}

export default App;
