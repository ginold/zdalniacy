import React from 'react';
import PropTypes from 'prop-types';
import PrimaryButton from '../primary-button';
import Auth from '../../services/auth';
import Conditional from '../conditional/conditional';
import LoginButton from '../loginButton/loginButton';

function ModalContentUnlockLesson(props) {
  const type = props.type
  const handleClose = props.handleClose
  const lesson = props.lesson
  const logged = Auth.isAuthenticated()
  const points = Auth.getPoints()

  return (
    <div className={"modal-window " + type}>
      <h2 id="transition-modal-title">Odblokuj kurs</h2>
      <div className="content">
        <Conditional if={!logged}>
          <p>Musisz być zalogowany, aby odblokować kurs.</p>
        </Conditional>
        <Conditional if={logged && points < lesson.cost}>
          <h3>Masz za mało punktów.</h3>
          <p>Zdobądź je wszystkie!</p>
        </Conditional>
        <Conditional if={logged && points >= lesson.cost}>
          <p>Czy na pewno chcesz odblokować <b>{lesson.title}</b> za <b>{lesson.cost}</b> punktów ?</p>
        </Conditional>
      </div>
      <div className="bottom-buttons">
        {!logged && <LoginButton primary />}
        {logged && points >= lesson.cost && <PrimaryButton onClick={props.unlock} primary>Odblokuj</PrimaryButton>}
        <PrimaryButton onClick={handleClose} outlined>Zamknij</PrimaryButton>
      </div>
    </div>
  );
}

ModalContentUnlockLesson.propTypes = {
  type: PropTypes.string,
  unlock: PropTypes.func,
  lesson: PropTypes.object,
  handleClose: PropTypes.func
};

export default ModalContentUnlockLesson;
