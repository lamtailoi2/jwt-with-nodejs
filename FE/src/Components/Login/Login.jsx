import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../apis/apiRequest";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const handleChange = (e) => {
    console.log(e.target.value);
    setData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const fetchData = async () => {
    //   const respone = await fetch("http://localhost:3000/api/v1/register", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     mode: "cors",
    //     body: JSON.stringify(data),
    //   });
    //   const metadata = await respone.json().catch((err) => {
    //     console.log(err);
    //   });
    //   return metadata;
    // };
    // fetchData();
    registerUser(data, dispatch, navigate);
  };

  return (
    <div className="">
      <h1 className="text-green-600 text-5xl text-center my-10">Welcome</h1>

      <div>
        <h2 className="text-white text-3xl text-center m-2">Register</h2>
        <div className=" container-sm flex justify-center items-center ">
          <form action="" className="" onSubmit={handleSubmit}>
            <label
              htmlFor=""
              className="block text-xl font-medium text-white-milk "
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              value={data.email}
              onChange={handleChange}
            />
            <label
              htmlFor=""
              className="block text-xl font-medium text-white-milk "
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              value={data.password}
              name="password"
              onChange={handleChange}
            />
            <br />
            <button
              type="submit"
              className="bg-gray-300 rounded-md mt-2 py-2 px-5 hover:bg-gray-500 "
            >
              Login
            </button>
          </form>
        </div>

        {/* <label htmlFor="">ConfirmPassword</label>
          <input type="password" placeholder="Confirm password" name="confirmpassword" /> */}
      </div>
    </div>
  );
};

export default Login;
