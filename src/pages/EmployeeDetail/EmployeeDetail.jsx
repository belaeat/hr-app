import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./EmployeeDetail.module.css";

const EmployeeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await fetch(
          `https://hr-app-server-tnfp.onrender.com/api/employees/${id}`
        );
        if (!response.ok) {
          throw new Error("Employee not found");
        }
        const data = await response.json();
        setEmployee(data);
      } catch (err) {
        console.error("Error fetching employee details:", err.message);
        setError(err.message);
      }
    };
    fetchEmployeeDetails();
  }, [id]);

  if (error) {
    return (
      <div className="employee-detail">
        <p>{error}</p>
        <button onClick={() => navigate("/employees")}>Back to List</button>
      </div>
    );
  }

  if (!employee) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles["employee-detail"]}>
      <img
        src={`https://avatar.iran.liara.run/public/${id}`}
        alt={`${employee.name}'s avatar`}
        className={styles.avatar}
      />
      <h2>{employee.name}</h2>
      <p>Role: {employee.role}</p>
      <p>Department: {employee.department}</p>
      <p>Location: {employee.location}</p>
      <p>Start Date: {employee.startDate}</p>
      <button onClick={() => navigate("/")}>Back to List</button>
    </div>
  );
};

export default EmployeeDetail;
