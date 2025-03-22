import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";

const Header = () => {
  const { logout } = useContext(AuthContext);
  return (
    <header className="fixed top-0 w-full z-50 bg-gray-900/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text"
          >
            Task Flow
          </Link>
          <nav className="flex gap-6 items-center">
            <a
              href="https://github.com/Kruthik111/TaskFlow.git"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <FaGithub size={30} />
            </a>
            <button
              className="py-1 px-3 flex items-center gap-1 bg-red-600 text-gray-200 hover:text-white transition-colors rounded-md"
              onClick={logout}
            >
              <p>logout</p>
              <IoIosLogOut size={20} />
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
