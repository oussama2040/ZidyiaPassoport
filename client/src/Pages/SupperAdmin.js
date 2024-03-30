import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBarSupperAdmin from '../Components/SideBar/SideBarSupperAdmin';
import NavBarSupperAdmin from '../Components/NavBar/NavBarSupperAdmin';
import AnalyticsComponent from '../Components/SuperAdmin/AnalyticsComponent';
import AnalyticsComponentPerc from '../Components/SuperAdmin/AnalyticsComponentPerc';
import TenantCreationContainer from '../Components/SuperAdmin/TenantCreationComponent';
import VerifierCreationContainer from '../Components/SuperAdmin/VerifierCreationComponent';
import SubscriberConfirmation from '../Components/SuperAdmin/SubscriberConfirmationComponent';
import axios from 'axios';

function SupperAdmin() {
  const [activeTab, setActiveTab] = useState(localStorage.getItem('activeTab') || 'Analytics');
  const [validToken, setValidToken] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const response = await axios.get('http://localhost:5000/superadmin', { withCredentials: true });
        const status = response.data.grantedAccess;
        setValidToken(status === true);
        setLoading(false); // Set loading to false once token validity check is complete
      } catch (error) {
        console.error('Error checking token validity:', error);
        setValidToken(false);
        setLoading(false); // Set loading to false if there's an error
      }
    };

    checkTokenValidity();
  }, []);

  const handleTabClick = (name) => {
    setActiveTab(name);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!validToken) {
    navigate('/superadmin/login');
    return null; 
  }

  return (
    <div>
      <NavBarSupperAdmin />
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <SideBarSupperAdmin activeTab={activeTab} handleTabClick={handleTabClick} />
        {activeTab === 'Analytics' && (
          <>
            <AnalyticsComponent />
            <AnalyticsComponentPerc />
          </>
        )}
        {activeTab === 'Create Tenant' && <TenantCreationContainer />}
        {activeTab === 'Subscription Requests' && <SubscriberConfirmation />}
        {activeTab === 'Create Verifier' && <VerifierCreationContainer />}
        {activeTab === 'Students Account' && <p>student accounts</p>}
      </div>
    </div>
  );
}

export default SupperAdmin;
