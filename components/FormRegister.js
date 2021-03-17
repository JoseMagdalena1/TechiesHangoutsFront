import React from "react";
import { useAuth } from "../context/auth-context";
import { useHistory } from "react-router-dom";

import { register as signUp } from "../http/userService";

import { useForm } from "react-hook-form";
import { checkInToHangout } from "../http/attendanceService";
import { parseSearchPath } from "../http/usefulFunctions";
export function FormRegister() {
  const url = new URL(window.location.href);
  const query = url.search;

  const {
    handleSubmit,
    register,
    errors,
    watch,
    formState,
    setError,
    setValue
  } = useForm({
    mode: "onBlur"
  });

  const history = useHistory();

  const { setIsAuthenticated, setCurrentUser } = useAuth();

  const handleSignUp = formData => {
    if (url.search === "") {
      console.log(formData.email, formData.password);
      return signUp(formData.email, formData.password)
        .then(response => {
          setIsAuthenticated(true);
          setCurrentUser(response.data);
          history.push("/principal");
        })
        .catch(error => {
          setValue("password", "");
          setError("password", "credentials", "The credentials are invalid");
        });
    } else {
      return signUp(formData.email, formData.password)
        .then(response => {
          setIsAuthenticated(true);
          setCurrentUser(response.data);
          return checkInToHangout(parseSearchPath(query))
            .then(history.push(`/hangout/${parseSearchPath(query)}`))
            .catch(err => console.error(err));
        })
        .catch(error => {
          setValue("password", "");
          setError("password", "credentials", "The credentials are invalid");
        });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSignUp)} noValidate>
      <h1>Create Account</h1>
      <span>or use your email for registration</span>
      <div
        className={`form-control ${
          errors.email ? "ko" : formState.touched.email && "ok"
        }`}
      >
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
        ></input>
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
            required: "The password is mandatory",
            minLength: {
              value: 6,
              message: "You should enter a password with at least 6 characters"
            }
          })}
          type="password"
          name="password"
          placeholder="Password"
        ></input>
        {errors.password && (
          <span className="errorMessage">{errors.password.message}</span>
        )}
      </div>

      <div
        className={`form-control ${
          errors.confirmPassword
            ? "ko"
            : formState.touched.confirmPassword && "ok"
        }`}
      >
        <input
          ref={register({
            validate: value => value === watch("password")
          })}
          type="password"
          name="confirmPassword"
          placeholder="Repeat your password"
        ></input>
        {errors.confirmPassword && (
          <span className="error-message">
            The password and the confirmation should match
          </span>
        )}
      </div>

      <button className="btn" type="submit">
        Sign Up
      </button>
    </form>
  );
}
