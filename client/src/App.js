import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import "./App.css";

// import Login from "./Pages/Login.js";
// import VerificationComponent from "./Pages/Registerverify.js"
// import Signup from "./Pages/Signup.js";
// import ForgetPass from "./Pages/ForgetPass.js";
// import ResetPass from "./Pages/ResetPass.js";
// import NotFound from "./Pages/NotFound.js";
import Admin from "./Pages/Admin.js";
import Home from "./Pages/Home.js";
import SupperAdmin from "./Pages/SupperAdmin.js";
// import SendAdmincustomize from "./Components/Admin/Customize/sendAdmincustomize.js";
// import GetAdminAfterFilled from "./Components/Admin/Customize/getAdminAfterFilled.js";
import GetSendStudentCustomFields from "./Components/Student/Customize/getSendStudentcustomize.js";
import CustomizeCertificate from "./Pages/customizeCertificate.js";
import SendAdmincustomize from "./Components/Admin/Customize/sendAdmincustomize.js";
import GetAdminAfterFilled from "./Components/Admin/Customize/getAdminAfterFilled.js";
import Cert from "./Pages/ViewCertificate.js";
import AddCertificatePage from "./Pages/addCertificate.js";
import StudentProfile from "./Pages/Profile.js";

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
                <Route path="/Supperadmin" element={<SupperAdmin />} />
                  {/* <Route path="/admin" element={<Admin />} />
                  <Route path="/login" element={<Login />} />                                        
                  <Route path="/login" element={<Login />} />                
                  <Route path="/forgetpassword" element={<ForgetPass />} />
                  <Route path="/resetpassword" element={<ResetPass />} />                
                  <Route path="/registerverify/:token" element={<VerificationComponent />} />
                  <Route path="/register" element={<Signup />} />               
                  <Route path="*" element={<NotFound />} /> */}
                  <Route path="/student/view" element={<Cert />} />
                  <Route path="/student/addCertificate" element={<AddCertificatePage/>} />
                  <Route path="/student/profile" element={<StudentProfile/>} />
                </>
        
        </Routes>
      </Router>
    </div>
  );
}