import { useState, useEffect } from "react";

const ClientForm = ({ onSubmit, initialData = {}, isEditing = false }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  // If editing, pre-fill the form with initial data
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Full Name"
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone"
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="company"
        value={formData.company}
        onChange={handleChange}
        placeholder="Company"
        className="w-full p-2 border rounded"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded"
      >
        {isEditing ? "Update Client" : "Add Client"}
      </button>
    </form>
  );
};

export default ClientForm;
