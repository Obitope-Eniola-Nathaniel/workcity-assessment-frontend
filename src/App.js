import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ClientDashboard from "./pages/ClientDashboard";
import ProjectDashboard from "./pages/ProjectDashboard";
import AddClient from "./pages/AddClient";
import EditClient from "./pages/EditClient";
import AddEditProject from "./pages/AddEditProject";
// import AddProject from "./pages/AddProject";
// import EditProject from "./pages/EditProject";
import ClientProfile from "./pages/ClientProfile";
import "./App.css";
function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/clients" element={<ClientDashboard />} />
        <Route path="/clients/add" element={<AddClient />} />
        <Route path="/clients/edit/:id" element={<EditClient />} />
        <Route path="/clients/:id" element={<ClientProfile />} />
        <Route path="/projects" element={<ProjectDashboard />} />
        <Route path="/add-project/" element={<AddEditProject />} />
        <Route path="/edit-project/:id" element={<AddEditProject />} />
        {/* <Route path="/projects/edit/:id" element={<EditProject />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
