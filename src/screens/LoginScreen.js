import {
  Avatar,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function LoginScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //   const formSubmit = () => {
  //     console.log(email, password);
  //   };

  // const getTokenCookie = () => {
  //   console.log("getCookie :", cookies.get("jwt"));
  // };

  const formSubmit = async (e) => {
    e.preventDefault();

    try {
      let res = await fetch("http://localhost:3000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      let resJwt = await res.text();
      if (res.status === 200) {
        setEmail("");
        setPassword("");
        cookies.set("jwt", resJwt);
        props.loginState(true);
        props.userDataProp();
      } else {
        console.log("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container maxWidth="xs">
      <div className="loginWrap">
        <div className="formHeader">
          <Avatar sx={{ bgcolor: "primary.main" }}>
            <AccountCircleOutlinedIcon />
          </Avatar>
          <Typography variant="h5">Log in</Typography>
        </div>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={formSubmit}
        >
          Sign In
        </Button>
        <Link to="/signup">Don't have an account? Sign Up</Link>
      </div>
    </Container>
  );
}

export default LoginScreen;
