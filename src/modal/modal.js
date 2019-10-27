import React, { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import './modal.scss';
import PrimaryButton from '../components/primary-button';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ModalContentTest from '../components/modalContentTest'

export default function ModalWindow(props) {

  const [open, setOpen] = useState(false);
  const [application, setApplication] = useState({
    message: '', cv: {}
  })

  useEffect(() => {
    setOpen(props.isOpen)
  }, [props.isOpen])

  const handleClose = () => {
    setOpen(false);
    props.isClosed()
  };
  const handleChange = (name) => event => {
    console.log(event.target.value)
    setApplication({ ...application, [name]: event.target.value });
  }


  const type = props.type
  const title = props.title;
  const job = props.object || {}

  const createApplicationObject = (application) => {
    let a = { user: {}, job: job, ...application }
    props.sendApplication(a)
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >

      <Fade in={open}>
        <div>
          {type === 'apply' && <div className={" modal-window " + type}>
            <h2 id="transition-modal-title">{title}</h2>
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
                onClick={() => createApplicationObject({ message: application.message })} primary />
              <PrimaryButton text="Zamknij" onClick={handleClose} outlined />
            </div>
          </div>}

          {type === 'test' && <ModalContentTest type={type} answers={props.object} handleClose={handleClose} />}
        </div>
      </Fade>
    </Modal>
  );
}
