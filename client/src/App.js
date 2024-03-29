import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState , useEffect } from "react";
import axios from 'axios';
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
import TenentUpdatePass from "./Pages/TenentUpdatePass.js";
import SubscriberUpdatePass from "./Pages/SubscriberUpdatePass.js"
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
import IssueCert from "./Pages/StudentIssueCertificate.js";
import SendAdmincustomize from "./Components/Admin/Customize/sendAdmincustomize.js";
import GetAdminAfterFilled from "./Components/Admin/Customize/getAdminAfterFilled.js";
import GetSendStudentCustomFields from "./Components/Student/Customize/getSendStudentcustomize.js";
import CustomizeCertificate from "./Pages/customizeCertificate.js";
import Subscriber from "./Pages/Subscriber.js";
import AdminCertificateUploaded from "./Components/Admin/CertificateUploaded/AdminCertificateUploaded.js";
import AdminIssueCertifcate from "./Components/Admin/Customize/AdminIssueCertifcate.js";
import Analytics from "./Components/Admin/Analytics/Analytics.js";
import EndSubscription from "./Pages/EndSubscription.js";



export default function App() {
const [OrganiztionId, setOrganiztionId] = useState(null);
  useEffect(() => {
    axios.get(`http://localhost:5000/tenent/OrganiztionId`,
    { withCredentials: true })
      .then(response => {
        setOrganiztionId(response.data.organizationId);
      })
      .catch(error => {
        console.error('Error fetching certificate data:', error);
      });
  }, [OrganiztionId]);

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
            <Route path="/tenent/updatepassword" element={<TenentUpdatePass />} />
            <Route path="/tenent/forgetpassword" element={<TenentForgetPass />} />
            <Route path="/tenent/updatepassword" element={<TenentUpdatePass />} />
            <Route path="/tenent/resetpass" element={<TenentResetPass />} />
            <Route path="/subscriber/login" element={<SubscriberLogin />} />
            <Route path="/subscriber/updatepassword" element={<SubscriberUpdatePass />} />
            <Route path="/subscriber/forgetpassword" element={<SubscriberForgetPass />} />
            <Route path="/subscriber/updatepassword" element={<SubscriberUpdatePass />} />
            <Route path="/subscriber/resetpass" element={<SubscriberResetPass />} />
            <Route path="/superAdmin/login" element={<SuperAdminLogin />} />
            <Route path="/superAdmin/forgetpassword" element={<SuperAdminForgetPass />} />
            <Route path="/subscriber/scanQrCode" element={<Subscriber />} />
            
            <Route path="/subscriber/subscriptionEnd" element={<EndSubscription />} />
            <Route path="/superAdmin/resetpass" element={<SuperAdminResetPass />} />
            
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin" element={<Analytics />} />
            <Route path="/admin/customize" element={<SendAdmincustomize organizationId={OrganiztionId} />} />
            <Route path="/admin/reqcustomize" element={<GetAdminAfterFilled organizationId={OrganiztionId} />} />
            <Route path="/admin/customizecertificate/:studentID" element={<CustomizeCertificate />} />
            <Route path="/admin/certificateuploaded" element={<AdminCertificateUploaded organizationId={OrganiztionId} />} />
            <Route path="/admin/issuecertificate" element={<AdminIssueCertifcate organizationId={OrganiztionId} />} />
            <Route path="/student/customize/:organizationId/:requestId" element={<GetSendStudentCustomFields/>} />

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
            <Route path="/student/issueCertificate" element={<IssueCert />} />
          
          </>

        </Routes>
      </Router>
    </div>
  );
}