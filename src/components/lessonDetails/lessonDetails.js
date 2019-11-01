import React, { Component } from 'react';
import './lessonDetails.scss';
import TableOfContents from '../tableOfContents'
import LessonTabs from '../lessonTabs/lessonTabs';
import lessonService from '../../services/lessonService'
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { ReactComponent as TrophyIcon } from '../../icons/trophy.svg'

// const course = { "_id": { "$oid": "5db7049dac254b66e8ffb31d" }, "topics": ["ux/ui", "backend", "front-end", "javascript"], "chapters": [{ "subchapters": ["nie ma podwstępu xd"], "_id": { "$oid": "5db7049dac254b66e8ffb320" }, "title": "Wstęp" }, { "subchapters": ["Android 1", "Android 2", "Android 3"], "_id": { "$oid": "5db7049dac254b66e8ffb31f" }, "title": "Czym jest Android?" }, { "subchapters": ["Maeven", "Kotlin"], "_id": { "$oid": "5db7049dac254b66e8ffb31e" }, "title": "Maeven i Kotlin" }], "courseType": "programming", "title": "Kurs Android i JavaScript - praktyczne projekty", "description": "Chcesz rozwinąć umiejętności pracy z HTML5 i JavaScript? Zależy Ci na tym, by tworzyć bardziej atrakcyjne strony dla swoich klientów? A może chcesz po prostu wprowadzić nowoczesne rozwiązania na swojej witrynie? Dzięki temu szkoleniu zdobędziesz umiejętności, które pomogą Ci w każdym z tych zadań. W trakcie kursu tworząc aż 6 zróżnicowanych projektów, zdobędziesz praktyczną wiedzę między innymi na temat: wykorzystania biblioteki jQuery, technologii Canvas, umieszczania na stronie obiektów audio, wideo i wiele więcej. Szkolenie to będzie też doskonałą okazją, aby utrwalić wiedzę z podstaw HTML i JavaScript.", "imgUrl": "java", "type": "video", "duration": { "$numberInt": "130" }, "cost": { "$numberInt": "1000" }, "tasks": [], "__v": { "$numberInt": "0" } }
class LessonDetails extends Component {
  constructor(props) {
    super(props)
    this.state = { lesson: props.location.state, error: null }
    if (!this.state.lesson) this.getLesson()
  }

  getLesson = () => {
    let id = this.props.location.pathname.split("/")[4]
    lessonService.getLessonById(id)
      .then(res => {
        this.setState({ lesson: res.data })
      })
      .catch(err => {
        this.setState({ lesson: null, error: err })
      })
  }
  handleClick = () => {

  }

  render() {
    const lesson = this.state.lesson
    const error = this.state.error

    return <section id="lesson-details" className="main-content">
      {lesson && <div className="lesson-details-container">
        <Breadcrumbs separator="›" aria-label="breadcrumb" className="breadcrumbs">
          <Link color="inherit" href="/education/courses">Kursy</Link>
          <Link color="inherit" href={`/education/courses/${lesson.courseType}`}>{lesson.courseType}</Link>
        </Breadcrumbs>
        <h1 className="lesson-title">{lesson.title}</h1>
        <div className="lesson-info">
          <TrophyIcon></TrophyIcon>
        </div>
        <div className="video"></div>
        <TableOfContents chapters={lesson.chapters} />
        <LessonTabs lesson={lesson} />
      </div>}

      {!lesson && <h1>Nie znaleziono lekcji.</h1>}
      {error && <h2>{error}</h2>}
    </section>

  }
}

export default LessonDetails;
