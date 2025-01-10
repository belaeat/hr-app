import { useState } from "react";
import Button from "../../components/Button/Button";
import "./Form.css";
import useAxios from "../../hooks/useAxios";

const Form = () => {
  const { post } = useAxios("http://localhost:3001");
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    department: "",
    location: "",
    startDate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await post("/employees", formData);
      alert("Employee added successfully!");
      setFormData({
        name: "",
        role: "",
        department: "",
        location: "",
        startDate: "",
      });
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="employeeForm">
      <h2>Add New Employee</h2>
      <label>
        Name:{" "}
        <input name="name" value={formData.name} onChange={handleInputChange} />
      </label>
      <label>
        Role:{" "}
        <input name="role" value={formData.role} onChange={handleInputChange} />
      </label>
      <label>
        Department:{" "}
        <input
          name="department"
          value={formData.department}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Start Date:{" "}
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Location:{" "}
        <input
          name="location"
          value={formData.location}
          onChange={handleInputChange}
        />
      </label>
      <Button text="Add New" type="submit" />
    </form>
  );
};

export default Form;
