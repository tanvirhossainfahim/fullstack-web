import "firebase/auth";
import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { Context } from "../App";
import { createUserEmailAndPassword, handleGoogleSignIn, initializeApp } from "../FirebaseManagement/FirebaseManagement";
import Validate from "../Validation/Validate";
import classes from "./Signup.module.css";

initializeApp(); // firebase initialize;

const Signup = () => {
  const [newUser, setNewUser] = useState(false);
  const [userInfo, setUserInfo] = useState({
    isCreated: false,
    name: "",
    email: "",
    password: "",
    password2: "",
    successMsg: "",
    errorMsg: "",
    passwordMatch: "",
  });
  const [errors, setErrors] = useState({});
  const [loggedIn, setLoggedIn] = useContext(Context);
  const googleSignIn = () => {
    handleGoogleSignIn()
      .then((res) => {
        setLoggedIn(res);
      })
      .catch((error) => {
        alert(error.message);
      });
  }; // Sign in with google account
  const handleChange = (e) => {
    const users = { ...userInfo };
    users[e.target.name] = e.target.value;
    setUserInfo(users);
  }; //input field handle change
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(Validate(userInfo));
    if (userInfo.password !== userInfo.password2) {
      const users = { ...userInfo };
      users.passwordMatch = "Password not Match";
      setUserInfo(users);
      return;
    }else if (!newUser && userInfo.name && userInfo.email && userInfo.password) {
      createUserEmailAndPassword(
        userInfo.name,
        userInfo.email,
        userInfo.password
      )
        .then((res) => {
          setUserInfo(res);
        })
    }
  }; // Signup with signUp form
  return (
    <div className={classes.formWrapper}>
      <form onSubmit={handleSubmit} className={classes.form}>
        {userInfo.isCreated ? (
          <p className="text-success">{userInfo.successMsg}</p>
        ) : (
          <p className="text-danger">{userInfo.errorMsg}</p>
        )}
        <h3 className="text-center">Create An Account</h3>
        <input
          className={`form-control ${classes.field}`}
          type="text"
          name="name"
          value={userInfo.name}
          onChange={handleChange}
          placeholder="Enter Your Name"
        />
        {errors.name && <p className="text-danger">{errors.name}</p>}
        <input
          className={`form-control ${classes.field}`}
          type="email"
          name="email"
          value={userInfo.email}
          onChange={handleChange}
          placeholder="Enter Your Email"
        />
        {errors.email && <p className="text-danger">{errors.email}</p>}
        <input
          className={`form-control ${classes.field}`}
          type="password"
          name="password"
          value={userInfo.password}
          onChange={handleChange}
          placeholder="Enter Your Password"
        />
        {errors.password && <p className="text-danger">{errors.password}</p>}
        <input
          className={`form-control ${classes.field}`}
          type="password"
          name="password2"
          value={userInfo.password2}
          onChange={handleChange}
          placeholder="Confirm Password"
        />
        {(errors.password2 && (
          <p className="text-danger">{errors.password2}</p>
        )) || <p className="text-danger">{userInfo.passwordMatch}</p>}
        <input
          type="submit"
          name=""
          className={classes.btn}
          value="Create An Account"
        />
        <p>
          Already Have An Account ? <Link to="/login">Login</Link>
        </p>
      </form>
      <br />
      <h6 className={classes.hr}>Or</h6>
      <Button onClick={googleSignIn} className={classes.google}>
        <span>
          <FcGoogle/>
        </span>
        <span>Continue With Google</span>
      </Button>
    </div>
  );
};
export default Signup;
