import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import "./App.css";

import Login from "./Pages/StudentLogin.js";
import TenentLogin from "./Pages/TenentLogin.js";
import SubscriberLogin from "./Pages/SubscriberLogin.js";
import SuperAdminLogin from "./Pages/SuperAdminLogin.js";
// import VerificationComponent from "./Pages/Registerverify.js"
import Signup from "./Pages/Signup.js";
import ForgetPass from "./Pages/StudentForgetPass.js";
import ResetPass from "./Pages/StudentResetPass.js";
import SubscriberForgetPass from "./Pages/SubscriberForgetPass.js";
import SubscriberResetPass from "./Pages/SubscriberResetPass.js";
import SubscriberUpdatePass from "./Pages/SubscriberUpdatePass.js";
import TenentForgetPass from "./Pages/TenentForgetPass.js";
import TenentResetPass from "./Pages/TenentResetPass.js";
import TenentUpdatePass from "./Pages/TenentUpdatePass.js";
import SuperAdminForgetPass from "./Pages/SuperAdminForgetPass.js";
import SuperAdminResetPass from "./Pages/SuperAdminResetPass.js";
// import NotFound from "./Pages/NotFound.js";
import Admin from "./Pages/Admin.js";
import Home from "./Pages/Home.js";
import SupperAdmin from "./Pages/SupperAdmin.js";
import SendAdmincustomize from "./Components/Admin/Customize/sendAdmincustomize.js";
import GetAdminAfterFilled from "./Components/Admin/Customize/getAdminAfterFilled.js";
import GetSendStudentCustomFields from "./Components/Student/Customize/getSendStudentcustomize.js";
import CustomizeCertificate from "./Pages/customizeCertificate.js";

export default function App() {
  const organizationId = 4;
  const studentId = 2;



  return (
    <div>
      <Router>
        <Routes>
          <>
            <Route index element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/Superadmin" element={<SupperAdmin />} />
            <Route path="/admin/customize" element={<SendAdmincustomize />} />
            <Route path="/admin/reqcustomize" element={<GetAdminAfterFilled />} />
            <Route path="/admin/customizecertificate" element={<CustomizeCertificate />} />
            <Route path="/student/register" element={<Signup />} />
            <Route path="/student/login" element={<Login />} />
            <Route path="/student/forgetpassword" element={<ForgetPass />} />
            <Route path="/student/resetpass" element={<ResetPass />} /> 
            <Route path="/tenent/login" element={<TenentLogin />} />
            <Route path="/tenent/forgetpassword" element={<TenentForgetPass />} />
            <Route path="/tenent/resetpass" element={<TenentResetPass />} /> 
            <Route path="/tenent/updatepassword" element={<TenentUpdatePass />} />   
            <Route path="/subscriber/login" element={<SubscriberLogin />} />
            <Route path="/subscriber/forgetpassword" element={<SubscriberForgetPass />} />
            <Route path="/subscriber/resetpass" element={<SubscriberResetPass />} /> 
            <Route path="/subscriber/updatepassword" element={<SubscriberUpdatePass />} />    
            <Route path="/superAdmin/login" element={<SuperAdminLogin />} />
            <Route path="/superAdmin/forgetpassword" element={<SuperAdminForgetPass />} />
            <Route path="/superAdmin/resetpass" element={<SuperAdminResetPass />} />        

            <Route path="/admin/customize" element={<SendAdmincustomize organizationId={organizationId} />} />
            <Route path="/admin/reqcustomize" element={<GetAdminAfterFilled  organizationId={organizationId}/>} />
            <Route path="/admin/customizecertificate" element={<CustomizeCertificate />} />
            <Route path="/student/customize" element={<GetSendStudentCustomFields  organizationId={organizationId}  studentId={studentId} />} />
                
            {/* <Route path="/admin" element={<Admin />} />
                  <Route path="/login" element={<Login />} />                                        
                  <Route path="/login" element={<Login />} />                
                  <Route path="/forgetpassword" element={<ForgetPass />} />
                  <Route path="/resetpassword" element={<ResetPass />} />                
                  <Route path="/registerverify/:token" element={<VerificationComponent />} />
                  <Route path="/register" element={<Signup />} />               
                  <Route path="*" element={<NotFound />} /> */}
          </>
        </Routes>
      </Router>
    </div>
  );
}