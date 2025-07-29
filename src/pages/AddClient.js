import { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ClientForm from "../components/ClientForm";
import { AuthContext } from "../context/AuthContext";

const AddClient = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAdd = async (formData) => {
    try {
      await axios.post("http://localhost:5000/api/clients", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/clients"); // go back to dashboard
    } catch (error) {
      console.error("Failed to add client", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold mb-4">Add New Client</h2>
      <ClientForm onSubmit={handleAdd} />
    </div>
  );
};

export default AddClient;
