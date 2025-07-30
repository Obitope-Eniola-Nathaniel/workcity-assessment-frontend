import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/axios";

const AddEditProject = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // ID will exist in edit mode
  const [clients, setClients] = useState([]);
  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    status: "Not started",
    client: "",
    startDate: "",
    endDate: "",
  });

  // Fetch all clients for dropdown
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await axios.get("/clients", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setClients(res.data);
      } catch (err) {
        console.error("Error fetching clients:", err);
      }
    };
    fetchClients();
  }, []);

  // If editing, fetch existing project details
  useEffect(() => {
    if (id) {
      const fetchProject = async () => {
        try {
          const res = await axios.get(`/projects/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          setProjectData({
            ...res.data,
            startDate: res.data.startDate?.slice(0, 10),
            endDate: res.data.endDate?.slice(0, 10),
          });
        } catch (err) {
          console.error("Failed to fetch project:", err);
        }
      };
      fetchProject();
    }
  }, [id]);

  const handleChange = (e) => {
    setProjectData({ ...projectData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (id) {
        // Update project
        await axios.put(`/projects/${id}`, projectData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        // Create new project
        await axios.post("/projects/create", projectData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      navigate("/projects");
    } catch (err) {
      console.error("Project submission error:", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">{id ? "Edit" : "Add"} Project</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={projectData.title}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          placeholder="Project Description"
          value={projectData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <select
          name="status"
          value={projectData.status}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option>Not started</option>
          <option>In progress</option>
          <option>Completed</option>
        </select>
        <select
          name="client"
          value={projectData.client}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Select Client</option>
          {clients.map((client) => (
            <option key={client._id} value={client._id}>
              {client.name}
            </option>
          ))}
        </select>
        <div className="flex gap-2">
          <input
            type="date"
            name="startDate"
            value={projectData.startDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="date"
            name="endDate"
            value={projectData.endDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          {id ? "Update" : "Create"} Project
        </button>
      </form>
    </div>
  );
};

export default AddEditProject;
