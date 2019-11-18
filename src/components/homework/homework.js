import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './homework.scss'
import Paper from '@material-ui/core/Paper';
import PrimaryButton from '../primary-button';
import { Link } from 'react-router-dom';
import ModalWindow from '../../modal';

class Homework extends Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.finish = props.finish
    this.state = { tasks: props.tasks, lesson: props.lesson, modalOpen: false }
  }
  showModal = () => {
    this.setState({ modalOpen: true })
  }
  closeModal = () => {
    this.setState({ modalOpen: false })
  }

  render() {
    const { tasks, lesson, modalOpen } = this.state

    return <section id="homework">
      <div className="homework-container">
        <div className="header-div">
          <h1 className="header">Zadania egzaminacyjne</h1>
          <Link to={`/education/courses/${lesson.courseType}/${lesson._id}`}><PrimaryButton outlined>Wróć</PrimaryButton></Link>
        </div>
        <div className="lesson-title"><p>Lekcja:</p> <h3>{lesson.title}</h3></div>
        {tasks.map((task, i) => {
          return <Paper className="task" key={i + 'task'}>
            <h2>{`${(i + 1)}. ${task.title}`}</h2>
            <p>{task.description}</p>
            {task.imgUrl && <img src={`/images/exams/${task.imgUrl}.png`} alt="task" />}
          </Paper>
        })}
        <Paper className="solution task">
          <h2>Rozwiązania</h2>
          <p>Załącz rozwiązania w formacie .zip do powyższych zadań.</p>
          <p>Nasza ekipa sprawdzi je i da Ci znać jak najprędzej.</p>
          <div className="buttons">
            <PrimaryButton outlined green>Załącz</PrimaryButton>
            <PrimaryButton primary onClick={this.showModal}>Zatwierdź</PrimaryButton>
          </div>
        </Paper>
      </div>
      <ModalWindow isOpen={modalOpen} isClosed={this.closeModal}
        type="homeworkExam" finish={this.finish}></ModalWindow>

    </section>;
  }
}

Homework.propTypes = {
  tasks: PropTypes.array
};

export default Homework;
