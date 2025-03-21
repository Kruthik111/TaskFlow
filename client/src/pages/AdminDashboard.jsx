import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [file, setFile] = useState();
  const navigate = useNavigate();
  const validateFile = (file) => {
    if (!file) return "Please upload a file.";

    const allowedFormats = ["csv", "xlsx", "xls"];
    const fileExtension = file.name.split(".").pop().toLowerCase();

    if (!allowedFormats.includes(fileExtension)) {
      return "Invalid file format. Only CSV, XLSX, and XLS are allowed.";
    }

    return ""; // No error
  };

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    const errorMessage = validateFile(uploadedFile);

    if (errorMessage) {
      alert(errorMessage);
      setFile(null);
      return;
    } else {
      setFile(uploadedFile);
    }
    console.log("File is valid:", file.name);
  };

  return (
    <div>
      <div className="mb-5">
        <button
          className="text-white p-1 px-2 mt-5 bg-secondary rounded-md"
          onClick={() => navigate("AssignTask")}
        >
          Assign new tasks
        </button>
        <button
          className="text-white p-1 px-2 mt-5 bg-secondary rounded-md"
          onClick={() => navigate("create")}
        >
          Create New Agent
        </button>
      </div>
      <div className="w-full h-[1px] bg-white"></div>
      <Outlet />
    </div>
  );
};

export default AdminDashboard;
