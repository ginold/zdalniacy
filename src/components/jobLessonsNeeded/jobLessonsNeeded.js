import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LessonCard from '../lessonCard'
import Auth from '../../services/auth';

class JobLessonsNeeded extends Component {
  constructor(props) {
    super(props)
    this.state = { lessonsDone: false, job: props.job }
    console.log(props)
  }

  componentDidMount() {
    this.checkLessonsAccomplished()
  }

  checkLessonsAccomplished() {
    const lessonsNeeded = this.state.job.lessonsNeeded
    if (lessonsNeeded === 0) return true

    const lessonsAccomplished = Auth.getAccomplishedLessons()
    let check = []

    for (let lNeeded of lessonsNeeded) {
      for (let lAccomplished of lessonsAccomplished) {
        if (lNeeded._id === lAccomplished._id) check.push(lNeeded._id)
      }
    }
    check = [...new Set(check)]

    const areLessonsAccomplished = check.length === lessonsNeeded.length
    this.setState({ lessonsDone: areLessonsAccomplished })
    if (this.props.areLessonsAccomplished) {
      return this.props.areLessonsAccomplished(areLessonsAccomplished)
    }
  }
  render() {
    const { job, lessonsDone } = this.state

    return <>
      {job.lessonsNeeded.length > 0 && <section className="lessons-needed">
        <h2>Wymagane lekcje</h2>
        {job.lessonsNeeded.length > 0 && <>
          {!lessonsDone && <p>Aby zaaplikować, musisz ukończyć następujące lekcje:</p>}
          {lessonsDone && <p className="lessons-done">Ukończyłeś wszystkie wymagane lekcje. Możesz śmiało aplikować. Powodzenia!</p>}
          <div className="lessons-container">
            {job.lessonsNeeded.map((lesson, i) => {
              return <LessonCard lesson={lesson} key={i + 'lessoncard'} />
            })}
          </div>
        </>}
        {!job.lessonsNeeded.length && <p>Ta oferta pracy nie wymaga żadnych lekcji! Możesz aplikować już teraz.</p>}
      </section>}
    </>;
  }
}

JobLessonsNeeded.propTypes = {
  job: PropTypes.object
};

export default JobLessonsNeeded;
