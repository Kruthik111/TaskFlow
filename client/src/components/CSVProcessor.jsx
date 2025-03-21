import { useState } from "react";
import Papa from "papaparse";

const CSVProcessor = () => {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setMessage("Please upload a file.");
      return;
    }

    const allowedFormats = ["csv"];
    const fileExtension = file.name.split(".").pop().toLowerCase();

    if (!allowedFormats.includes(fileExtension)) {
      setMessage("Invalid file format. Only CSV is allowed.");
      return;
    }

    Papa.parse(file, {
      header: true, // Converts rows into JSON objects using the header row
      skipEmptyLines: true,
      complete: (result) => {
        setData(result.data);
        setMessage("CSV processed successfully!");
      },
      error: (error) => {
        setMessage(`Error parsing CSV: ${error.message}`);
      },
    });
  };

  return (
    <div>
      <label
        className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
        htmlFor="file_input"
      >
        Assign new task
      </label>
      <input
        className="block w-full max-w-60 text-sm border  rounded-md cursor-pointer  text-gray-400 focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400"
        id="file_input"
        type="file"
        accept=".csv,.xlsx,.xls"
        onChange={handleFileChange}
      />
      {message && <p>{message}</p>}
      <pre className="text-white">{JSON.stringify(data, null, 2)}</pre>{" "}
      {/* Display parsed CSV */}
    </div>
  );
};

export default CSVProcessor;
