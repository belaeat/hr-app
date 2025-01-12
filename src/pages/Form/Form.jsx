import { useState } from "react";
import Button from "../../components/Button/Button";
import styles from "./Form.module.css";
import useAxios from "../../hooks/useAxios";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const { post } = useAxios("http://localhost:3001");
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    department: "",
    location: "",
    startDate: "",
  });
  const navigate = useNavigate();

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
      navigate("/");
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Add New Employee</h2>
      <label>
        Name:{" "}
        <input
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className={styles.employeeForm_input}
          required
        />
      </label>
      <label>
        Role:{" "}
        <input
          name="role"
          value={formData.role}
          onChange={handleInputChange}
          className={styles.employeeForm_input}
          required
        />
      </label>
      <label>
        Department:{" "}
        <input
          name="department"
          value={formData.department}
          onChange={handleInputChange}
          className={styles.employeeForm_input}
          required
        />
      </label>
      <label>
        Start Date:{" "}
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleInputChange}
          className={styles.employeeForm_input}
          required
        />
      </label>
      <label>
        Location:{" "}
        <input
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          className={styles.employeeForm_input}
          required
        />
      </label>
      <Button text="Add New" type="submit" />
    </form>
  );
};

export default Form;
