import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PrimaryButton from '../components/primary-button';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


function ModalContentApply(props) {
  const title = props.title
  const type = props.type

  const handleClose = props.handleClose

  return (<div className={" modal-window " + type}>
    <h2 id="transition-modal-title">{title}</h2>
    <div className="content">
      qowenq
    </div> {/* .content */}
    <div className="bottom-buttons">
      <PrimaryButton text="Zamknij" onClick={handleClose} outlined />
    </div>
  </div>
  )
}

ModalContentApply.propTypes = {};

export default ModalContentApply;
