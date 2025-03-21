import React, { useContext, useState } from "react";
import { BiShowAlt } from "react-icons/bi";
import { GrFormViewHide } from "react-icons/gr";
import { Tooltip } from "react-tooltip";
import loginIllustration from "../assets/login-illustration.jpg";
import adminIllustration from "../assets/admin-illustration.svg";
import { AuthContext } from "../context/AuthProvider";
import { API_URL } from "../constants";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);

  const { login } = useContext(AuthContext);

  async function handleSubmit(event) {
    event.preventDefault();
    const newErrors = validateForm();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      // Form submission logic here
      console.log("Form submitted successfully!");

      const url = `${isAdmin ? "admin/login" : "agent/login"}`;

      await fetch(`${API_URL}/${url}`, {
        method: "POST",
        body: JSON.stringify({
          email: user.email,
          password: user.password,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then(async (res) => {
          const data = await res.json();
          if (!res.ok) {
            throw new Error(data.error || "Something went wrong");
          }
          return data;
        })
        .then((data) => {
          login(data.token);
        })
        .catch((err) => alert(err));
    }
  }

  function validateForm() {
    const errors = {};
    if (!user.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      errors.email = "Email is invalid";
    }
    if (!user.password) {
      errors.password = "Password is required";
    } else if (user.password.length < 3) {
      errors.password = "Password must be at least 3 characters long";
    }
    return errors;
  }

  function handleChange(event) {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  return (
    <div className="flex justify-center items-center flex-col h-screen  bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:bg-gradient-to-tr">
      <div
        className={`flex gap-1 rounded-lg bg-white  overflow-hidden min-h-72 max-w-[900px]  w-[80vw] p-5 shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] ${
          isAdmin && "md:flex-row-reverse"
        } `}
      >
        <div
          id="left-container"
          className="flex justify-center items-center  flex-1 py-10 bg-white shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] rounded-lg"
        >
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 flex-1 p-6  "
          >
            <h1 className="text-3xl font-semibold inset-2  ">Login</h1>

            <label htmlFor="email" className="text-gray-700 font-semibold">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={user.email}
              onChange={(event) => handleChange(event)}
              className={`placeholder:text-gray-400 p-2 outline-4  border-gray-400 border-2 rounded-md ${
                errors.email && "border-red-600 outline-red-600"
              }`}
              placeholder="Enter your name"
            />
            {errors.email && (
              <span className="text-red-600">{errors.email}</span>
            )}

            <label htmlFor="password">Password</label>
            <div
              className={`flex items-center border-gray-400 border-2 rounded-md overflow-hidden justify-between pr-4 ${
                errors.password && "border-red-600 outline-red-600"
              }`}
            >
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                className="placeholder:text-gray-400 p-2 outline-none flex-1 "
                placeholder="Enter your name"
              />
              <span
                data-tooltip-id="showpassword"
                onClick={(event) => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <BiShowAlt size={25} />
                ) : (
                  <GrFormViewHide size={25} />
                )}
              </span>
              <Tooltip
                id="showpassword"
                content={showPassword ? "Hide password" : "Show passowrd"}
                place="top"
              />
            </div>
            {errors.password && (
              <span className="text-red-600">{errors.password}</span>
            )}
            <div>
              <input
                type="checkbox"
                name="login"
                id="login"
                checked={isAdmin}
                onChange={() => setIsAdmin((curr) => !curr)}
              />
              <label
                htmlFor="login"
                className="text-gray-700 font-semibold ml-3 "
              >
                Login as Admin
              </label>
            </div>
            <button
              type="submit"
              className="  p-2 bg-primary text-white rounded-md flex-1 hover:shadow-md shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] mt-5 py-3  "
            >
              Login
            </button>
          </form>
        </div>
        <div
          id="right-container"
          className=" hidden md:flex flex-col  justify-center items-center flex-1  py-10  "
        >
          <h1 className="font-bold text-3xl p-2 text-slate-800">
            {isAdmin ? "Logging in as Admin" : "Logging in as Agent"}
          </h1>
          {isAdmin ? (
            <img src={adminIllustration} draggable={false} alt="" />
          ) : (
            <img src={loginIllustration} draggable={false} alt="" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
