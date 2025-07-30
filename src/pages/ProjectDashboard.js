// src/pages/ProjectDashboard.jsx
import React, { useEffect, useState, useContext } from "react";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const ProjectDashboard = () => {
  const { token } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("/projects", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProjects(res.data);
      } catch (err) {
        console.error("Failed to fetch projects", err);
      }
    };
    fetchProjects();
  }, [token]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Project Dashboard</h1>
      <Link
        to="/add-project"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Project
      </Link>
      <div className="mt-6 space-y-4">
        {projects.map((project) => (
          <div
            key={project._id}
            className="p-4 border rounded shadow-md bg-white flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-semibold">{project.title}</h2>
              <span className="text-blue-600">Status: {project.status}</span>
              <p>{project.description}</p>
              <p className="text-sm text-gray-600">
                Client Name: {project.client.name}
              </p>
            </div>
            <Link
              to={`/edit-project/${project._id}`}
              className="text-blue-600 hover:underline"
            >
              Edit
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectDashboard;
