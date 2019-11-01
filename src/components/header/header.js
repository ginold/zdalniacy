import React, { useState, useEffect } from 'react';
import './header.scss';
import logo from '../../static/logo/logo.png';

import ProfileButton from '../profile-button/profile-button';
import PrimaryButton from '../primary-button/primary-button';
import MessagesButton from '../messages-button/messages-button';
import NotificationsButton from '../notifications-button/notifications-button';
import { Link, NavLink } from 'react-router-dom';
import Conditional from '../conditional/conditional';

import { connect } from 'react-redux'
import Auth from '../../services/auth';
import LoginButton from '../loginButton/loginButton';

function Header(props) {
  const [headerRef] = useState(React.createRef())
  const pathname = props.router.location.pathname;
  const isLogged = props.isLogged

  // set box-shadow FIX IT some day pls
  useEffect(() => {
    if (pathname.indexOf("work/job") > -1 && headerRef != null) {
      headerRef.current.style.boxShadow = "2px 2px 2px #cbcbcb"
    } else {
      headerRef.current.style.boxShadow = "";
    }
  }, [headerRef, pathname])

  return (
    <header id="header" ref={headerRef}>
      <Link to="/">
        <img src={logo} alt="logo" className="logo"></img>
      </Link>
      <nav>
        <ul className="nav-links">
          <Conditional if={Auth.getUserType() === 'employer' && isLogged}>
            <li className="nav-link"><Link to="/addJobOffer"><PrimaryButton text="Dodaj ofertę" primary /></Link></li>
          </Conditional>
          <li className="nav-link"><NavLink to="/work" activeClassName="active-link"><span>Praca</span></NavLink></li>
          <li className="nav-link"><NavLink to="/social" activeClassName="active-link"><span>Społeczność</span></NavLink></li>
          <li className="nav-link"><NavLink to="/education/courses" activeClassName="active-link"><span>Edukacja</span></NavLink></li>

          <Conditional if={isLogged}>
            <li className="nav-link"><NavLink to="/tasks" activeClassName="active-link"><span>Zadania</span></NavLink></li>
            <li className="nav-link"><MessagesButton /></li>
            <li className="nav-link"><NotificationsButton /></li>
            <li className="nav-link profile-button"><ProfileButton /></li>
          </Conditional>

          <Conditional if={!isLogged}>
            <li className="nav-link">
              <Link to={{
                pathname: "/signup",
                state: { from: pathname }
              }}>
                <PrimaryButton primary>Załóż konto</PrimaryButton>
              </Link></li>
            <li className="nav-link"><LoginButton outlined /></li>
          </Conditional>

        </ul>
      </nav>
    </header>
  );
}

const mapStateToProps = (state) => ({
  router: state.router,
  isLogged: state.isLogged
})

export default connect(mapStateToProps)(Header);
