// import axios from "axios";
// import React, { useContext, useState } from "react";
// import { NavLink, useNavigate, useLocation } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { AuthContext } from "../auth";
import axios from "axios";
import React,{ useState,useEffect } from "react";
import { NavLink,useNavigate } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input,Label,Button ,Span} from "reactstrap";
import './Login.css';




const Login =()=>{
  let navigate = useNavigate();
  let [PhonNumber, setPhonNumber] = useState({
    phonNumber:""
  });

  let handleChange=(e)=>{
    let {name,value}=e.target;
    setPhonNumber({...PhonNumber,[name]:value});
}

  let sendOtp = async () => {
    let {phonNumber}=PhonNumber;
    if(!phonNumber) {
      toast.error("Enter your PhonNumber !");
    }else{
       console.log("on click ", phonNumber);
      try {
      
      let sendingOtp = await axios.post(
        "http://localhost:5000/api/otpgenerator",
        PhonNumber
      );
      if(sendingOtp.status === 200)
     {
      console.log("status ",phonNumber)
      navigate("/otp",{state:phonNumber});
        
        
      }else{
        toast.error("OTP is not send !");
      }
       
      
      console.log("otp ",sendingOtp);
    } catch (e) {
      console.log("Error from Api", e);
    }
  }
  
  };
  return (
    <>
      <div className="container mt-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-6">
            <h2 style={{ textAlign: "center",color:"brown" }}>Welcome Back, Log In</h2>
            <div className="card px-5 py-5" id="form1">
              <div className="form-data">
                <div className="forms-inputs mb-4">
                  {" "}
                  <span style={{color:"black"}}>PhonNumber</span><br />
                  <Input
                    autoComplete="off"
                    onChange={handleChange}
                    name="phonNumber"
                    type="text"
                    style={{
                      marginTop:"5px"
                    }}
                  />
                </div>
                {/* <div class="forms-inputs mb-4"> <span>Password</span> 
                    <input autocomplete="off" type="password" v-model="password" />
                        
                    </div> */}
                <div className="mb-3">
                  {" "}
                  <Button id="login" className="btn btn-dark w-100" onClick={sendOtp}>
                    Login
                  </Button>{" "}
                </div>
                &nbsp;
                <p style={{ textAlign: "center" ,color:'black' }}>
                  Don't have and Account{" "}
                  <NavLink to="/register"  id="navlink" style={{
                    color:"red"
                  }}>Sing up</NavLink>{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;