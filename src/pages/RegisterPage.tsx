import '../pages/login.css';
import { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../store/auth';
import Register from '../types/register';
import * as React from 'react';

interface FormData {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

const RegisterPage = () => {
  const register = useAuth((state) => state.register);

  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=> {
      e.preventDefault();
      const user: Register = {
        firstName: e.currentTarget.firstName.value,
        lastName: e.currentTarget.lastName.value,
        username: e.currentTarget.username.value.trim(),
        password: e.currentTarget.password.value.trim(),
      };
      register(user, navigate);
    }






  

  return (
    <>
      <div className="login-page">
        <div className="login">
          <form className="signIn" onSubmit={handleSubmit}>
            <h3>Welcome<br />Back!</h3>
            <input
              type="text"
              className="w100"
              placeholder="Insert firstname"
              name="firstName"
              autoComplete="off"
              // value={firstName}
              // onChange={handleInputChange}
              required
            />
            <input
              type="text"
              className="w100"
              placeholder="Insert lastname"
              name="lastName"
              autoComplete="off"
              // value={lastName}
              // onChange={handleInputChange}
              required
            />
            <input
              type="text"
              className="w100"
              placeholder="Insert username"
              name="username"
              autoComplete="off"
              // value={username}
              // onChange={handleInputChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Insert Password"
              // value={password}
              // onChange={handleInputChange}
              // required
            />
            <Link to="/">
              <button className="form-btn sx back" type="button">
                Back
              </button>
            </Link>
            <button className="form-btn dx" type="submit">
              Log In
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;