import { useState,useEffect } from "react";
import { AuthContext } from "./auth";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Register from "./components/Register";
import Headers from "./components/Headers";
import GetLocation from "./components/GetLocation";
import MidPoint from "./components/MidPoint";
import Home from "./components/Home";
// import Login from "./components/Login";
import Login from './components/Login';
import Otp from "./components/Otp";
import { PrivateRoute,PrivateRouteforLogin } from "./PrivateRoute";




function App() {
  let [userId,setuserId]=useState(null);
  let [usefName,setfname]=useState(null);
  let [phonnumber,setphonNumber]=useState(null);
  let [token,setAuthToken]=useState(null);

  let getuserId = ()=>{
     let data = localStorage.getItem('userId');
       setuserId(data);
  }

  let getfname = ()=>{
   let data = localStorage.getItem('usefName');
   setfname(data);
  }
   
  let getphonNumber = ()=>{
   let data = localStorage.getItem('phonnumber');
   setphonNumber(data);
  }

  let getAuthToken = ()=>{
   let data = localStorage.getItem('token');
   setAuthToken(data);
  }

  useEffect(()=>{
   getuserId();
   getfname();
   getphonNumber();
   getAuthToken();
  },[]);



 return (
  
  <>
  <AuthContext.Provider
  value={{
   usefName,
   phonnumber,
   userId,
   token,
   setAuthToken,
   setphonNumber,
   setuserId,
   setfname
  }}
  >

  <Headers></Headers>
  <Router>
   <Routes>
    
     <Route exact path='/' element={
       <PrivateRouteforLogin>
         <Login/>
       </PrivateRouteforLogin>
     }></Route>
     <Route exact path='/otp' element={
       <PrivateRouteforLogin>
         <Otp/>
       </PrivateRouteforLogin>
     }></Route>
     <Route exact path='/register' element={<Register/>}></Route>
     <Route exact path='/getLocation' element={
     <PrivateRoute>
        <GetLocation/>
     </PrivateRoute>
     }></Route>
     <Route exact path='/midpoint' element={
       <PrivateRoute>
         <MidPoint/>
       </PrivateRoute>
     }></Route>
     <Route exact path='/home' element={
       <PrivateRoute>
         <Home/>
       </PrivateRoute>
     }></Route>

   </Routes>
  </Router>
  </AuthContext.Provider>

  
  </>
  
 );
}

export default App;