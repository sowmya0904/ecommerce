import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Checkbox, Snackbar } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import ButtonUI from "../../common/ButtonUI";
import NavBar from "../../common/NavBar";
import EmailValidator from "../../utils/EmailValidator";
import PhoneValidator from "../../utils/PhoneValidator";
import CreateUser from "../../utils/Signup";

const SignUp = () => {
  let navigation = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactNumber, setContact] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [validemail, setvalidemail] = useState(true);
  const [validcontact, setvalidcontact] = useState(true);
  const [change, setchange] = useState(false);
  const [admin, setadmin] = useState(false);
  const [message, setMessage] = useState(false);
  const [done, setdone] = useState(false);
  const firstNameHandler = (event) => {
    setchange(true);
    setFirstName(event.target.value);
  };
  const lastNameHandler = (event) => {
    setchange(true);
    setLastName(event.target.value);
  };
  const emailHandler = (event) => {
    setchange(true);
    setEmail(event.target.value);
  };
  const passwordHandler = (event) => {
    setchange(true);
    setPassword(event.target.value);
  };
  const confirmpasswordHandler = (event) => {
    setchange(true);
    setconfirmpassword(event.target.value);
  };
  const contactHandler = (event) => {
    setchange(true);
    setContact(event.target.value);
  };
  const RoleHandler = () => {
    setadmin(!admin);
  };

  const submitrequest = async () => {};

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!EmailValidator(email)) {
      setvalidemail(false);
      return;
    }

    if (!PhoneValidator(contactNumber)) {
      setvalidcontact(false);
      return;
    }

    if (password != confirmpassword)
      return alert("password re-entered is wrong");

    const create_feedback = await CreateUser({
      email: email,
      fname: firstName,
      lname: lastName,
      mobile: contactNumber,
      password: password,
      role: !admin ? "user" : "admin",
    });
    setdone(true);
    if (create_feedback !== 200) {
      toast.error("User already exist with same email address");
      return;
    }
    toast.success("User Registered Successfully !");

    setFirstName("");
    setLastName("");
    setContact("");
    setPassword("");
    setEmail("");
    setconfirmpassword("");
    setTimeout(() => {
      navigation("/signin");
    }, 2000);
  };

  return (
    <>
      <NavBar>
        <ShoppingCartIcon style={{ color: "white" }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          upGrad E-shop
        </Typography>
        <ButtonUI
          type="button"
          onClick={() => {
            navigation("/signin");
          }}
        >
          Login
        </ButtonUI>
        <ButtonUI type="button">Sign Up</ButtonUI>
      </NavBar>
      <div className="px-3 sm:px-16 md:px-32 py-16 flex flex-col items-center">
        <LockOutlinedIcon
          style={{
            color: "white",
            backgroundColor: "rgb(242, 39, 70)",
            borderRadius: "50%",
            height: "50px",
            width: "50px",
            padding: "7px",
          }}
        />
        <h6 className="text-center text-3xl"> Sign up</h6>
        <br></br>
        <form
          onSubmit={submitHandler}
          className="w-[25%] mx-auto flex flex-col items-center gap-3"
        >
          <TextField
            required
            id="firstName"
            label="First Name"
            placeholder="First Name"
            className="w-full"
            value={firstName}
            onChange={firstNameHandler}
          />
          <TextField
            required
            id="lastName"
            label="Last Name"
            placeholder="Last Name"
            className="w-full"
            value={lastName}
            onChange={lastNameHandler}
          />

          <TextField
            required
            id="email"
            label="Email Address"
            placeholder="Email Address"
            error={!validemail ? true : false}
            className="w-full"
            value={email}
            onChange={emailHandler}
          />
          <TextField
            required
            id="password"
            label="Password"
            type="password"
            className="w-full"
            value={password}
            placeholder="Password"
            onChange={passwordHandler}
          />
          <TextField
            required
            id="cpassword"
            label="Confirm Password"
            type="password"
            placeholder="Confirm Password"
            className="w-full"
            value={confirmpassword}
            onChange={confirmpasswordHandler}
          />
          <TextField
            required
            id="contact"
            label="Contact Number"
            placeholder="Contact Number"
            error={!validcontact ? true : false}
            className="w-full"
            value={contactNumber}
            onChange={contactHandler}
          />
          <label>Admin</label>

          <Checkbox id="role" onChange={RoleHandler}>
            Admin
          </Checkbox>

          <div
            style={{
              display: "flex",
              justifyItems: "center",
              justifyContent: "space-around",
            }}
          >
            {" "}
            <Button
              variant="contained"
              type="submit"
              disabled={
                !change ||
                !firstName ||
                !lastName ||
                !password ||
                !confirmpassword ||
                contactNumber.length < 10 ||
                !email
                  ? true
                  : false
              }
            >
              SIGN UP{" "}
            </Button>
          </div>
        </form>
        <br></br>
        <Row>
          <Col>
            Already have an account?
            <Link
              to={`/signin`}
              style={{ textDecoration: "underline", color: "blue" }}
            >
              {" "}
              Login
            </Link>
          </Col>
        </Row>
      </div>
      <ToastContainer />
    </>
  );
};

export default SignUp;
