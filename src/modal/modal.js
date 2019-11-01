import React, { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import './modal.scss';
import ModalContentTest from '../components/modalContentTest'
import ModalContentApply from '../components/modalContentApply'
import ModalContentUnlockLesson from '../components/modalContentUnlockLesson'

export default function ModalWindow(props) {

  const [open, setOpen] = useState(false);
  const type = props.type

  useEffect(() => {
    setOpen(props.isOpen)
  }, [props.isOpen])

  const handleClose = () => {
    setOpen(false);
    props.isClosed()
  };

  const createApplicationObject = (application, job) => {
    let a = { user: {}, job, ...application }
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
          {type === 'apply' && <ModalContentApply
            type={type}
            createApplicationObject={createApplicationObject}
            handleClose={handleClose}
            job={props.object} />}

          {type === 'test' && <ModalContentTest
            type={type}
            answers={props.object}
            handleClose={handleClose} />}

          {type === 'lesson' && <ModalContentUnlockLesson
            type={type}
            unlock={props.unlock}
            lesson={props.object}
            handleClose={handleClose}
          />}
        </div>
      </Fade>
    </Modal>
  );
}
