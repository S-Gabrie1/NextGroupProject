"use client";
import React, { useState } from "react";


function RegistrationPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      setMessage("User registered successfully.");
      setIsLoading(true);
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } else {
      const data = await response.json();
      setMessage(
        data.message || "An error occurred while registering the user."
      );
    }
  };

  return (
    <div>
      <form
        className="flex flex-col justify-center items-center mt-10 gap-2"
        onSubmit={handleSubmit}
      >
        <h1 className=" text-xl">Register User</h1>
        <input
          type="text"
          placeholder="Username"
          className="input input-bordered w-full max-w-xs"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full max-w-xs"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex flex-col items-center">
          {isLoading ? (
            <span className="loading loading-spinner loading-lg"></span>
          ) : (
            <button type="submit" className="btn">
              Create User
            </button>
          )}

          <p className="text-info">{message}</p>
        </div>
      </form>
    </div>
  );
}

export default RegistrationPage;
