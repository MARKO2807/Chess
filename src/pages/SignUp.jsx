import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const navigate = useNavigate();

  const toggleForm = (e) => {
    e.preventDefault();
    setIsSignUp((prev) => !prev);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const signUpData = {
      uid: e.target.uid.value,
      nickname: e.target.nickname.value,
      age: e.target.age.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    console.log(signUpData);
    navigate("/lobby");
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const signInData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    console.log(signInData);
    navigate("/lobby");
  };

  return (
    <>
      <div>
        {isSignUp ? (
          <>
            <h2>Sign Up</h2>
            <form onSubmit={handleSignUp}>
              <label htmlFor="uid">User ID</label>
              <input
                type="text"
                id="uid"
                name="uid"
                placeholder="Enter a unique ID"
                required
              />

              <label htmlFor="nickname">Nickname</label>
              <input
                type="text"
                id="nickname"
                name="nickname"
                placeholder="Your nickname"
                required
              />

              <label htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                name="age"
                placeholder="Your age"
                min="1"
                max="99"
                required
              />

              <label htmlFor="email-signup">E-mail</label>
              <input
                type="email"
                id="email-signup"
                name="email"
                placeholder="example@mail.com"
                required
              />

              <label htmlFor="password-signup">Password</label>
              <input
                type="password"
                id="password-signup"
                name="password"
                placeholder="Create a password"
                required
              />

              <button type="submit">Sign Up</button>
            </form>
            <div>
              Already have an account?{" "}
              <a href="#" onClick={toggleForm}>
                Sign In
              </a>
            </div>
          </>
        ) : (
          <>
            <h2>Sign In</h2>
            <form onSubmit={handleSignIn}>
              <label htmlFor="email-signin">E-mail</label>
              <input
                type="email"
                id="email-signin"
                name="email"
                placeholder="example@mail.com"
                required
              />

              <label htmlFor="password-signin">Password</label>
              <input
                type="password"
                id="password-signin"
                name="password"
                placeholder="Enter your password"
                required
              />

              <button type="submit">Sign In</button>
            </form>
            <div>
              Don't have an account?{" "}
              <a href="#" onClick={toggleForm}>
                Sign Up
              </a>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SignUp;
