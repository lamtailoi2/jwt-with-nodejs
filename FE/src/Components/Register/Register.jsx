import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../apis/apiRequest";
const Register = () => {
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
   <div className="min-h-screen flex items-center justify-center bg-gray-100">
  <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
    <h1 className="text-green-600 text-3xl font-bold text-center mb-6">Register</h1>
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-800 font-medium mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter Email"
          name="email"
          value={data.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="username" className="block text-gray-800 font-medium mb-2">
          Username
        </label>
        <input
          type="text"
          id="username"
          placeholder="Enter Username"
          name="username"
          value={data.username}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block text-gray-800 font-medium mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="Enter Password"
          name="password"
          value={data.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-md transition duration-300"
      >
        Register
      </button>
    </form>
  </div>
</div>

  );
};

export default Register;
