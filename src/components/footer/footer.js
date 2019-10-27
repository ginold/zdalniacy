import React, { Component } from 'react';
import logo from '../../static/logo/logo-wfb-white.svg';
import './footer.scss';
import { Link } from 'react-router-dom';

import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';

class Footer extends Component {
  render() {
    return <footer className="footer">

      <div className="about footer-section">
        <h2>O nas</h2>
        <ul>
          <Link to=""><li>Kontakt</li></Link>
          <Link to=""><li>Historia</li></Link>
          <Link to=""><li>Praca</li></Link>
        </ul>
      </div>

      <div className="social-media footer-section">
        <img src={logo} alt="logo"></img>
        <p>Leżę i Pracuję 2019</p>
        <ul>
          <Link to=""><li><InstagramIcon /></li></Link>
          <Link to=""><li><FacebookIcon /></li></Link>
          <Link to=""><li><TwitterIcon /></li></Link>
        </ul>
      </div>

      <div className="work-offer footer-section">
        <h2>Praca</h2>
        <ul>
          <Link to=""><li>Dołącz do zespołu</li></Link>
          <Link to=""><li>Zobacz oferty pracy</li></Link>
          <Link to=""><li>Zobacz dostępne kursy</li></Link>
        </ul>
      </div>
    </footer>;
  }
}

export default Footer;
