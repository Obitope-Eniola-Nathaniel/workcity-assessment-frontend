import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import { Link } from "react-router-dom";

const ClientProfile = () => {
  const { id } = useParams(); // Grab client ID from URL
  const [client, setClient] = useState(null); // State for client details
  const [projects, setProjects] = useState([]); // State for client projects
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state

  useEffect(() => {
    const fetchClient = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await axios.get(`/clients/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Handle structure: { client, projects } OR just { client }
        setClient(res.data.client || res.data);
        setProjects(res.data.projects || []);
      } catch (err) {
        console.error("Error fetching client:", err);
        setError("Failed to load client data");
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, [id]);

  if (loading)
    return <p className="text-center mt-10">Loading client details...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (!client) return <p className="text-center mt-10">Client not found.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Client Profile</h2>

      {/* Client Info Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 border">
        <h3 className="text-xl font-semibold mb-4">Client Info</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <p>
            <strong>Name:</strong> {client.name}
          </p>
          <p>
            <strong>Email:</strong> {client.email}
          </p>
          <p>
            <strong>Phone:</strong> {client.phone || "N/A"}
          </p>
          <p>
            <strong>Created By:</strong> {client.createdBy || "N/A"}
          </p>
        </div>
      </div>

      {/* Projects List */}
      <div className="bg-white rounded-lg shadow-md p-6 border">
        <Link
          to={"/add-project/"}
          className="text-indigo-600 hover:underline mr-4"
        >
          Add Project
        </Link>
        <h3 className="text-xl font-semibold mb-4">Associated Projects</h3>
        {projects.length > 0 ? (
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project._id} className="border p-4 rounded bg-gray-50">
                <p>
                  <strong>Title:</strong> {project.title}
                </p>
                <p>
                  <strong>Status:</strong> {project.status}
                </p>
                <p>
                  <strong>Start Date:</strong> {project.startDate?.slice(0, 10)}
                </p>
                <p>
                  <strong>End Date:</strong> {project.endDate?.slice(0, 10)}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">This client has no projects yet.</p>
        )}
      </div>
    </div>
  );
};

export default ClientProfile;
