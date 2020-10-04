import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModalWindow from '../modal';
import LinearProgress from '@material-ui/core/LinearProgress';
import PrimaryButton from '../primary-button';
import Checkbox from '@material-ui/core/Checkbox';
import { Fade } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import './quizz.scss';
import { Link } from 'react-router-dom';

class Quizz extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checkedAnswers: {}, taskId: null, loading: true,
      modalOpen: false, step: 0, modalType: '', totalSteps: 0,
      questions: props.questions, lesson: props.lesson
    }
  }

  componentDidMount() {
    let checkedAnswers = {}
    let stepsCount = 0;
    for (let q of this.state.questions) {
      if (q.type && !this.state[q.type]) { // only the entry test has a q.type
        stepsCount++
        checkedAnswers[q.type] = []
      } else {
        checkedAnswers[stepsCount] = [] // checkedAnswer[question1] = []
        stepsCount++;
      }
    }
    this.setState({ checkedAnswers, totalSteps: stepsCount, loading: false })

    if (window.location.pathname === '/entry_test') {
      this.setState({ modalType: 'test' })
    } else {
      this.setState({ modalType: 'quizzExam' })
    }
  }
  showModal = () => {
    this.setState({ modalOpen: true })
  }
  closeModal = () => {
    this.setState({ modalOpen: false })
  }

  handleCheck = (type, answer) => {
    let checkedAnswers = this.state.checkedAnswers;
    let answers = this.state.checkedAnswers[type]
    if (answers.indexOf(answer) !== -1) { // remove answer
      answers.splice(answers.indexOf(answer))
    } else {
      answers.push(answer)
    }
    checkedAnswers[type] = answers
    this.setState(checkedAnswers)
  }
  nextStep = () => {
    const step = this.state.step + 1
    if (step < this.state.totalSteps) this.setState({ step })
  }
  prevStep = () => {
    const step = this.state.step - 1
    if (step >= 0) this.setState({ step })
  }
  finish = () => {
    this.props.finish(this.state.checkedAnswers)
  }
  checkAreCorrectAnswers = () => {
    const answers = this.state.checkedAnswers
    let i = 0;
    for (let question in answers) {
      const myAnswers = JSON.stringify(answers[question].sort())
      const corrAnswers = JSON.stringify(this.state.questions[i].correctAnswers.sort())
      const isCorrect = myAnswers === corrAnswers
      if (isCorrect) {
        i++
      } else {
        return false
      }
    }
    return true
  }
  render() {
    const q = this.state.questions[this.state.step]
    q.type = q.type ? q.type : this.state.step
    let answers = this.state.checkedAnswers;
    const lesson = this.state.lesson

    return <Fade in={!this.state.loading}>
      <div className="quizz-container" id="quizz">
        <div className="progress-info">
          <h2>Pytanie {this.state.step + 1} na {this.state.totalSteps}</h2>
        </div>
        <LinearProgress variant="determinate" className="progress"
          value={((this.state.step + 1) / this.state.totalSteps) * 100} />

        {lesson && <h2 className="lesson-title">{lesson.title}</h2>}
        <div className="test-container">

          <div className="question">
            <h2 className="question-title">{q.title}</h2>
            <div className="answers">
              {/* // answers[q.type] are undefined by 1st render */}
              {answers[q.type] && q.answers.map((answer, i) => {
                return <FormControlLabel key={i + 'answer'}
                  className="answer"
                  control={
                    <Checkbox
                      checked={answers[q.type].indexOf(answer.value) > -1}
                      onChange={() => { this.handleCheck(q.type, answer.value) }}
                      value="checkedB"
                      inputProps={{
                        'aria-label': 'secondary checkbox',
                      }} />
                  }
                  label={answer.text} />
              })}
            </div>
          </div>
          <div className="buttons">
            {lesson && <Link className="exit" to={`/education/courses/${lesson.courseType}/${lesson._id}`}><PrimaryButton outlined green>Wyjdź</PrimaryButton></Link>}
            {this.state.step > 0 && <PrimaryButton className="prev-step" outlined onClick={this.prevStep}>Cofnij</PrimaryButton>}
            {this.state.step < (this.state.totalSteps - 1) && <PrimaryButton primary className="next-step" onClick={this.nextStep}>Dalej</PrimaryButton>}
            {this.state.step === this.state.totalSteps - 1 && <PrimaryButton className="next-step" primary onClick={this.showModal}>Zakończ test!</PrimaryButton>}
          </div>
        </div>

        <ModalWindow isOpen={this.state.modalOpen} isClosed={this.closeModal} checkAreCorrectAnswers={this.checkAreCorrectAnswers} finish={this.finish} type={this.state.modalType}></ModalWindow>
      </div>
    </Fade>
  }
}

Quizz.propTypes = {
  questions: PropTypes.array
};

export default Quizz;
