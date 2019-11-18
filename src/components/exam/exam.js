import React, { Component } from 'react';
import Quizz from '../quizz'
import examService from '../../services/examService';
import './exam.scss';
import Auth from '../../services/auth';
import lessonService from '../../services/lessonService';
import NotificationsService from '../../services/notificationsService';
import Homework from '../homework'
import Spinner from '../spinner';

class Exam extends Component {
  constructor(props) {
    super(props)
    this.finish = this.finish.bind(this)
    this.state = {
      lessonId: props.match.params.id, exam: null,
      modalOpen: false, lesson: null, loading: true
    }
  }

  componentDidMount() {
    const exam = examService.getExamByLessonId(this.state.lessonId)
    const lesson = lessonService.getLessonById(this.state.lessonId)
    Promise.all([exam, lesson]).then(values => {
      this.setState({ exam: values[0], lesson: values[1].data, loading: false })
    })
  }
  finish = () => {
    let data = Auth.getUserData()
    data.accomplished.lessons.push(this.state.lesson)
    Auth.setUserData(data)
    Auth.addPoints(this.state.lesson.reward)
    Auth.updateUser()
    this.props.history.push('/')
    setTimeout(() => {
      NotificationsService.pushNotification({ title: `Brawo! Gratulujemy ukończenia lekcji: ${this.state.lesson.title} :)` })
    }, 3000)
  }
  closeModal = () => {
    this.setState({ modalOpen: false })
  }
  render() {
    const { exam, lesson, loading } = this.state

    return <section id="exam" className="main-content">
      <Spinner color='white' loading={loading} />
      {!loading && <div className="exam-container">
        {exam.type === 'quizz' && <Quizz questions={exam.questions} lesson={lesson} finish={this.finish} />}
        {exam.type === 'homework' && <Homework tasks={exam.tasks} lesson={lesson} finish={this.finish} />}
      </div>}
    </section>;
  }
}

export default Exam;
