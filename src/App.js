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
import Settings from './components/settings';
import Course from './components/course';
import EntryTest from './components/entryTest';
import SavedJobs from './components/savedJobs';
import SavedLessons from './components/savedLessons';
import JobsApplied from './components/jobsApplied';
import NotFound from './components/notFound';

import AccessibilityFab from './components/accessibility-fab';
import MessageFab from './components/message-fab';
import LessonDetails from './components/lessonDetails/lessonDetails';
import Auth from './services/auth';
import Exam from './components/exam/exam';
import AccomplishedLessons from './components/accomplishedLessons/accomplishedLessons';

// mapped properties at bottom
const App = ({ history, pathname, isLogged }) => {
  Auth.signInIfRemembered()

  // Let the document know when the mouse is being used
  // for keyboard / mouse focus navigation (accessibility)
  document.body.addEventListener('mousedown', function () {
    document.body.classList.add('using-mouse');
  });
  document.body.addEventListener('keydown', function () {
    document.body.classList.remove('using-mouse');
  });
  let path = pathname.slice(1).split('/')[0]

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
          <Route exact path="/dashboard/nope">
            <Redirect to="/dashboard" />
          </Route>

          <Route path="/entry_test" exact component={EntryTest} />
          <Route path="/work/jobOffers" component={Work} />
          <Route path="/work/recommended" component={props => <Work {...props} />} />
          <Route path="/work/job/:title" component={JobOfferDetails} />
          <Route path="/work/jobsSaved" component={SavedJobs} />
          <Route path="/work/jobsApplied" component={JobsApplied} />

          <Route path="/social" component={Social} />

          <Route path="/education/courses" exact component={Education} />
          <Route path="/education/courses/:type" exact component={Course} />
          <Route path="/education/courses/:type/:lesson" component={LessonDetails} />
          <Route path="/education/lessonsSaved" component={SavedLessons} />
          <Route path="/education/accomplishedLessons" component={AccomplishedLessons} />

          <Route path="/social/messages" component={Messages} />
          <Route path="/settings" exact component={Settings} />

          <Route path="/exams/lesson/:id" component={Exam} />

          <Route path="/signup" exact component={Signup} key="signup" />
          <Route path="/login" exact component={Login} key="login" />

          <Route path="/not_found" exact component={NotFound} />
          <Redirect from="*" to="/not_found" />

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


    // "serve": "concurrently \"react-scripts start\" \"nodemon ./backend/server.js\"",
    // "start": "react-scripts start",
    // "build": "react-scripts build",
    // "test": "react-scripts test",
    // "eject": "react-scripts eject"
