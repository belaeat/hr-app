import { useState } from "react";
import "./EmployeeCard.css";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

const EmployeeCard = ({
  id,
  name,
  role: initialRole,
  department: initialDepartment,
  startDate,
  location: initialLocation,
}) => {
  // State for role, department, and location
  const [role, setRole] = useState(initialRole);
  const [department, setDepartment] = useState(initialDepartment);
  const [location, setLocation] = useState(initialLocation);

  // Editable states
  const [isEditing, setIsEditing] = useState(false);
  const [editedRole, setEditedRole] = useState(role);
  const [editedDepartment, setEditedDepartment] = useState(department);
  const [editedLocation, setEditedLocation] = useState(location);

  const navigate = useNavigate();

  // Toggle edit mode
  const toggleEditMode = () => {
    if (isEditing) {
      fetch(`http://localhost:3001/employees/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: editedRole,
          department: editedDepartment,
          location: editedLocation,
        }),
      })
        .then(() => {
          setRole(editedRole);
          setDepartment(editedDepartment);
          setLocation(editedLocation);
        })
        .catch((error) => console.error("Error updating employee:", error));
    }
    setIsEditing((prev) => !prev);
  };

  // Department class
  const departmentClass = `employee-card ${
    department ? department.toLowerCase().replace(/\s+/g, "-") : "general"
  }`;

  // Promote, Demote and Team Lead
  const promoteToTeamLead = () => {
    setRole((prevRole) =>
      prevRole === "Team Lead" ? initialRole : "Team Lead"
    );
  };

  // Calculate years worked
  const yearsWorked = () => {
    const start = new Date(startDate);
    const today = new Date();
    const diff = today - start;
    return diff / (1000 * 60 * 60 * 24 * 365);
  };

  const roundedYearsWorked = Math.floor(yearsWorked());

  // Probation or anniversary reminders
  const isProbation = yearsWorked() < 0.5;
  const isAnniversary = roundedYearsWorked > 0 && roundedYearsWorked % 5 === 0;

  return (
    <div className={departmentClass}>
      <h3>
        {name} {role === "Team Lead" && <span>⭐</span>}
      </h3>
      {isEditing ? (
        <>
          <label>
            Role:{" "}
            <input
              type="text"
              value={editedRole}
              onChange={(e) => setEditedRole(e.target.value)}
            />
          </label>
          <label>
            Department:{" "}
            <input
              type="text"
              value={editedDepartment}
              onChange={(e) => setEditedDepartment(e.target.value)}
            />
          </label>
          <label>
            Location:{" "}
            <input
              type="text"
              value={editedLocation}
              onChange={(e) => setEditedLocation(e.target.value)}
            />
          </label>
        </>
      ) : (
        <>
          <p>Role: {role}</p>
          <p>Department: {department}</p>
          <p>Location: {location}</p>
        </>
      )}
      <p>Start Date: {startDate}</p>
      <p>Years Worked: {roundedYearsWorked}</p>
      {isProbation && <p className="reminder">📋 Schedule probation review</p>}
      {isAnniversary && (
        <p className="reminder">🎉 Schedule recognition meeting</p>
      )}
      <div className="buttons">
        <Button onClick={promoteToTeamLead} role="primary">
          {role === "Team Lead"
            ? "Demote from Team Lead"
            : "Promote to Team Lead"}
        </Button>
        <Button onClick={toggleEditMode} role="secondary">
          {isEditing ? "Save" : "Edit"}
        </Button>
        <Button onClick={() => navigate(`/employees/${id}`)} role="primary">
          See More
        </Button>
      </div>
    </div>
  );
};

export default EmployeeCard;
