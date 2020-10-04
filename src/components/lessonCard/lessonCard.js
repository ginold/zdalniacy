import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import './lessonCard.scss';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import ModalWindow from '../modal';
import CardActionArea from '@material-ui/core/CardActionArea';
import Auth from '../../services/auth';
import { withRouter } from 'react-router-dom'
import Conditional from '../conditional/conditional';
import unlockedLessonsService from '../../services/unlockedLessonsService'
import { connect } from 'react-redux'
import SaveButton from '../saveButton/saveButton';
import PrimaryButton from '../primary-button';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import Zoom from '@material-ui/core/Zoom';
import { ReactComponent as TrophyIcon } from '../../icons/trophy.svg'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const BaseTooltip = (props) => {
  return <Tooltip placement="top" {...props} TransitionComponent={Zoom} enterDelay={500}
    className={'tooltip ' + props.classes.tooltip} title={props.title} />
}
const TopTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.9)',
    fontSize: 15,
  }
}))(BaseTooltip);


function LessonCard(props) {

  const checkIsUnlocked = () => {
    if (Auth.isAuthenticated()) {
      for (let i = 0; i < unlockedLessons.length; i++) {
        if (unlockedLessons[i] === lesson._id) return true
      }
    }
    return false;
  }
  const checkIsAccomplished = () => {
    if (Auth.isAuthenticated()) {
      for (let i = 0; i < accomplishedLessons.length; i++) {
        if (accomplishedLessons[i]._id === lesson._id) return true
      }
    }
    return false;
  }

  const lesson = props.lesson
  const points = props.points
  const unlockedLessons = Auth.getUnlockedLessons() || []
  const accomplishedLessons = Auth.getAccomplishedLessons() || []
  const [modalOpen, setModalOpen] = React.useState(false)
  const [isUnlocked, setIsUnlocked] = React.useState(checkIsUnlocked())
  const [isAccomplished] = React.useState(checkIsAccomplished())

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
        let data = Auth.getUserData()
        data.unlockedLessons.push(lesson._id)  // remove in future
        data.unlocked.lessons.push(lesson._id) // keep this one
        Auth.setUserData(data)
        Auth.addPoints(-lesson.cost)
        Auth.updateUser()
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
      <Card className="lesson-card">

        <CardActionArea className="lesson-card-container" onClick={goTo}>
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
              <Typography variant="body2" color="textSecondary" component="p" className="lesson-description">
                {lesson.description}
              </Typography>

              <div className="properties">
                <Conditional if={isUnlocked && lesson.cost !== 0}>
                  <div className="property can-unlock">
                    <LockOpenIcon />
                  </div>
                </Conditional>

                <TopTooltip title="Punkty do zdobycia">
                  <div className="property"><TrophyIcon className="trophy-icon MuiSvgIcon-root" /><p>{lesson.reward} pkt</p></div>
                </TopTooltip>

                <Conditional if={!isUnlocked}>
                  {lesson.cost > 0 ?
                    (<TopTooltip title="Koszt lekcji w punktach">
                      <div className={`property ${lesson.cost <= points ? 'can-unlock' : null}`}>
                        <LockIcon className="cost-icon" /> <p>{lesson.cost} pkt</p>
                      </div>
                    </TopTooltip>)
                    : (<div className="property"><p className="free">ZA DARMO</p></div>)}
                </Conditional>

                <TopTooltip title="Długość lekcji">
                  <div className="property"><WatchLaterIcon className="time-icon" /><p>{getHours(lesson.duration)}</p></div>
                </TopTooltip>


                {isAccomplished && <TopTooltip title="Lekcja ukończona">
                  <div className="property"><CheckCircleIcon className="check-icon" /></div>
                </TopTooltip>}
              </div>
            </div>
          </CardContent>

        </CardActionArea>
        <div className="buttons">
          <SaveButton object={lesson} type="lessons" />
          <PrimaryButton primary onClick={goTo} className="unlock-button">{(!isUnlocked && lesson.cost !== 0) ? <><LockOpenIcon />Odblokuj</> : 'Oglądaj'}</PrimaryButton>
        </div>
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
