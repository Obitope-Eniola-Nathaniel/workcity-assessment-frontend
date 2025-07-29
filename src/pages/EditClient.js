import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ClientForm from "../components/ClientForm";
import { AuthContext } from "../context/AuthContext";

const EditClient = () => {
  const { id } = useParams(); // client ID from route
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [client, setClient] = useState(null);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/clients/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClient(res.data);
      } catch (error) {
        console.error("Failed to fetch client", error);
      }
    };
    fetchClient();
  }, [id, token]);

  const handleUpdate = async (formData) => {
    try {
      await axios.put(`http://localhost:5000/api/clients/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/clients");
    } catch (error) {
      console.error("Failed to update client", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold mb-4">Edit Client</h2>
      {client ? (
        <ClientForm onSubmit={handleUpdate} initialData={client} isEditing />
      ) : (
        <p>Loading client data...</p>
      )}
    </div>
  );
};

export default EditClient;
