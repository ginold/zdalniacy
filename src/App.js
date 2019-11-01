import React from 'react';
import './App.scss';
import Header from './components/header';
import Main from './components/main';
import Sidemenu from './components/sidemenu';
import Login from './components/login';
import { ConnectedRouter } from 'connected-react-router'
import { connect } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom';
import Conditional from './components/conditional/conditional';
import Signup from './components/signup/signup';
import Work from './components/work/work';
import Education from './components/education';
import Social from './components/social';
import Messages from './components/messages'
import LandingPage from './components/landingPage'
import Dashboard from './components/dashboard'
import JobOfferDetails from './components/jobOfferDetails'
import posed, { PoseGroup } from 'react-pose';
import Settings from './components/settings';
import Course from './components/course';
import Test from './components/test';

import AccessibilityFab from './components/accessibility-fab';
import MessageFab from './components/message-fab';
import LessonDetails from './components/lessonDetails/lessonDetails';

// mapped properties at bottom
const App = ({ history, pathname, isLogged }) => {
  // Let the document know when the mouse is being used
  // for keyboard / mouse focus navigation (accessibility)
  document.body.addEventListener('mousedown', function () {
    document.body.classList.add('using-mouse');
  });
  document.body.addEventListener('keydown', function () {
    document.body.classList.remove('using-mouse');
  });
  let path = pathname.slice(1).split('/')[0]

  let SignInUpContainer = posed.div({
    enter: { opacity: 1, delay: 200, beforeChildren: true, transition: { duration: 200 } },
    exit: { opacity: 0 }
  });
  const addClassToRoot = () => {
    document.getElementById('root').className = path + " App";
  }
  addClassToRoot()

  return (
    <ConnectedRouter history={history}>

      <Conditional if={pathname !== '/login' && pathname !== '/signup'}>
        <Header></Header>
      </Conditional>
      <Conditional if={pathname !== '/' || (pathname === '/' && isLogged)}>
        <Sidemenu />
      </Conditional>

      <Main>
        <Switch>
          <Route exact path="/">
            {isLogged ? <Redirect to="/dashboard" /> : <LandingPage />}
          </Route>
          <Route exact path="/dashboard">
            {!isLogged ? <Redirect to="/login" /> : <Dashboard />}
          </Route>
          <Route path="/test" component={Test} />
          <Route path="/work" exact component={Work} />
          <Route path="/work/job/:title" component={JobOfferDetails} />

          <Route path="/social" component={Social} />
          <Route path="/education/courses" exact component={Education} />
          <Route path="/education/courses/:type" exact component={Course} />
          <Route path="/education/courses/:type/:lesson" component={LessonDetails} />

          <Route path="/social/messages" component={Messages} />
          <Route path="/settings" exact component={Settings} />

          <Conditional if={pathname === '/signup' || pathname === '/login'}>
            <PoseGroup>
              <SignInUpContainer className="signup-login-animation-container" key={Math.random()}>
                <Route path="/signup" component={Signup} key="signup" />
                <Route path="/login" component={Login} key="login" />
              </SignInUpContainer>
            </PoseGroup>
          </Conditional>

        </Switch>
        <div className="floating-buttons">
          <AccessibilityFab />
          <MessageFab />
        </div>
      </Main>

    </ConnectedRouter >
  );
}
const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
  isLogged: state.isLogged
})

export default connect(mapStateToProps)(App);
