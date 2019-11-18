import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { Slide } from '@material-ui/core';
import PrimaryButton from '../primary-button'
import './previewJobButton.scss'
import { Link } from 'react-router-dom';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';
import JobProperties from '../jobProperties/jobProperties'
import JobLessonsNeeded from '../jobLessonsNeeded'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} mountOnEnter unmountOnExit timeout={350} />;
});

export default function PreviewJobButton(props) {
  const [open, setOpen] = React.useState(false);
  const job = props.job
  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <PrimaryButton outlined onClick={handleClickOpen}>
        Podgląd
      </PrimaryButton>
      <Dialog className="job-preview-dialog" open={open} onClose={handleClose} TransitionComponent={Transition}>
        <div className="preview-container">
          <IconButton onClick={() => setOpen(false)} className="close-button"><CancelIcon /></IconButton>
          <h1>{job.title}</h1>
          <JobProperties job={job} />
          <p>{job.description}</p>
          <JobLessonsNeeded job={job} />
          <div className="buttons">
            <Link to={`/work/job/${job._id}`}><PrimaryButton primary>Przejdź do oferty</PrimaryButton></Link>
            <PrimaryButton outlined green onClick={() => setOpen(false)}>Zamknij</PrimaryButton>
          </div>
        </div>
      </Dialog>
    </>
  );
}
