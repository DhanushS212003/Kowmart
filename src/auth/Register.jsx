import React, { useContext, useState } from "react";
import logo from "../assets/img/logo/header_logo.png";
import "./login.css";
import { PrimaryButton, Alert } from "../styles";
import { Form, FormFeedback, Input } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context";

const Register = () => {
  const { usersList, setUsersList } = useContext(AppContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    color: "",
    message: "",
  });

  const toggleAlert = () => setShowAlert(!showAlert);

  const enableRegister =
    name.trim().length > 2 &&
    mobileNumber.length === 10 &&
    /^\d+$/.test(mobileNumber) &&
    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{6,24}$/.test(password) &&
    password === confirmPassword;

  function register(e) {
    e.preventDefault();

    if (!usersList.some((data) => data.phone == mobileNumber)) {
      setIsLoading(true);
      setUsersList((prev) => [
        ...prev,
        {
          name: name.trim(),
          phone: mobileNumber,
          password: password,
          address: "",
          district: "",
          pincode: "",
        },
      ]);
      setShowAlert(true);
      setAlertMessage({
        color: "success",
        message: "Account Created Successfully. Redirecting...",
      });
      setTimeout(() => {
        setName("");
        setMobileNumber("");
        setPassword("");
        setConfirmPassword("");
        setIsLoading(false);
        navigate("/login?user=customer");
      }, 1500);
    } else {
      setShowAlert(true);
      setAlertMessage({
        color: "danger",
        message: "Mobile number already taken",
      });
    }
  }

  return (
    <>
      <Alert
        isOpen={showAlert}
        toggle={toggleAlert}
        color={alertMessage.color}
        role="alert"
      >
        {alertMessage.message}
      </Alert>

      <main className="d-flex flex-column align-items-center vh-100 row-gap-3 pt-5 auth_section">
        <div className="d-flex align-items-center column-gap-2">
          <img className="logo" src={logo} alt="Kowmart logo" />
          <h3 className="primary_color">KowMart</h3>
        </div>

        <Form className="d-flex flex-column row-gap-4" onSubmit={register}>
          <h1 className="text-center fs-6">REGISTER</h1>
          <div>
            <Input
              type="text"
              value={name}
              placeholder="Name"
              onChange={(ev) => setName(ev.target.value)}
              maxLength={24}
              invalid={name.length > 0 && name.trim().length < 3}
              valid={name.trim().length > 2}
              autoFocus
              aria-label="Full Name"
            />
            <FormFeedback>Atleast 3 chars</FormFeedback>
          </div>
          <div>
            <Input
              type="tel"
              value={mobileNumber}
              onChange={(ev) => setMobileNumber(ev.target.value)}
              placeholder="Phone No"
              maxLength={10}
              invalid={
                mobileNumber.length > 0 && !/^\d{10}$/.test(mobileNumber)
              }
              valid={/^\d{10}$/.test(mobileNumber)}
              aria-label="Phone number"
              inputMode="numeric"
            />
            <FormFeedback>Please enter a valid Mobile number</FormFeedback>
          </div>
          <div>
            <Input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(ev) => setPassword(ev.target.value)}
              maxLength={24}
              invalid={
                password.length > 0 &&
                !/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{6,24}$/.test(
                  password
                )
              }
              valid={/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{6,24}$/.test(
                password
              )}
              aria-label="Password"
            />
            <FormFeedback>
              At least 6 chars - include a letter, number & symbol
            </FormFeedback>
          </div>
          <div>
            <Input
              type="password"
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={(ev) => setConfirmPassword(ev.target.value)}
              maxLength={24}
              invalid={
                password.length > 0 &&
                confirmPassword.length > 0 &&
                password !== confirmPassword
              }
              valid={confirmPassword.length > 0 && password === confirmPassword}
              aria-label="Confirm Password"
            />
            <FormFeedback>Password not matched</FormFeedback>
          </div>
          <PrimaryButton
            disabled={!enableRegister || isLoading}
            aria-label="Register your KowMart account"
          >
            REGISTER
          </PrimaryButton>
          <p id="reg_link" className="text-center">
            Existing User?
            <Link
              to="/login?user=customer"
              className="text-decoration-underline"
            >
              Login here
            </Link>
          </p>
        </Form>
      </main>
    </>
  );
};

export default Register;
