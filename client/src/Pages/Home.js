import React from 'react';
import Navbar from '../Components/Home/navbar';
import Coverphoto from '../Components/Home/coverphoto';
import Aboutus from '../Components/Home/aboutus.js';
import Features from '../Components/Home/features.js';
import Whyzidyia from '../Components/Home/whyzidyia.js';
import Footer from '../Components/Home/footer.js';

const Home = () => {
  return (
    <div>
        <Navbar/>
        <Coverphoto/>
        <Aboutus/>
        <Features/>
        <Whyzidyia/>
        <Footer/>
      
    </div>
  )
}

export default Home;
