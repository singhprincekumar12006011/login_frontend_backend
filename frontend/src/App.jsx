import LandingLayout from "./layouts/LandingLayout";
import DashboardLayout from "./layouts/DashboardLayout"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Home";
import About from "./pages/About";
import Application from "./applicationpanal/ApplicationForm";
import Job from "./pages/Job";
import ApplicationData from "./applicationpanal/ApplicationData";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container fluid className="p-0">
          <Routes>
            <Route element={<LandingLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/apply" element={<Application />} />
              <Route path="/register" element={<Register />} />
              <Route path="/job" element={<Job />} />
            </Route>

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="applications" element={<ApplicationData />} />
                {/* Add more nested routes under /dashboard as needed */}
              </Route>
            </Route>
          </Routes>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
