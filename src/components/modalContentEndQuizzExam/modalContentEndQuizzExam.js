import React from 'react';
import PropTypes from 'prop-types';
import PrimaryButton from '../primary-button';
import Fade from '@material-ui/core/Fade';

function ModalContentEndQuizzExam(props) {
  const type = props.type
  const handleClose = props.handleClose
  const finish = props.finish
  const [isCorrect, setIsCorrect] = React.useState(null)

  const checkCorrectAnswers = () => {
    setIsCorrect(props.checkAreCorrectAnswers())
  }

  return (<Fade in={true}>
    <div className={" modal-window " + type}>
      <div className="modal-window-container">

        <h2 id="transition-modal-title">Koniec testu</h2>
        {isCorrect == null &&
          <div className="content">
            <h3>Test dobiegł końca!</h3>
            <p>Czy jesteś pewien, że chcesz zakończyć test?</p>
            <div className="bottom-buttons">
              <PrimaryButton onClick={checkCorrectAnswers} primary>OK!</PrimaryButton>
              <PrimaryButton onClick={handleClose} outlined>Wróć do testu</PrimaryButton>
            </div>
          </div>}

        {isCorrect === false &&
          <div className="content">
            <h3>Uuups</h3>
            <p>Gdzieś leży niepoprawna odpowiedź!</p>
            <div className="bottom-buttons">
              <PrimaryButton onClick={handleClose} primary>Wróć do odpowiedzi</PrimaryButton>
            </div>
          </div>}

        {isCorrect &&
          <div className="content">
            <h3>Yeah!</h3>
            <p>Poprawnie odpowiedziałeś na wszystkie pytania!</p>
            <div className="bottom-buttons">
              <PrimaryButton onClick={finish} primary>Zakończ quizz</PrimaryButton>
            </div>
          </div>}

      </div>
    </div>
  </Fade>);
}

ModalContentEndQuizzExam.propTypes = {
  type: PropTypes.string,
  handleClose: PropTypes.func,
  finish: PropTypes.func
};

export default ModalContentEndQuizzExam;
