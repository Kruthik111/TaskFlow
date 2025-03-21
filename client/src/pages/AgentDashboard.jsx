import { useEffect } from "react";

const AgentDashboard = () => {
  async function fetchAgentTask() {
    // Not completed
    alert(
      "This part is not completed. Logout and Login as admin to view some content"
    );
  }

  useEffect(() => {
    fetchAgentTask();
  }, []);

  return <div className="text-white">AgentDashboard</div>;
};

export default AgentDashboard;
