//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Router, Route,Routes } from "react-router-dom";
import "./App.css";
// import Headers from "./component/Headers.js";
// import Login from "./component/Login.js";
// import Register from "./component/Register.js";
import Headers from './components/Headers'
import Login from './components/login'
import Register from './components/Register'

import "react-toastify/dist/ReactToastify.css";
// import GetLocation from "./component/GetLocation.js";
// import MidPoint from "./component/MidPoint.js";
// import Home from "./component/Home.js";\

import GetLocation from './components/GetLocation'
import Home from './components/Home'
import MidPoint from './components/MidPoint'
import { useEffect, useState } from "react";
import {AuthContext} from './auth'
// import { PrivateRoute, PrivateRouteforLogin } from "./PrivateRoute.js";
import {PrivateRoute ,PrivateRouteforLogin} from "./PrivateRoute"

let  App =()=> {
  let [userId, setuserId] = useState(null);
  let [usefName, setfname] = useState(null);
  let [phonenumber, setphoneNumber] = useState(null);
  let [token, setAuthToken] = useState(null);

  let getuserId = () => {
    let data = localStorage.getItem("userId");
    setuserId(data);
  };

  let getfname = () => {
    let data = localStorage.getItem("usefName");
    setfname(data);
  };

  let getphoneNumber = () => {
    let data = localStorage.getItem("phonenumber");
    setphoneNumber(data);
  };

  let getAuthToken = () => {
    let data = localStorage.getItem("token");
    setAuthToken(data);
  };

  useEffect(() => {
    getuserId();
    getfname();
    getphoneNumber();
    getAuthToken();
  }, []);

  return (
    <>
      <AuthContext.Provider
        value={{
          usefName,
          phonenumber,
          userId,
          token,
          setAuthToken,
          setphoneNumber,
          setuserId,
          setfname,
        }}
      >
        <Headers></Headers>
        {/* <Home/> */}
        <Router>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <PrivateRouteforLogin>
                  <Login />
                </PrivateRouteforLogin>
              }
            ></Route>
            {/* <Route
              exact
              path="/otp"
              element={
                <PrivateRouteforLogin>
                  <Otp />
                </PrivateRouteforLogin>
              }
            ></Route> */}
            <Route exact path="/register" element={<Register />}></Route>
            <Route
              exact
              path="/getLocation"
              element={
                <PrivateRoute>
                  <GetLocation />
                </PrivateRoute>
              }
            ></Route>
            <Route
              exact
              path="/midpoint"
              element={
                <PrivateRoute>
                  <MidPoint />
                </PrivateRoute>
              }
            ></Route>
            <Route
              exact
              path="/Home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            ></Route>
          </Routes>
        </Router>
      </AuthContext.Provider>
    </>
  );
}

export default App;
