import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import Header from "./components/Header";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import ProfileScreen from "./screens/ProfileScreen";



const cookies = new Cookies();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const getTheUserData = async () => {
    try {
      let response = await fetch("http://localhost:3000/api/user/userdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
          "auth-token": cookies.get("jwt"),
        },
      });
      let userInfo = await response.json();
      if (response.status === 200) {
        setUserData(userInfo);
        setIsLoggedIn(true);
      } else if (response.status === 401) {
        console.log("you are not autherized");
      } else {
        console.log("Some error occured");
      }
    } catch (err) {
      console.log("not Authorized", err);
      console.log(cookies.get("jwt"));
    }
  };

  useEffect(() => {
    if (
      cookies.get("jwt") === null ||
      cookies.get("jwt") === "" ||
      cookies.get("jwt") === undefined
    ) {
      console.log("no token");
    } else {
      getTheUserData();
    }
  }, []);

  return (
    <div className="App">
      <Header
        loginStatus={isLoggedIn}
        loginState={setIsLoggedIn}
        user={userData}
      />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route
            path="login"
            element={
              <LoginScreen
                loginState={setIsLoggedIn}
                userDataProp={getTheUserData}
              />
            }
          />
          <Route path="signup" element={<RegisterScreen />} />
          <Route path="profile" element={<ProfileScreen user={userData} />} />
          
        </Routes>
      </Container>
    </div>
  );
}

export default App;
