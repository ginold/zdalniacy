import React from 'react';
import './header.scss';
import logo from '../../static/logo/logo.png';

import ProfileButton from '../profile-button/profile-button';
import PrimaryButton from '../primary-button/primary-button';
import MessagesButton from '../messages-button/messages-button';
import NotificationsButton from '../notifications-button/notifications-button';
import { Link, NavLink } from 'react-router-dom';
import Conditional from '../conditional/conditional';

import { connect } from 'react-redux'
import Auth from '../../auth';

function Header() {
  // const [target, setTarget] = React.useState(null)

  // const getTarget = () => {
  //   const headerEl = document.querySelector('#header')
  //   const mainEl = document.querySelector('main')
  //   console.log('rat')
  //   const handler = (entries) => {
  //     console.log(entries)
  //     if (!entries[0].isIntersecting) {
  //       headerEl.classList.add('enabled')
  //     } else {
  //       headerEl.classList.remove('enabled')
  //     }
  //   }
  //   // create the observer
  //   const observer = new window.IntersectionObserver(handler)
  //   // give the observer some dom nodes to keep an eye on
  //   observer.observe(mainEl)
  // }
  // useEffect(() => {
  //   if (!target) getTarget()
  // })

  return (
    <header id="header">
      <Link to="/">
        <img src={logo} alt="logo" className="logo"></img>
      </Link>
      <nav>
        <ul className="nav-links">
          <Conditional if={Auth.getUserType() === 'employer' && Auth.isAuthenticated()}>
            <li className="nav-link"><Link to="/addJobOffer"><PrimaryButton text="Dodaj ofertę" primary /></Link></li>
          </Conditional>
          <li className="nav-link"><NavLink to="/work" activeClassName="active-link"><span>Praca</span></NavLink></li>
          <li className="nav-link"><NavLink to="/social" activeClassName="active-link"><span>Społeczność</span></NavLink></li>
          <li className="nav-link"><NavLink to="/education/courses" activeClassName="active-link"><span>Edukacja</span></NavLink></li>

          <Conditional if={Auth.isAuthenticated()}>
            <li className="nav-link"><NavLink to="/tasks" activeClassName="active-link"><span>Zadania</span></NavLink></li>
            <li className="nav-link"><MessagesButton /></li>
            <li className="nav-link"><NotificationsButton /></li>
            <li className="nav-link profile-button"><ProfileButton /></li>
          </Conditional>

          <Conditional if={!Auth.isAuthenticated()}>
            <li className="nav-link"><Link to="/signup"><PrimaryButton text="Załóż konto" primary /></Link></li>
            <li className="nav-link" onClick={() => Auth.signIn()}><Link to="/login"><PrimaryButton text="Zaloguj się" /></Link></li>
          </Conditional>

        </ul>
      </nav>
    </header>
  );
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps)(Header);
