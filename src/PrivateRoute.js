import { useContext } from "react";
import { AuthContext } from "./auth";

import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

export  function PrivateRoute({children}){

    let userinfo = useContext(AuthContext);
    let authToken = localStorage.getItem("token");
    let tokenActive = false;
     let decode;

    if(authToken){
     decode = jwtDecode(authToken);
     let expiryTime = decode.exp*1000;
     let currentTime = Date.now();


     if(currentTime< expiryTime){
        tokenActive=true;
        console.log(" It's be type of time",typeof currentTime,currentTime);;
     }
    }

    if(!(authToken && tokenActive)){
        return <Navigate to ="/"></Navigate>
    }
return children;
}
export  function PrivateRouteforLogin({children}){

    let userinfo = useContext(AuthContext);
    let authToken = localStorage.getItem("token");
    let tokenActive =false;
    let decode;

    if(authToken){
        decode = jwtDecode(authToken);
        let expiryTime = decode.exp*1000;
        let currentTime = Date.now();

        if(currentTime< expiryTime){
            tokenActive =true;
        }
        else{
            localStorage.clear();
        }
    }
    if(authToken && tokenActive){
        return <Navigate to="/getLocation"></Navigate>
    }
    return children;
}