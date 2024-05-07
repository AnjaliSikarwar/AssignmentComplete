import React, { useState } from "react";
import { AiOutlineUnlock } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { Link } from "react-router-dom";
import Validation from "./SignupValidation";
import { useNavigate } from "react-router-dom";

function Register() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormErrors(await Validation(values));

    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await fetch("/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const data = await response.json();
        if (response.status === 201) {
          navigate("/Login");
          alert("User registration successful");
          setValues({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
        } else if (response.status === 422) {
          alert(data.error);
        } else {
          alert("User registration failed");
        }
      } catch (error) {
        console.error("Registration error:", error);
      }
    } else {
      console.error("Form validation errors:", formErrors);
    }
  };

  return (
    <>
      <div>
        <div className="bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative transition-all duration-200">
          <div>
            <h1 className="text-4xl text-white font-bold text-center mb-6">
              Register
            </h1>
            <form action="" onSubmit={handleSubmit}>
              <div className="relative my-4">
                <input
                  type="name"
                  name="name"
                  value={values.name}
                  onChange={handleInput}
                  className="block w-72 py-3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                  placeholder=""
                />
                <label
                  htmlFor=""
                  className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer=focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Username
                </label>
                <BiUser className="absolute top-4 right-4" />
                {formErrors.name && (
                  <span className="text-red-600">{formErrors.name}</span>
                )}
              </div>

              <div className="relative my-4">
                <input
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleInput}
                  className="block w-72 py-3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                  placeholder=""
                />
                <label
                  htmlFor=""
                  className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer=focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Your Email
                </label>
                <BiUser className="absolute top-4 right-4" />
                {formErrors.email && (
                  <span className="text-red-600">{formErrors.email}</span>
                )}
              </div>

              <div className="relative my-4">
                <input
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleInput}
                  className="block w-72 py-3 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                  placeholder=""
                />
                <label
                  htmlFor=""
                  className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer=focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Your Password
                </label>
                <AiOutlineUnlock className="absolute top-4 right-4" />
                {formErrors.password && (
                  <span className="text-red-600">{formErrors.password}</span>
                )}
              </div>

              <div className="relative my-4">
                <input
                  type="confirmPassword"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleInput}
                  className="block w-72 py-3 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                  placeholder=""
                />
                <label
                  htmlFor=""
                  className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer=focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Confirm Password
                </label>
                <AiOutlineUnlock className="absolute top-4 right-4" />
                {formErrors.confirmPassword && (
                  <span className="text-red-600">
                    {formErrors.confirmPassword}
                  </span>
                )}
              </div>

              <button
                className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white py-2 transition-colors duration-300"
                type="submit"
              >
                Register
              </button>

              <div>
                <span className="m-4">
                  Already Create an Account{" "}
                  <Link className="text-blue-500" to="/">
                    Loign
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;