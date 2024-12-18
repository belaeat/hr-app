import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EmployeeDetail.css";

const EmployeeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/employees/${id}`)
      .then((res) => res.json())
      .then((data) => setEmployee(data))
      .catch((error) => console.error("Error fetching employee:", error));
  }, [id]);

  return (
    <div>
      <h2>Employee Details</h2>
      {employee ? (
        <div className="employee-details">
          <p>Name: {employee.name}</p>
          <p>Role: {employee.role}</p>
          <p>Department: {employee.department}</p>
          <p>Location: {employee.location}</p>
          <p>Start Date: {employee.startDate}</p>
          <button onClick={() => navigate("/")}>Back to List</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EmployeeDetail;
