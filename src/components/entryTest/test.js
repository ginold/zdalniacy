import React, { Component } from 'react';
import './test.scss';
import NotificationsService from '../../services/notificationsService'
import Auth from '../../services/auth';
import axios from '../../axios'
import Quizz from '../quizz'
import ModalWindow from '../modal';
import examService from '../../services/examService';

class EntryTest extends Component {
  constructor(props) {
    super(props)
    this.state = { taskId: null, questions: null, modalOpen: false }
    this.modalContent = {
      header: 'Test zapoznawczy',
      title: 'Witaj w teście rozpoznawczym!',
      text: 'Rozwiaż test, abyśmy cię mogli lepiej poznać. Odpowiedzi pomogą dopasować nam lekcje i oferty pracy, które mogłyby cię zainteresować.'
    }
  }
  componentDidMount() {
    axios.get('/tasks/type/entry_test').then((res) => {
      const taskId = res.data._id;
      this.setState({ taskId, modalOpen: true })

      examService.getExamByTaskId(taskId).then((res) => {
        this.setState({ questions: res.data.questions })
      })
    })
  }

  finish = (answers) => {
    NotificationsService.pushNotification({ "title": "Test rozwiązany! Możesz zobaczyć jakie mamy dla Ciebie rekomendowane oferty pracy." })
    let data = Auth.getUserData()
    let accomplished = data.accomplished
    accomplished.tasks.push(this.state.taskId)
    Auth.addPoints(500)
    Auth.setUserData({ ...answers, accomplished })
    Auth.updateUser()
  }
  closeModal = () => {
    this.setState({ modalOpen: false })
  }

  render() {
    return <section id="test" className="main-content">
      {this.state.questions && <Quizz questions={this.state.questions} finish={this.finish} />}

      <ModalWindow isOpen={this.state.modalOpen} isClosed={this.closeModal}
        modalContent={this.modalContent} type="default" />
    </section>;
  }
}

export default EntryTest;


// [
//   {
//     "title": "Jakie są twoje zainteresowania?", "type": "interests", "answers": [
//       { "text": "Film", "value": "film" },
//       { "text": "Technologie", "value": "technologies" },
//       { "text": "Języki obce", "value": "foreign_languages" },
//       { "text": "Reklama", "value": "advertisment" },
//       { "text": "Informatyka", "value": "computer_science" },
//       { "text": "Design", "value": "design" }]
//   },
//   {
//     "title": "Na jakim portalu spędzasz najwięcej czasu?", "type": "favoritePortals", "answers": [
//       { "text": "Facebook", "value": "facebook" },
//       { "text": "Youtube", "value": "youtube" },
//       { "text": "Instagram", "value": "instagram" },
//       { "text": "Strony z kursami", "value": "learning_websites" },
//       { "text": "Blogi", "value": "blogs" },
//       { "text": "Portale informacyjne", "value": "news" }]
//   },
//   {
//     "title": "Jaką forme pracy preferujesz?", "type": "workType", "answers": [
//       { "text": "Praca samodzielna, zdalna.", "value": "remote_alone" },
//       { "text": "Praca w grupie, zdalna.", "value": "remote_group" },
//       { "text": "Wolę mieć konkretną listę zadań i kontakt z mentorem.", "value": "coach_tasks" },
//       { "text": "Praca samodzielna, mogę się przemieszczać.", "value": "move_alone" },
//       { "text": "Praca w grupie, mogę się przemieszczać.", "value": "move_group" }]
//   },
//   {
//     "title": "Czy masz już doświadczenie zawodowe?", "type": "jobExperience", "answers": [
//       { "text": "Nie mam, szukam swojej pierwszej pracy.", "value": "no_experience" },
//       { "text": "Tak, ale mam niewielkie doświadczenie (mniej niż rok).", "value": "little_experience" },
//       { "text": "Tak, dłużej niż rok.", "value": "medium_experience" },
//       { "text": "Jestem specjalistą (ponad 5 lat).", "value": "large_experience" }]
//   },
//   {
//     "title": "Ile godzin tygodniowo możesz pracować?", "type": "hoursAvailable", "answers": [
//       { "text": "10", "value": "10" },
//       { "text": "20", "value": "20" },
//       { "text": "40", "value": "40" },
//       { "text": "80", "value": "80" }]
//   },
//   {
//     "title": "Jakie masz cechy?", "type": "features", "answers": [
//       { "text": "Jestem kreatywny.", "value": "creative" },
//       { "text": "Dobrze liczę, lubie tabelki.", "value": "calculations" },
//       { "text": "Dobrze rysuję.", "value": "drawing" },
//       { "text": "Mam dobry słuch.", "value": "hearing" }]
//   }]