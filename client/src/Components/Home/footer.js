import React from 'react';
import Styles from './footer.module.css';
import { BsFacebook } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaGraduationCap } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className={Styles.footercontainer}>
        <div className={Styles.row1}>
        <div className={Styles.capWithLearn}>
        <div className={Styles.capIcon}><FaGraduationCap /></div>
        <div className={Styles.learnText}> Learn.</div>
        </div>
        <div className={Styles.followText}> Follow on social service</div>
        <div className={Styles.socialIcons}>
        <div className={Styles.oneIcon}><BsFacebook /></div>
        <div className={Styles.oneIcon}><AiFillInstagram /></div>
        <div className={Styles.oneIcon}><AiFillTwitterCircle /></div>
        </div>
        </div>

        <div className={Styles.row2}>
        <div className={Styles.titles}> Links </div>
        <div className={Styles.subtitles}> Home </div>
        <div className={Styles.subtitles}> Help Center </div>
        <div className={Styles.subtitles}> Service </div>
        </div>

        <div className={Styles.row3}>
        <div className={Styles.titles}> Resource </div>
        <div className={Styles.subtitles}> About Us </div>
        <div className={Styles.subtitles}> Carrier </div>
        <div className={Styles.subtitles}> Legal Notice </div>
        </div>

        <div className={Styles.row4}>
        <div className={Styles.titles}> Contacts </div>
        <div className={Styles.subtitles}> 192.New York </div>
        <div className={Styles.subtitles}> Support </div>
        <div className={Styles.subtitles}> +1124556367 </div>
        </div>
      
    </div>
  )
}

export default Footer
