import React, { Component } from 'react';

import './footer_sidemenu.scss';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';

class FooterSidemenu extends Component {
  render() {
    return (
      <footer className="footer-sidemenu">
        <div className="footer-links">
          <a href="/about">O nas</a>
          <a href="/contact">Kontakt</a>
        </div>
        <div className="footer-icons">
          <a href="www.instagram.com"><InstagramIcon></InstagramIcon></a>
          <a href="www.instagram.com"><TwitterIcon></TwitterIcon></a>
          <a href="www.instagram.com"><FacebookIcon></FacebookIcon></a>
        </div>
      </footer>
    );
  }
}

export default FooterSidemenu;
