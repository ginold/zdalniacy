import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import './lessonCard.scss';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock'; import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import ModalWindow from '../../modal';
import CardActionArea from '@material-ui/core/CardActionArea'; import Auth from '../../services/auth';
import { withRouter } from 'react-router-dom'
import Conditional from '../conditional/conditional';
import unlockedLessonsService from '../../services/unlockedLessonsService'
import { connect } from 'react-redux'

function LessonCard(props) {

  const checkIsUnlocked = () => {
    if (Auth.isAuthenticated()) {
      for (let i = 0; i < unlockedLessons.length; i++) {
        if (unlockedLessons[i] === lesson._id) return true
      }
    } else {
      return false;
    }
  }

  const lesson = props.lesson
  const points = props.points
  const unlockedLessons = Auth.getUnlockedLessons() || []
  const [modalOpen, setModalOpen] = React.useState(false)
  const [isUnlocked, setIsUnlocked] = React.useState(checkIsUnlocked())

  const getHours = (duration) => {
    return Math.round(duration / 60) + ' godziny';
  }

  const goTo = () => {
    if (lesson.cost === 0 || isUnlocked) {
      goToLessonView()
    } else {
      showUnlockLessonModal()
    }
  }
  const goToLessonView = () => {
    props.history.push(`/education/courses/${lesson.courseType}/${lesson._id}`)
  }
  const unlock = () => {
    unlockedLessonsService.unlockLesson(Auth.getUserId(), lesson._id)
      .then(() => {
        closeModal()
        setIsUnlocked(true)
        Auth.addPoints(-lesson.cost)
      })
      .catch(err => console.log(err))
  }
  const showUnlockLessonModal = () => {
    setModalOpen(true)
  }
  const closeModal = () => {
    setModalOpen(false)
  }

  return (
    <>
      <Card className="lesson-card" onClick={goTo}>
        <CardActionArea className="lesson-card-container">
          <CardMedia
            className="lesson-card-image"
            image={"/images/lessons/" + lesson.imgUrl + ".png"}
            title={lesson.title}
          />
          <CardContent className="lesson-card-content-root">
            <div className="lesson-card-content">
              <Typography gutterBottom variant="h5" component="h2" className="lesson-title">
                {lesson.title}
              </Typography>
              <Typography component="p" className="lesson-description">
                {lesson.description}
              </Typography>
              <div className="properties">
                <div className="property"><HourglassEmptyIcon /><p>{getHours(lesson.duration)}</p></div>
                <Conditional if={!isUnlocked}>
                  <div className={`property ${lesson.cost <= points ? 'can-unlock' : null}`}>
                    {lesson.cost > 0 ? (<><LockIcon /> <p>{lesson.cost} punktów</p></>) : (<p className="free">ZA DARMO</p>)}
                  </div>
                </Conditional>
                <Conditional if={isUnlocked && lesson.cost !== 0}>
                  <div className="property can-unlock">
                    <LockOpenIcon />
                  </div>
                </Conditional>
              </div>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>

      <ModalWindow isOpen={modalOpen} isClosed={closeModal}
        type="lesson" object={lesson} unlock={unlock}></ModalWindow>
    </>
  );
}
const mapStateToProps = state => {
  return { points: state.userData.points }
}

export default withRouter(connect(mapStateToProps)(LessonCard))
