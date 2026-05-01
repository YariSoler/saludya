import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Auth
import Login from "./pages/Login";
import Recover from "./pages/Recover";

// Registro
import RegisterPaciente from "./pages/RegisterPaciente";

// Dashboards
import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardMedico from "./pages/DashboardMedico";
import DashboardPaciente from "./pages/DashboardPaciente";

// Funcionalidades
import CrearMedico from "./pages/CrearMedico";
import AgendarCita from "./pages/AgendarCita";
import PerfilPaciente from "./pages/PerfilPaciente";

function App() {
  return (
    <Router>
      <Routes>

        {/* LOGIN */}
        <Route path="/" element={<Login />} />

        {/* RECUPERAR */}
        <Route path="/recover" element={<Recover />} />

        {/* REGISTRO */}
        <Route path="/register-paciente" element={<RegisterPaciente />} />

        {/* ADMIN */}
        <Route path="/dashboard-admin" element={<DashboardAdmin />} />
        <Route path="/crear-medico" element={<CrearMedico />} />

        {/* MEDICO */}
        <Route path="/dashboard-medico" element={<DashboardMedico />} />

        {/* PACIENTE */}
        <Route path="/dashboard-paciente" element={<DashboardPaciente />} />
        <Route path="/agendar-cita" element={<AgendarCita />} />
        <Route path="/perfil" element={<PerfilPaciente />} />

      </Routes>
    </Router>
  );
}

export default App;
