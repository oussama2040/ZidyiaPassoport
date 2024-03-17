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
import TenentForgetPass from "./Pages/TenentForgetPass.js";
import TenentResetPass from "./Pages/TenentResetPass.js";
import SuperAdminForgetPass from "./Pages/SuperAdminForgetPass.js";
import SuperAdminResetPass from "./Pages/SuperAdminResetPass.js";
// import NotFound from "./Pages/NotFound.js";
import Admin from "./Pages/Admin.js";
import Home from "./Pages/Home.js";
import SupperAdmin from "./Pages/SupperAdmin.js";
import StudentViewCertificate from "./Pages/StudentViewCertificate.js";
import StudentAddCertificate from "./Pages/StudentaddCertificate.js";
import StudentProfile from "./Pages/StudentProfile.js";
import StudentAllRequests from "./Pages/StudentAllRequest.js";

import SendAdmincustomize from "./Components/Admin/Customize/sendAdmincustomize.js";
import GetAdminAfterFilled from "./Components/Admin/Customize/getAdminAfterFilled.js";
import GetSendStudentCustomFields from "./Components/Student/Customize/getSendStudentcustomize.js";
import CustomizeCertificate from "./Pages/customizeCertificate.js";
import Subscriber from "./Pages/Subscriber.js";
import AdminCertificateReq from "./Components/Admin/CertificateReq/AdminCertificateReq.js";
import AdminCertificateUploaded from "./Components/Admin/CertificateUploaded/AdminCertificateUploaded.js";
import Analytics from "./Components/Admin/Analytics/Analytics.js";

export default function App() {
  const organizationId = 4;
  const studentId = 2;

  return (
    <div>

      <Router>
        <Routes>
          <>

            <Route index element={<Home />} />
            <Route path="/superadmin" element={<SupperAdmin />} />
            <Route path="/student/register" element={<Signup />} />
            <Route path="/student/login" element={<Login />} />
            <Route path="/student/forgetpassword" element={<ForgetPass />} />
            <Route path="/student/resetpass" element={<ResetPass />} />
            <Route path="/tenent/login" element={<TenentLogin />} />
            <Route path="/tenent/forgetpassword" element={<TenentForgetPass />} />
            <Route path="/tenent/resetpass" element={<TenentResetPass />} />
            <Route path="/subscriber/login" element={<SubscriberLogin />} />
            <Route path="/subscriber/forgetpassword" element={<SubscriberForgetPass />} />
            <Route path="/subscriber/resetpass" element={<SubscriberResetPass />} />
            <Route path="/superAdmin/login" element={<SuperAdminLogin />} />
            <Route path="/superAdmin/forgetpassword" element={<SuperAdminForgetPass />} />



            <Route path="/superAdmin/resetpass" element={<SuperAdminResetPass />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/analytics" element={<Analytics />} />
            <Route path="/admin/customize" element={<SendAdmincustomize organizationId={organizationId} />} />
            <Route path="/admin/reqcustomize" element={<GetAdminAfterFilled organizationId={organizationId} />} />
            <Route path="/admin/customizecertificate" element={<CustomizeCertificate />} />
            <Route path="/admin/reqcertificate" element={<AdminCertificateReq organizationId={organizationId} />} />
            <Route path="/admin/certificateuploaded" element={<AdminCertificateUploaded organizationId={organizationId} />} />

            <Route path="/student/customize" element={<GetSendStudentCustomFields organizationId={organizationId} studentId={studentId} />} />

            {/* <Route path="/admin" element={<Admin />} />
                  <Route path="/login" element={<Login />} />                                        
                  <Route path="/login" element={<Login />} />                
                  <Route path="/forgetpassword" element={<ForgetPass />} />
                  <Route path="/resetpassword" element={<ResetPass />} />                
                  <Route path="/registerverify/:token" element={<VerificationComponent />} />
                  <Route path="/register" element={<Signup />} />               
                  <Route path="*" element={<NotFound />} /> */}
            <Route path="/student/viewCertificate" element={<StudentViewCertificate />} />
            <Route path="/student/addCertificate" element={<StudentAddCertificate />} />
            <Route path="/student/profile" element={<StudentProfile />} />
            <Route path="/student/requestCertificate" element={<StudentAllRequests />} />
          </>

        </Routes>
      </Router>
    </div>
  );
}