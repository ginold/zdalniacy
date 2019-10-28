import React, { useState, useEffect } from 'react';
import courseService from '../../services/courseService';
import './course.scss';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import WorkIcon from '@material-ui/icons/Work';
import LessonCard from '../lessonCard/lessonCard';
import Education from '../education'
import Spinner from '../spinner'
import Fade from '@material-ui/core/Fade';
import { Link } from 'react-router-dom';
import PrimaryButton from '../primary-button';

function Course(props) {
  const [allLessons, setAllLessons] = useState([])

  const [course, setCourse] = useState(null)
  const [courseNotFound, setCourseNotFound] = useState(null)
  const [courseLessonstopics, setCourseLessonsTopics] = useState([])
  const courseType = props.match.params.type

  useEffect(() => {
    if (!course) getCourse()
  }, [])

  const getCourse = async (type) => {
    setCourse(null)
    type = type || courseType
    let course = await courseService.getCourseByType(type)
    if (!course) {
      setCourseNotFound(true)
    } else {
      setAllLessons(course.lessons)
      setCourseNotFound(false)
      setCourse(course)
      setCourseLessonsTopics(getTopics(course))
    }
  }

  const getTopics = (course) => {
    let topics = []
    for (let lesson of course.lessons) {
      topics = [...topics, ...lesson.topics]
    }
    return [...new Set(topics)]; // unique array
  }
  const filterLessonsByTopic = (topic) => {
    let filtered = []
    filtered = allLessons.filter(lesson => lesson.topics.indexOf(topic) > -1)
    setCourse({ ...course, lessons: filtered })
  }
  const getTotalDuration = () => {
    let total = 0;
    for (let lesson of allLessons) {
      total += total + lesson.duration
    }
    return Math.round(total / 60);
  }
  return <section id="course">
    {course &&
      <Fade in={true}>
        <div className="course-container">

          <div className="description-container">
            <div className="text">
              <h1 className="title">{course.type}</h1>
              <p>{course.description}</p>
            </div>
            
            <div className="background-image-container">
              <div className="background-image" style={{backgroundImage: `url(/images/courses/${course.type}.jpg)`}}>
            </div>

            </div>
            <div className="info">
              <div className="lessons"><MenuBookIcon /><span>{allLessons.length} lekcji</span></div>
              <div className="hours"><WatchLaterIcon /><span>{getTotalDuration()} godzin</span></div>
              <div className="professions"><WorkIcon /><span>10 zawodów</span></div>
            </div>
          </div>
          <div className="lessons-container">
            <div className="lists-container">
              <div className="sticky-lists">
                <div className="topics-list list">
                  <h3>Tematyka</h3>
                  <ul>
                    {courseLessonstopics.map(topic => {
                      return <li onClick={() => { filterLessonsByTopic(topic) }} key={topic}>{topic}</li>
                    })}
                  </ul>
                </div>
                <div className="courses-list list">
                  <h3>Kursy</h3>
                  <ul>
                    {Education.courses.map(c => {
                      return <Link to={"/education/courses/" + c.type} key={c.type} onClick={() => getCourse(c.type)}><li>{c.title}</li></Link>
                    })}
                  </ul>
                </div>
              </div>
            </div>
            <div className="lessons">
              {course.lessons.map(l => { return <LessonCard lesson={l} key={l.description} /> })}
            </div>
          </div>
        </div>
      </Fade>
    }
    <Spinner loading={!course && !courseNotFound} className="top" />
    {courseNotFound && <div className="not-found">
      <h1>Nie znaleziono kursu.</h1>
      <Link to="/education/courses"><PrimaryButton primary>Wróć do kursów.</PrimaryButton></Link>
    </div>
    }

  </section>;
}

export default Course;
