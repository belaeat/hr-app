// import "./EmployeeList.css";
import styles from "./EmployeeList.module.css";
import EmployeeCard from "../EmployeeCard/EmployeeCard";
import { useEffect, useState } from "react";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/employees")
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);

  return (
    <div className={styles.employee_list}>
      {employees.map((employee) => (
        <EmployeeCard key={employee.id} {...employee} />
      ))}
    </div>
  );
};

export default EmployeeList;
