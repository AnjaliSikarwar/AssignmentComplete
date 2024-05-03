import React, { useState } from "react";
import { BiUser } from "react-icons/bi";
import { AiOutlineUnlock } from "react-icons/ai";
import { Link } from "react-router-dom";
import Validation from "./LoginValidation";
import { useNavigate } from "react-router-dom";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setFormErrors(Validation(values));

    const data = await fetch("/Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: values.email, password: values.password }),
    });

    const res = await data.json();
    console.log(res);

    if (res.status === 201) {
      alert("Login successful");
      navigate("/dash");
      localStorage.setItem("usersDataToken", res.result.token);
      setValues({ ...values, email: "", password: "" });
    } else {
      alert(data.error || "Login failed");
    }
  };
  return (
    <>
      <div>
        <div className="bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative transition-all duration-200">
          <div>
            <h1 className="text-4xl text-white font-bold text-center mb-6">
              Login
            </h1>
            <form action="" onSubmit={handleSubmit}>
              <div className="relative my-4">
                <input
                  type="email"
                  className="block w-72 py-3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                  placeholder=""
                  name="email"
                  onChange={handleInput}
                />
                <label
                  htmlFor=""
                  className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer=focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Your Email
                </label>
                {formErrors.email && (
                  <span className="text-red-600">{formErrors.email}</span>
                )}
                <BiUser className="absolute top-4 right-4" />
              </div>

              <div className="relative my-4">
                <input
                  type="password"
                  className="block w-72 py-3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                  placeholder=""
                  name="password"
                  onChange={handleInput}
                />
                <label
                  htmlFor=""
                  className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer=focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Your Password
                </label>
                {formErrors.password && (
                  <span className="text-red-600">{formErrors.password}</span>
                )}
                <AiOutlineUnlock className="absolute top-4 right-4" />
              </div>

              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <input type="checkbox" name="" id="" />
                  <label htmlFor="Remember Me">Remember Me</label>
                </div>
                <span className="text-blue-500">Forgot Password</span>
              </div>

              <button
                className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white py-2 transition-colors duration-300"
                type="submit"
              >
                Login
              </button>
              <div>
                <span className="m-4">
                  New Here?{" "}
                  <Link className="text-blue-500" to="/Register">
                    Create an Account
                  </Link>{" "}
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
