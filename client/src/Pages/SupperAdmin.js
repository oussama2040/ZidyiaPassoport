import React, { useState } from 'react';
import SideBarSupperAdmin from '../Components/SideBar/SideBarSupperAdmin';
import NavBarSupperAdmin from '../Components/NavBarAdmin/NavBarSupperAdmin';
import AnalyticsComponent from '../Components/SuperAdmin/AnalyticsComponent';
import AnalyticsComponentPerc from '../Components/SuperAdmin/AnalyticsComponentPerc';
import TenantCreationContainer from '../Components/SuperAdmin/TenantCreationComponent';
import SubscriberConfirmation from '../Components/SuperAdmin/SubscriberConfirmationComponent'

function SupperAdmin() {
  const [activeTab, setActiveTab] = useState('Analytics');

  const handleTabClick = (name) => {
    setActiveTab(name);
  };

  return (
    <div>
      <NavBarSupperAdmin />
      <div style={{ display: 'flex', flexDirection: 'row'}}>
        <SideBarSupperAdmin activeTab={activeTab} handleTabClick={handleTabClick} />
        {activeTab === 'Analytics' && (
          <>
            <AnalyticsComponent />
            <AnalyticsComponentPerc />
          </>
        )}
        {activeTab === 'Create Tenant' && <TenantCreationContainer />}
        {activeTab === 'Create Verifier' && <SubscriberConfirmation />}
        {activeTab === 'Students Account' && <p>student</p>}
      </div>
    </div>
  );
}

export default SupperAdmin;
