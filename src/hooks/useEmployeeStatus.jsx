import { useState } from "react";

const useEmployeeStatus = (initialRole) => {
  const [role, setRole] = useState(initialRole);

  const toggleTeamLead = () => {
    setRole((prevRole) =>
      prevRole === "Team Lead" ? "Employee" : "Team Lead"
    );
  };

  return { role, toggleTeamLead };
};

export default useEmployeeStatus;
