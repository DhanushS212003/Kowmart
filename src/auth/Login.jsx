import React, { useContext, useState, useMemo } from "react";
import logo from "../assets/img/logo/header_logo.png";
import "./login.css";
import { PrimaryButton, Alert } from "../styles";
import { Form, FormFeedback, Input } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context";

const Login = () => {
  const userType = useMemo(() => {
    return new URLSearchParams(window.location.search).get("user");
  }, []);
  const navigate = useNavigate();
  const { usersList, repsList, setCurrentUser } = useContext(AppContext);
  const [mobileNumber, setMobileNumber] = useState("");
  const [repId, setRepId] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    color: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const mapper = {
    customer: {
      key: "phone",
      message: "Phone Number",
    },
    rep: {
      key: "repId",
      message: "Rep ID",
    },
  };

  const toggleAlert = () => setShowAlert(!showAlert);

  const enableLogin =
    userType === "customer"
      ? mobileNumber.length === 10 &&
        /^\d+$/.test(mobileNumber) &&
        password.length > 0
      : repId.length > 0 && password.length > 0;

  function login(e) {
    e.preventDefault();

    const keys = mapper[userType];
    const id = userType === "customer" ? mobileNumber : repId;
    const data = userType === "customer" ? usersList : repsList;

    const user = data.find((item) => item[keys.key] === id);

    if (user) {
      if (user.password === password) {
        setIsLoading(true);
        setCurrentUser({ type: userType, id });
        setShowAlert(true);
        setAlertMessage({
          color: "success",
          message: "Logined Successfully. Redirecting...",
        });
        setTimeout(() => {
          setMobileNumber("");
          setRepId("");
          setPassword("");
          setIsLoading(false);
          navigate("/profile");
        }, 1500);
      } else {
        setShowAlert(true);
        setAlertMessage({
          color: "danger",
          message: "Incorrect credentials",
        });
      }
    } else {
      setShowAlert(true);
      setAlertMessage({
        color: "danger",
        message: `${keys.message} not found`,
      });
    }
  }

  return (
    <>
      {!mapper[userType] ? (
        <main className="d-flex justify-content-center align-items-center vh-100">
          <h5 className="text-danger">Invalid User type.</h5>
        </main>
      ) : (
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

            <Form className="d-flex flex-column row-gap-4" onSubmit={login}>
              <h1 className="text-center fs-6">LOGIN</h1>
              {userType === "rep" ? (
                <div>
                  <Input
                    type="text"
                    value={repId}
                    onChange={(ev) => setRepId(ev.target.value)}
                    placeholder="Rep ID"
                    autoFocus
                    aria-label="Rep ID"
                  />
                </div>
              ) : (
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
                    autoFocus
                    aria-label="Phone number"
                    inputMode="numeric"
                  />
                  <FormFeedback>
                    Please enter a valid Mobile number.
                  </FormFeedback>
                </div>
              )}
              <div>
                <Input
                  type="password"
                  value={password}
                  placeholder="Password"
                  onChange={(ev) => setPassword(ev.target.value)}
                  aria-label="Password"
                />
              </div>
              <PrimaryButton
                disabled={!enableLogin || isLoading}
                aria-label="Login to your KowMart account"
              >
                LOGIN
              </PrimaryButton>
              {userType === "customer" && (
                <p id="reg_link" className="text-center">
                  New User?{" "}
                  <Link to="/register" className="text-decoration-underline">
                    Start here
                  </Link>
                </p>
              )}
            </Form>
          </main>
        </>
      )}
    </>
  );
};

export default Login;
