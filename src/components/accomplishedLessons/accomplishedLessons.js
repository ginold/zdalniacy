import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Conditional from '../conditional'
import LessonCard from '../lessonCard'
import Auth from '../../services/auth'

class AccomplishedLessons extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogged: Auth.isAuthenticated(),
      lessons: Auth.isAuthenticated() ? Auth.getAccomplishedLessons() : []
    }
  }
  render() {
    const isLogged = this.state.isLogged
    const lessons = this.state.lessons
    console.log(lessons)

    return <section id="saved-lessons" className="main-content">
      <div className="lessons-saved-container">
        <h1>Ukończone lekcje</h1>
        <Conditional if={isLogged && lessons.length > 0}>
          <div className="jobs-saved-list">
            {lessons.map((lesson, i) => {
              return <LessonCard key={i + '-lesson-card'}
                lesson={lesson}>
              </LessonCard>
            })}
          </div>
        </Conditional>
        <Conditional if={isLogged && lessons.length === 0}>
          <p className="info">Nie masz zadnych ukończonych lekcji.</p>
          <p className="info">Tu znajdziesz lekcjie, które ukończysz.</p>
        </Conditional>
        {!isLogged && <p className="info">Musisz być zalogowany.</p>}
      </div>
    </section>;
  }
}

AccomplishedLessons.propTypes = {};

export default AccomplishedLessons;
