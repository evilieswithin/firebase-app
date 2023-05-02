import React, { useState } from "react";
import "./index.css";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate("");

  const signUp = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setIsLoading(true);
        toast.success("Registration Successful!");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
        console.log(userCredential);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsError(error.message);
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  console.log({ isError });
  console.log({ isLoading });

  return (
    <>
      <div className="container-signin">
        <section className="wrapper">
          <div className="heading">
            <h1 className="text text-large">
              <strong>Register</strong>
            </h1>
            <p className="text text-normal">
              Already a user?
              <span>
                <a href="/" className="text text-links">
                  Log In
                </a>
              </span>
            </p>
          </div>
          <form onSubmit={signUp}>
            <div className="input-control">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
              ></input>
            </div>

            <div className="input-control">
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
              ></input>
            </div>

            <button
              type="submit"
              name="submit"
              className="input-submit"
              value="Sign In"
            >
              {isLoading ? "Loading..." : "Submit"}
            </button>
          </form>
          {isError && <p className="text text-error">{isError}</p>}
        </section>
      </div>
      <Toaster position="top-right" />
    </>
  );
};

export default SignUp;

