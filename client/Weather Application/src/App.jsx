import "./App.css";
import WeatherPage from "./components/WeatherDashboard";
import Login from "./components/Login.jsx"
import {BrowserRouter, Routes,Route} from 'react-router-dom'

function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

         {/* Need to validate before navigating directly to the dashboard */}
        <Route path="/dashboard" element={<WeatherPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
