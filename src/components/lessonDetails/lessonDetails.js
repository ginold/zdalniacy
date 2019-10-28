import React, { Component } from 'react';
import './lessonDetails.scss';

class LessonDetails extends Component {
  constructor(props) {
    super(props)
    console.group(props)
    this.lesson = props.location.state || {}
  }
  render() {
    const lesson = this.lesson
    return <section id="lesson-details">
      <h1>{lesson.title}</h1>
    </section>
  }
}

export default LessonDetails;
