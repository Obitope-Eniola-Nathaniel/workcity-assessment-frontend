import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const ClientDashboard = () => {
  const [clients, setClients] = useState([]);
  const { token } = useContext(AuthContext); // get token to use in request
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await axios.get("http://localhost:5000/clients", {
          headers: {
            Authorization: `Bearer ${token}`, // send token in header
          },
        });
        setClients(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching clients:", err);
        setLoading(false);
      }
    };

    fetchClients();
  }, [token]);

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold mb-6">Client Dashboard</h2>

      {loading ? (
        <p>Loading clients...</p>
      ) : clients.length === 0 ? (
        <p>No clients found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {clients.map((client) => (
            <div
              key={client._id}
              className="bg-white shadow rounded-lg p-4 border"
            >
              <h3 className="text-xl font-semibold">{client.name}</h3>
              <p className="text-gray-600">Email: {client.email}</p>
              <p className="text-gray-600">Phone: {client.phone}</p>
              <p className="text-gray-600">Company: {client.company}</p>

              {/* You can later add Edit/Delete buttons here */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientDashboard;
