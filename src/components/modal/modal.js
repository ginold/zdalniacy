import React, { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import './modal.scss';
import ModalContentTest from '../components/modalContentTest'
import ModalContentApply from '../components/modalContentApply'
import ModalContentUnlockLesson from '../components/modalContentUnlockLesson'
import ModalContentDefault from '../components/modalContentDefault'
import ModalContentEndQuizzExam from '../components/modalContentEndQuizzExam';
import ModalContentHomeworkExam from '../components/modalContentHomeworkExam/modalContentHomeworkExam';
import ModalContentCantApplyYet from '../components/modalContentCantApplyYet';
import DialogContent from '@material-ui/core/DialogContent';

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
      <DialogContent>
        {type === 'apply' && <ModalContentApply
          type={type}
          sendApplication={props.sendApplication}
          handleClose={handleClose}
          job={props.object} />}

        {type === 'cantApply' && <ModalContentCantApplyYet
          handleClose={handleClose}
          type={type}
          lessonsNeeded={props.lessonsNeeded}
        />}

        {type === 'test' && <ModalContentTest
          type={type}
          finish={props.finish}
          handleClose={handleClose} />}

        {type === 'lesson' && <ModalContentUnlockLesson
          type={type}
          unlock={props.unlock}
          lesson={props.object}
          handleClose={handleClose}
        />}
        {type === 'quizzExam' && <ModalContentEndQuizzExam
          type={type}
          finish={props.finish}
          checkAreCorrectAnswers={props.checkAreCorrectAnswers}
          handleClose={handleClose}
        />}

        {type === 'homeworkExam' && <ModalContentHomeworkExam
          type={type}
          finish={props.finish}
          handleClose={handleClose}
        />}

        {type === 'default' && <ModalContentDefault
          type={type}
          open={open}
          modalContent={props.modalContent}
          handleClose={handleClose}
        />}
      </DialogContent>
    </Modal>
  );
}
