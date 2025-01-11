import { useState } from "react";

const useEmployeeStatus = (initialRole, id, patch) => {
  const [role, setRole] = useState(initialRole);

  const toggleTeamLead = async () => {
    const newRole = role === "Team Lead" ? initialRole : "Team Lead";
    try {
      await patch(`/employees/${id}`, { role: newRole });
      setRole(newRole);
    } catch (error) {
      console.error("Error promoting/demoting employee:", error);
    }
  };

  return { role, toggleTeamLead };
};

export default useEmployeeStatus;
