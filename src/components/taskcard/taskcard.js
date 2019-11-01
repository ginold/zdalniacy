import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import PrimaryButton from '../primary-button/primary-button';
import './taskcard.scss';
import { Link } from 'react-router-dom';

class Taskcard extends Component {
  constructor(props) {
    super(props)
    this.task = props.task
  }
  render() {
    const task = this.task;

    return <Link to={`/${task.path}`} className="task-card">
      <Card className="task-card-root">
        <CardMedia
          className="task-img"
          image={`/images/${task.imgUrl}.jpg`}
          title={task.title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {task.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {task.description}
          </Typography>
        </CardContent>
        <p className="points">Zdobądź {task.points} punktów!</p>
        <div className="buttons">
          <PrimaryButton size="small" primary>
            {task.buttonText}
          </PrimaryButton>
        </div>
      </Card>
    </Link>
  }
}

Taskcard.propTypes = {
  task: PropTypes.object
};

export default Taskcard;
