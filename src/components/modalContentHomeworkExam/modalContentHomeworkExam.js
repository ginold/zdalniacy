import React from 'react';
import PropTypes from 'prop-types';
import PrimaryButton from '../primary-button';
import { Fade } from '@material-ui/core';

function ModalContentHomeworkExam(props) {
  const finish = props.finish
  const type = props.type
  const handleClose = props.handleClose

  return (<Fade in={true} >
    <div className={" modal-window " + type}>
      <div className="modal-window-container">
        <h2 id="transition-modal-title">Wyślij zadania</h2>
        <div className="content">
          <h3>Czy na pewno chcesz wysłać rozwiązania do zadań?</h3>
          <div className="bottom-buttons">
            <PrimaryButton onClick={() => { handleClose(); finish() }} primary>Wyślij!</PrimaryButton>
            <PrimaryButton onClick={handleClose} outlined>Wróć</PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  </Fade>);
}

ModalContentHomeworkExam.propTypes = {
  type: PropTypes.string,
  finish: PropTypes.func,
  handleClose: PropTypes.func
};

export default ModalContentHomeworkExam;
