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
import SendAdmincustomize from "./Components/Admin/Customize/sendAdmincustomize.js";
import GetAdminAfterFilled from "./Components/Admin/Customize/getAdminAfterFilled.js";
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