import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./EmployeeCard.module.css";
import Button from "../Button/Button";
import useAxios from "../../hooks/useAxios";
import useEmployeeStatus from "../../hooks/useEmployeeStatus";

const EmployeeCard = ({
  id,
  name,
  role: initialRole,
  department: initialDepartment,
  startDate,
  location: initialLocation,
}) => {
  const [department, setDepartment] = useState(initialDepartment);
  const [location, setLocation] = useState(initialLocation);
  const [avatar, setAvatar] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedRole, setEditedRole] = useState(initialRole);
  const [editedDepartment, setEditedDepartment] = useState(department);
  const [editedLocation, setEditedLocation] = useState(location);

  const { patch } = useAxios("http://localhost:3001");
  const { role, toggleTeamLead } = useEmployeeStatus(initialRole, id, patch);
  const navigate = useNavigate();

  // Fetch avatar
  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const avatarURL = `https://avatar.iran.liara.run/public/${id}`;
        setAvatar(avatarURL);
      } catch (error) {
        console.error("Error fetching avatar:", error);
      }
    };
    fetchAvatar();
  }, [id]);

  // Edit data
  const toggleEditMode = async () => {
    if (isEditing) {
      try {
        await patch(`/employees/${id}`, {
          role: editedRole,
          department: editedDepartment,
          location: editedLocation,
        });
        setEditedRole(editedRole);
        setDepartment(editedDepartment);
        setLocation(editedLocation);
      } catch (error) {
        console.error("Error updating employee:", error);
      }
    }
    setIsEditing((prev) => !prev);
  };

  // Calculate years worked
  const yearsWorked = () => {
    const start = new Date(startDate);
    const today = new Date();
    const diff = today - start;
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365)); // Convert to years
  };

  const roundedYearsWorked = yearsWorked();

  // Probation or anniversary reminders
  const isProbation = yearsWorked() < 0.5;
  const isAnniversary = roundedYearsWorked > 0 && roundedYearsWorked % 5 === 0;

  return (
    <div
      className={`${styles["employee-card"]} ${
        styles[department.toLowerCase()]
      }`}
    >
      <img
        src={avatar || "https://via.placeholder.com/150"}
        alt={`${name}'s avatar`}
        className={styles.avatar}
      />
      <div className={styles["text-content"]}>
        <h3>{name}</h3>
        {isEditing ? (
          <div className={styles.edit}>
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
          </div>
        ) : (
          <>
            <p>Role: {role}</p>
            <p>Department: {department}</p>
            <p>Location: {location}</p>
          </>
        )}
        <p className="start-date">Start Date: {startDate}</p>
        <p className="years-worked">Years Worked: {roundedYearsWorked}</p>
        {isProbation && (
          <p className="reminder">📋 Schedule probation review</p>
        )}
        {isAnniversary && (
          <p className="reminder">🎉 Schedule recognition meeting</p>
        )}
      </div>

      {/* Buttons */}
      <div className={styles.buttons}>
        <Button onClick={toggleTeamLead} role="primary">
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
