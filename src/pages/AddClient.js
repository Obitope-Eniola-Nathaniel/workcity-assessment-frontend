import { useContext, useState } from "react";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ClientForm from "../components/ClientForm";

const AddClient = () => {
  const { token } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreate = async (formData) => {
    try {
      await axios.post("/clients/create", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/clients");
    } catch (err) {
      console.error(err);
      setError("Failed to add client");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add Client</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <ClientForm onSubmit={handleCreate} />
    </div>
  );
};

export default AddClient;
