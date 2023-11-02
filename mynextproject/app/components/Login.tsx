"use client";
import React, { useState } from "react";
import Link from "next/link";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    if (response.ok) {
      const data = await response.json();
      const userId = data.id;
      console.log(data);
      localStorage.setItem("userId", userId);
      setIsLoading(true);
       setTimeout(() => {
        window.location.href = "../maincontent";
      }, 2000);
    } else {
      console.log("Login failed");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-10 gap-2">
      <h1 className="text-white text-3xl px-2 text-center mb-10">
        Welcome To Word Document Editor
      </h1>
      <form
        className="flex flex-col justify-center items-center gap-2"
        onSubmit={handleLogin}
      >
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
        <div className="flex flex-row gap-3 m-5">
          <button type="submit" className="btn">
            Login
          </button>
          <Link href={"../registration"}>
            <button className="btn">Register</button>
          </Link>
        </div>
      </form>
      <p className="text-info">
        Click on register if you don't have an account
      </p>
      {isLoading && (
        <span className="loading loading-spinner loading-lg"></span>
      )}
    </div>
  );
}

export default Login;
