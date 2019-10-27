import React, { Component } from 'react';
import EducationCard from '../educationCard';
import './education.scss';
const courseTypes = [
  { title: 'Marketing', type: 'marketing', count: 20 },
  { title: 'Design', type: 'design', count: 20 },
  { title: 'Ekonomia', type: 'economy', count: 20 },
  { title: 'Programowanie', type: 'programming', count: 20 },
  { title: 'Rozwój', type: 'self', count: 20 },
  { title: 'Pisanie', type: 'writing', count: 20 },
  { title: 'Coaching', type: 'coaching', count: 20 }
]

class Education extends Component {

  static courses = courseTypes;

  render() {
    return <section id="education">
      <div className="education-container">
        {courseTypes.map((c) => { return <EducationCard key={c.title} courseType={c} /> })}
      </div>
    </section>;
  }
}

export default Education;
