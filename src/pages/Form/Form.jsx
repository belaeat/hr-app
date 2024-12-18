import { useState } from "react";
import Button from "../../components/Button/Button";
import "./Form.css";

const Form = () => {
  const [employeeData, setEmployeeData] = useState({
    name: "",
    role: "",
    department: "",
    startDate: "",
    location: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3001/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employeeData),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Employee added successfully!");
        console.log("Added Employee:", data);
        setEmployeeData({
          name: "",
          role: "",
          department: "",
          startDate: "",
          location: "",
        });
      })
      .catch((error) => console.error("Error adding employee:", error));
  };

  return (
    <form onSubmit={handleSubmit} className="employeeForm">
      <h2>Add New Employee</h2>
      <label>
        Name:{" "}
        <input
          name="name"
          value={employeeData.name}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Role:{" "}
        <input
          name="role"
          value={employeeData.role}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Department:{" "}
        <input
          name="department"
          value={employeeData.department}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Start Date:{" "}
        <input
          type="date"
          name="startDate"
          value={employeeData.startDate}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Location:{" "}
        <input
          name="location"
          value={employeeData.location}
          onChange={handleInputChange}
        />
      </label>
      <Button text="Add New" type="submit" />
    </form>
  );
};

export default Form;
