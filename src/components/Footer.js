import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faYoutube, faTwitter } from '@fortawesome/free-brands-svg-icons';
import axiosInstance from './axiosInstance';
const Footer = () => {
  return (
    <footer>
      <div className="footer">
        <div className="row">
          <a href="https://www.facebook.com/natascha.andreeva.33/"><FontAwesomeIcon icon={faFacebook} className="px-2 socIcon" /></a>
          <a href="https://www.instagram.com/karrbbi/"><FontAwesomeIcon icon={faInstagram} className="px-2 socIcon" /></a>
          <a href="https://youtu.be/xm3YgoEiEDc"><FontAwesomeIcon icon={faYoutube} className="px-2 socIcon" /></a>
          <a href="https://twitter.com/elonmusk?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"><FontAwesomeIcon icon={faTwitter} className="px-2 socIcon" /></a>
        </div>
        <div className="row">
          MUNIRA Copyright ©
          {' '}
          {new Date().getFullYear()}
          {' '}
          Inferno - All rights reserved || Designed By: Munira
        </div>
      </div>
    </footer>
  );
};

export default Footer;
