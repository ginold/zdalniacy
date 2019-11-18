import React from 'react';
import PropTypes from 'prop-types';
import PrimaryButton from '../primary-button';
import Fade from '@material-ui/core/Fade';

function ModalContentDefault(props) {
  const type = props.type
  const handleClose = props.handleClose
  const content = { ...props.modalContent }

  return (<Fade in={true}>
    <div className={" modal-window " + type}>
      <div className="modal-window-container">

        <h2 id="transition-modal-title">{content.header}</h2>
        <div className="content">
          <h3>{content.title}</h3>
          <p>{content.text}</p>
          <div className="bottom-buttons">
            <PrimaryButton onClick={handleClose} primary>OK!</PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  </Fade>);
}

ModalContentDefault.propTypes = {
  type: PropTypes.string,
  handleClose: PropTypes.func,
};

export default ModalContentDefault;
