import React, { useState, useEffect } from "react";
import { useAuth } from "../context/auth-context";
import { Link, useHistory } from "react-router-dom";

import { login, getUser } from "../http/userService";

import { useForm } from "react-hook-form";

export function FormLogin() {
  const {
    handleSubmit,
    register,
    errors,
    watch,
    formState,
    setError,
    setValue,
    reset
  } = useForm({
    mode: "onBlur"
  });

  const history = useHistory();

  const { setIsAuthenticated, setCurrentUser } = useAuth();

  const handleSignIn = formData => {
    console.log(formData);
    return getUser(formData)
      .then(res => {
        if (res.status === 200) {
          return login(formData).then(res => {
            setIsAuthenticated(true);
            setCurrentUser(res.data);
            history.push("/principal");
          });
        }
        console.log("Wrong");
      })
      .catch(error => {
        setValue("password", "");
        setError("credentials", "credentials", "The credentials are invalid");
      });
  };

  return (
    <form onSubmit={handleSubmit(handleSignIn)} noValidate>
      <div
        className={`form-control ${
          errors.email ? "ko" : formState.touched.email && "ok"
        }`}
      >
        <h1>Sign in</h1>

        <span>or use your account</span>

        <input
          ref={register({
            required: "The email is mandatory",
            pattern: {
              value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "The email is not valid"
            }
          })}
          type="email"
          name="email"
          placeholder="Introducir e-mail"
        />
        {errors.email && (
          <span className="errorMessage">{errors.email.message}</span>
        )}
      </div>
      <div
        className={`form-control ${
          errors.password ? "ko" : formState.touched.password && "ok"
        }`}
      >
        <input
          ref={register({
            minLength: {
              value: 6,
              message: "You should enter a password with at least 6 characters"
            }
          })}
          type="password"
          name="password"
          placeholder="Password"
        />
        {errors.password && (
          <span className="errorMessage">{errors.password.message}</span>
        )}
      </div>

      <Link to="/">Forgot your password?</Link>
      <button className="btn" type="submit">
        Sign In
      </button>
    </form>
  );
}
