import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import TimelapseIcon from '@material-ui/icons/Timelapse';
import TodayIcon from '@material-ui/icons/Today';
import Moment from 'react-moment';
import './jobProperties.scss'
import 'moment/locale/pl';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';

class JobProperties extends Component {
  render() {
    const job = this.props.job

    return <div className="job-properties">
      <div className="date-added property">
        <TodayIcon />
        <Moment fromNow locale="pl" className="text">{job.createdAt}</Moment>
      </div>
      <div className="time property">
        <TimelapseIcon />
        <span className="text">{job.time}</span>
      </div>
      <div className="company property">
        <WorkOutlineIcon />
        <span className="text">{job.company}</span>
      </div>
      <div className="location property">
        <LocationOnIcon />
        <span className="text">{job.location}</span>
      </div>
    </div>;
  }
}

JobProperties.propTypes = {
  job: PropTypes.object
};

export default JobProperties;
