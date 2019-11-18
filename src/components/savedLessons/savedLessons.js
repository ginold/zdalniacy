import React, { Component } from 'react';
import Auth from '../../services/auth';
import './savedLessons.scss'
import Conditional from '../conditional/conditional';
import LessonCard from '../lessonCard'
import { connect } from 'react-redux'

class SavedLessons extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogged: Auth.isAuthenticated(),
      lessons: props.userData.saved.lessons
    }
  }
  render() {
    const { isLogged, lessons } = this.state

    return <section id="saved-lessons" className="main-content">
      <div className="lessons-saved-container">
        <h1>Zapisane lekcje</h1>
        <Conditional if={isLogged && lessons.length > 0}>
          <div className="jobs-saved-list">
            {lessons.map((lesson) => {
              return <LessonCard key={lesson._id} lesson={lesson} />
            })}
          </div>
        </Conditional>
        <Conditional if={isLogged && lessons.length === 0}>
          <p className="info">Nie masz zadnych zapisanych lekcji.</p>
          <p className="info">Tu znajdziesz lekcjie, które możesz zapisać do późniejszego obejrzenia.</p>
        </Conditional>
        {!isLogged && <p className="info">Musisz być zalogowany.</p>}
      </div>
    </section>;
  }
}

const mapStateToProps = state => {
  return { userData: state.userData }
}
export default connect(mapStateToProps)(SavedLessons);
