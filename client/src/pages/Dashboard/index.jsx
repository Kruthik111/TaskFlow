import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import AdminDashboard from "../AdminDashboard";
import AgentDashboard from "../AgentDashboard";

const Dashboard = () => {
  const { isAdmin } = useContext(AuthContext);
  return <>{isAdmin ? <AdminDashboard /> : <AgentDashboard />}</>;
};

export default Dashboard;
