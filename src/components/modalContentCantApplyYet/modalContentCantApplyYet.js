import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import PrimaryButton from '../primary-button';
import Fade from '@material-ui/core/Fade';
import LessonCard from '../lessonCard'
import Auth from '../../services/auth';

function ModalContentCantApplyYet(props) {
  const type = props.type
  const handleClose = props.handleClose
  const [lessonsToGo, setLessonsToGo] = React.useState([])
  const isAuthenticated = Auth.isAuthenticated()

  const filterLessonsNeeded = () => {
    const accomplishedLessons = Auth.getAccomplishedLessons()
    const lessonsNeeded = [...props.lessonsNeeded]

    if (isAuthenticated) {
      for (let i = lessonsNeeded.length - 1; i >= 0; i--) {
        for (let j = accomplishedLessons.length - 1; j >= 0; j--) {
          //console.log(lessonsNeeded[i], accomplishedLessons[j])
          if (lessonsNeeded[i]._id === accomplishedLessons[j]._id) {
            lessonsNeeded.splice(i, 1)
          }
        }
      }
    }
    setLessonsToGo(lessonsNeeded)
  }
  useEffect(() => {
    filterLessonsNeeded()
  }, [])

  return (<Fade in={true} >
    <div className={" modal-window " + type}>
      <div className="modal-window-container">

        <h2 id="transition-modal-title">Wyślij aplikację</h2>
        <div className="content">
          <h3>Nie można wysłać aplikacji!</h3>
          {isAuthenticated && <span>
            <p>Aby móc zaaplikować, musisz mieć ukończone wszystkie wymagane leckje.</p>
            <p>Do wysłania aplikacji brakuje Ci jeszcze:</p>

            <div className="lessons-needed">
              {lessonsToGo.map((lesson, i) => {
                return <LessonCard key={'lesson' + i} lesson={lesson} />
              })}
            </div>
          </span>}
          {!isAuthenticated && <p>Musisz by zalogowany.</p>}
        </div>
        <div className="bottom-buttons">
          <PrimaryButton onClick={handleClose} primary>
            <span>{isAuthenticated ? 'Ide się douczyć!' : 'OK!'}</span>
          </PrimaryButton>
        </div>
      </div>
    </div>
  </Fade>);
}

ModalContentCantApplyYet.propTypes = {
  type: PropTypes.string,
  handleClose: PropTypes.func,
};

export default ModalContentCantApplyYet;
