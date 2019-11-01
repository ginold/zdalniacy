import React, { Component } from 'react';
import './test.scss';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PrimaryButton from '../primary-button';
import { Fade } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import ModalWindow from '../../modal';

var questionss = [
  {
    title: "Jakie są twoje zainteresowania?", type: "interests", answers: [
      "Film", "Technologie", "Języki obce", "Reklama", "Informatyka", "Design"]
  },
  {
    title: "Na jakim portalu spędzasz najwięcej czasu?", type: "favoritePortals", answers: [
      "Facebook", "Youtube", "Instagram", "Strony z kursami", "Blogi", "Portale informacyjne"]
  },
  {
    title: "Jaką forme pracy preferujesz?", type: "workType", answers: [
      "Praca samodzielna, zdalna.", "Praca w grupie, zdalna.", "Wolę mieć konkretną listę zadań i kontakt z mentorem.", "Praca samodzielna, mogę się przemieszczać.", "Praca w grupie, mogę się przemieszczać."]
  },
  {
    title: "Czy masz już doświadczenie zawodowe?", type: "jobExperience", answers: [
      "Nie mam, szukam swojej pierwszej pracy.", "Tak, ale mam niewielkie doświadczenie (mniej niż rok).", "Tak, dłużej niż rok.", "Jestem specjalistą (ponad 5 lat)."]
  },
  {
    title: "Ile godzin tygodniowo możesz pracować?", type: "hoursAvailable", answers: [
      "10", "20", "40", "80+"], other: { text: "Wpisz:", type: "input-text" }
  },
  {
    title: "Jakie masz cechy?", type: "features", answers: [
      "Jestem kreatywny.", "Dobrze liczę, lubie tabelki.", "Dobrze rysuję.", "Mam dobry słuch."]
  }
]
class Test extends Component {
  constructor(props) {
    super(props)
    this.questions = questionss
    this.initState = this.initState.bind(this)
    this.initState()
  }

  initState = () => {
    // will look like {checkedanswers[interests].answers["technology"]}
    let checkedAnswers = {}
    this.state = { checkedAnswers: {} }
    let stepsCount = 0;
    for (let q of this.questions) {
      if (!this.state[q.type]) {
        stepsCount++
        checkedAnswers[q.type] = { answers: [], title: q.title }
        this.state = { checkedAnswers: checkedAnswers, step: 0, totalSteps: stepsCount, modalOpen: false }
      }
    }
  }
  handleCheck = (type, answer) => {
    let checkedAnswers = this.state.checkedAnswers;
    let answers = this.state.checkedAnswers[type].answers
    if (answers.indexOf(answer) !== -1) { // remove answer
      console.log(answer)
      answers.splice(answers.indexOf(answer))
    } else {
      answers.push(answer)
    }
    checkedAnswers[type].answers = answers
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
    console.log(this.state.checkedAnswers)
    this.setState({ modalOpen: true })
  }

  closeModal = () => {
    this.setState({ modalOpen: false })
  }

  render() {
    const q = this.questions[this.state.step]
    let answers = this.state.checkedAnswers;

    return <section id="test" className="main-content">
      <div className="progress-info">
        <h2>Pytanie {this.state.step + 1} na {this.state.totalSteps}</h2>
      </div>
      <LinearProgress variant="determinate" className="progress"
        value={((this.state.step + 1) / this.state.totalSteps) * 100} />

      <div className="test-container">
        <Fade in={true}>
          <div className="question" key={Math.random()}>
            <h2 className="question-title">{q.title}</h2>
            <div className="answers">
              {q.answers.map(answer => {
                return <FormControlLabel key={Math.random()}
                  className="answer"
                  control={
                    <Checkbox
                      checked={answers[q.type].answers.indexOf(answer) > -1}
                      onChange={() => { this.handleCheck(q.type, answer) }}
                      value="checkedB"
                      inputProps={{
                        'aria-label': 'secondary checkbox',
                      }} />
                  }
                  label={answer} />
              })}
            </div>
          </div>
        </Fade>
        <div className="buttons">
          {this.state.step > 0 && <PrimaryButton className="prev-step" outlined onClick={this.prevStep}>Cofnij</PrimaryButton>}
          {this.state.step < (this.state.totalSteps - 1) && <PrimaryButton primary className="next-step" onClick={this.nextStep}>Dalej</PrimaryButton>}
          {this.state.step === this.state.totalSteps - 1 && <PrimaryButton className="next-step" primary onClick={this.finish}>Zakończ test!</PrimaryButton>}
        </div>
      </div>

      <ModalWindow isOpen={this.state.modalOpen} isClosed={this.closeModal}
        type="test" object={this.state.checkedAnswers}></ModalWindow>

    </section>;
  }
}

export default Test;
