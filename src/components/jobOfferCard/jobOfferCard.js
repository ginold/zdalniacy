import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import './jobOfferCard.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SaveButton from '../saveButton/saveButton';
import PreviewJobButton from '../previewJobButton/previewJobButton';
import JobProperties from '../jobProperties/jobProperties'

function JobOfferCard(props) {
  const job = props.jobOffer

  return (
    <Card className="job-offer-card">
      <Link to={{
        pathname: '/work/job/' + job._id, // TODO replace %%
        state: job
      }} className="job-offer-card-link">

        <CardActionArea className="job-offer-card-action-area">
          <CardMedia className="job-offer-img" image={"/images/company/" + job.company + ".png"} title={`oferta pracy ${job.title}`}></CardMedia>
          <CardContent className="job-offer-card-content-root">

            <Typography gutterBottom variant="h5" component="h2" className="title">
              {job.title}
            </Typography>
            <JobProperties job={job} />

            <Typography variant="body2" color="textSecondary" component="p" className="job-description">
              {job.description}
            </Typography>
          </CardContent>

        </CardActionArea>
      </Link>
      <CardActions className="card-actions">
        <SaveButton object={job} type="jobs" />
        <PreviewJobButton job={job} />
      </CardActions>
    </Card>
  );
}

JobOfferCard.propTypes = {
  jobOffer: PropTypes.object
};

export default JobOfferCard;