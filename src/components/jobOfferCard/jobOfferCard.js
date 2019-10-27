import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import './jobOfferCard.scss';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import TimelapseIcon from '@material-ui/icons/Timelapse';
import TodayIcon from '@material-ui/icons/Today';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

function JobOfferCard(props) {
  const job = props.jobOffer

  return (
    <Link to={{
      pathname: '/work/job/' + job._id, // TODO replace %%
      state: job
    }} className="job-offer-card">
      <Card className="card-root">

        <CardActionArea>
          <div className="job-offer-top">
            <CardMedia className="job-offer-img" image={"/images/company/" + job.company + ".png"} title={`oferta pracy ${job.title}`}></CardMedia>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2" className="title">
                {job.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {job.description}
              </Typography>
            </CardContent>

            {/* <CardActions>
              <Button size="small" color="primary">
                Learn More
              </Button>
            </CardActions> */}
          </div>

          <div className="job-offer-bottom">
            <div className="date-added">
              <TodayIcon />
              <Moment fromNow className="text">{job.createdAt}</Moment>
            </div>
            <div className="location">
              <LocationOnIcon />
              <span className="text">{job.location}</span>
            </div>
            <div className="time">
              <TimelapseIcon />
              <span className="text">{job.time}</span>
            </div>
          </div>
        </CardActionArea>

      </Card>
    </Link>
  );
}

export default JobOfferCard;