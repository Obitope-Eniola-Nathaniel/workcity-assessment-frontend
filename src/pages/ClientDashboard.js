import { useEffect, useState, useContext } from "react";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const ClientDashboard = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  // Fetch clients from the API
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await axios.get("/clients", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setClients(res.data);
      } catch (err) {
        setError("Failed to load clients");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, [token]);

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this client?")) return;
    try {
      await axios.delete(`/clients/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setClients(clients.filter((client) => client._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete client");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Client Dashboard</h1>
        <Link
          to="/clients/add"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Client
        </Link>
      </div>

      {loading && <p>Loading clients...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && clients.length === 0 && <p>No clients found.</p>}

      {!loading && clients.length > 0 && (
        <table className="w-full border table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client._id} className="border-b">
                <td className="p-2">{client.name}</td>
                <td className="p-2">{client.email}</td>
                <td className="p-2 text-center">
                  <Link
                    to={`/clients/edit/${client._id}`}
                    className="text-blue-600 hover:underline mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(client._id)}
                    className="text-red-600 hover:underline"
                  >
                    ❌ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ClientDashboard;
