import { useContext, useState } from "react";
import { AuthContext } from "./context/AuthProvider";
import Login from "./pages/Login";
import { Route, Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import Test from "./pages/test";
import AdminDashboard from "./pages/AdminDashboard";
import CreateAgent from "./components/CreateAgent";
import ViewAgent from "./components/ViewAgent";
import Dashboard from "./pages/Dashboard";
import CSVProcessor from "./components/CSVProcessor";

function App() {
  const { isAuthenticated, getUserRole, isAdmin } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <>
      <Header />
      <div
        id="container"
        className="pt-20 px-5 bg-black h-screen overflow-x-hidden  "
      >
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route path="/" element={<ViewAgent />} />
            <Route path="/create" element={<CreateAgent />} />
            <Route path="/AssignTask" element={<CSVProcessor />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
