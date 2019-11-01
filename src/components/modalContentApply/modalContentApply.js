import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PrimaryButton from '../primary-button';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


function ModalContentApply(props) {
  const type = props.type

  const handleClose = props.handleClose
  const createApplicationObject = props.createApplicationObject
  const job = props.job

  const [application, setApplication] = useState({
    message: '', cv: {}
  })

  const handleChange = (name) => event => {
    setApplication({ ...application, [name]: event.target.value });
  }

  return (<div className={" modal-window " + type}>
    <h2 id="transition-modal-title">Wyślij aplikację</h2>
    <div className="content">
      <div className="grid">
        <div className="job-title">
          <b>Ogłoszenie</b>
          <p>{job.title}</p>
        </div>
        <div className="job-employer">
          <b>Pracodawca</b>
          <p>{job.company}</p>
        </div>
        <div className="job-upload-cv">
          <b>Twoje CV</b>
          <p className="upload">Format .pdf, .docx</p>
          <input
            accept="image/*"
            id="text-button-file"
            multiple
            type="file"
          />
          <label htmlFor="text-button-file">
            <Button className="upload-button" component="span">Wybierz CV</Button>
          </label>
        </div>
      </div>

      <div className="text-area">
        <p>Tu możesz wpisać swoją wiadomość do pracodawcy. To pole nie jest wymagane.</p>
        <TextField
          id="outlined-multiline-static"
          label="Wiadomość do pracodawcy"
          multiline
          rows="4"
          onChange={handleChange('message')}
          value={application.message}
          className="text-area-component"
          placeholder="Tu wpisz swój list motywacyjny"
          margin="normal"
          variant="outlined"
        />
      </div>
    </div> {/* .content */}
    <div className="bottom-buttons">
      <PrimaryButton text="Aplikuj!"
        onClick={() => createApplicationObject({ message: application.message, ...application }, job)} primary />
      <PrimaryButton text="Zamknij" onClick={handleClose} outlined />
    </div>
  </div>
  )
}

ModalContentApply.propTypes = {};

export default ModalContentApply;
