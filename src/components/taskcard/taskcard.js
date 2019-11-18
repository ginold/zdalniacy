import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import PrimaryButton from '../primary-button/primary-button';
import './taskcard.scss';
import { Link } from 'react-router-dom';
import Auth from '../../services/auth';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Conditional from '../conditional/conditional';

class Taskcard extends Component {
  constructor(props) {
    super(props)
    this.task = props.task
    this.state = { isAccomplished: false }
  }
  componentDidMount() {
    this.checkIsAccomplished()
  }
  checkIsAccomplished = () => {
    for (let task of Auth.getUserData().accomplished.tasks) {
      if (this.task._id === task) this.setState({ isAccomplished: true })
    }
  }

  render() {
    const task = this.task;

    return <Link to={{
      pathname: `/${task.type}`,
      state: { id: task._id }
    }} className={"task-card " + (this.state.isAccomplished ? 'accomplished' : '')}>
      <Card className="task-card-root">
        {this.state.isAccomplished && <CheckCircleIcon className="check-icon" />}
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

        <Conditional if={!this.state.isAccomplished}>
          <p className="points">Zdobądź {task.points} punktów!</p>
          <div className="buttons">
            <PrimaryButton size="small" primary>
              {task.buttonText}
            </PrimaryButton>
          </div>
        </Conditional>
        <Conditional if={this.state.isAccomplished}>
          <b>Zadanie ukończone!</b>
        </Conditional>

      </Card>
    </Link>
  }
}

Taskcard.propTypes = {
  task: PropTypes.object
};

export default Taskcard;
