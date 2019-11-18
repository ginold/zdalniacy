import React, { Component } from 'react';
import './lessonDetails.scss';
import TableOfContents from '../tableOfContents'
import LessonTabs from '../lessonTabs/lessonTabs';
import lessonService from '../../services/lessonService'
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link } from 'react-router-dom';
import { ReactComponent as TrophyIcon } from '../../icons/trophy.svg'
import Spinner from '../spinner'
import Fade from '@material-ui/core/Fade';
import PrimaryButton from '../primary-button';
import SaveButton from '../saveButton/saveButton';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import jobService from '../../services/jobService';
import JobOfferCard from '../jobOfferCard';

class LessonDetails extends Component {
  constructor(props) {
    super(props)
    this.state = { lesson: props.location.state, error: false, loading: true, jobs: [] }
  }
  componentDidMount() {
    const lesson = this.getLesson()
    const jobs = jobService.getAll()

    Promise.all([lesson, jobs]).then(res => {
      this.setState({ lesson: res[0] })
      this.getRelatedJobs(res[1])
    })
  }

  getRelatedJobs = (jobs) => {
    let relatedJobs = []
    for (let job of jobs) {
      for (let lesson of job.lessonsNeeded) {
        if (lesson._id === this.state.lesson._id) relatedJobs.push(job)
      }
    }
    this.setState({ jobs: relatedJobs, loading: false })
  }

  getLesson = () => {
    return new Promise((resolve, reject) => {
      if (!this.props.location.state) {
        let id = this.props.location.pathname.split("/")[4]
        lessonService.getLessonById(id)
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            this.setState({ lesson: null, error: err })
            reject(err)
          })
      } else {
        resolve(this.state.lesson)
      }
    })
  }
  handleClick = () => {

  }

  render() {
    const { lesson, error, loading, jobs } = this.state
    console.log(this.state)
    return <>
      <section id="lesson-details" className="main-content">
        <Fade in={!loading}>
          <div>
            {lesson && <div className="lesson-details-container">
              <div className="header">
                <Breadcrumbs separator="›" aria-label="breadcrumb" className="breadcrumbs">
                  <Link to="/education/courses">Kursy</Link>
                  <Link to={`/education/courses/${lesson.courseType}`}>{lesson.courseType}</Link>
                  <p>lekcja</p>
                </Breadcrumbs>

                <h1 className="lesson-title">{lesson.title}</h1>
                <div className="buttons">
                  <Link to={`/education/courses/${lesson.courseType}`}><PrimaryButton outlined>Wróć</PrimaryButton></Link>
                  <SaveButton object={lesson} type="lessons" />
                  <div className="go-to-test">
                    <p>Zadania już zrobione?</p>
                    <Link to={`/exams/lesson/${lesson._id}`}><PrimaryButton primary>Przejdź do testu!</PrimaryButton></Link>
                  </div>
                </div>
              </div>

              <div className="lesson-info">
                <div className="info">
                  <TrophyIcon className="trophy-icon MuiSvgIcon-root" />
                  <p>Do zdobycia <b>{lesson.reward}</b> punktów!</p>
                </div>
                <div className="info">
                  <SignalCellularAltIcon></SignalCellularAltIcon>
                  <p>Poziom: <b>łatwy</b></p>
                </div>
                <div className="info">
                  <WatchLaterIcon className="time-icon" />
                  <p>Długość: <b>{lesson.duration} minut</b></p>
                </div>
                <div className="info">
                  <PlaylistAddCheckIcon />
                  <p>{lesson.tasks.length} zadania</p>
                </div>
              </div>

              <div className="video" style={{ backgroundImage: `url(/images/lessons/${lesson.imgUrl}.png` }}>
              </div>
              <TableOfContents chapters={lesson.chapters} />
              <LessonTabs lesson={lesson} />

              {<div className="related-jobs">
                <h3>Powiązane oferty pracy</h3>
                {jobs.map((job, i) => {
                  return <JobOfferCard key={i + 'job'} jobOffer={job} />
                })}
              </div>}
            </div>}

            {!lesson && !loading && <h1>Nie znaleziono lekcji.</h1>}
            {error && <h2>{error}</h2>}
          </div>
        </Fade>

        <Spinner loading={loading} className="top" color="dark" />
      </section>
    </>

  }
}

export default LessonDetails;
