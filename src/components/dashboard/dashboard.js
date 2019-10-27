import React, { useState } from 'react';
import TaskCard from '../taskcard'
import './dashboard.scss';
import { useSelector } from 'react-redux';
import axios from '../../axios'
import Conditional from '../conditional/conditional';
import courseService from '../../services/courseService';
import LessonCard from '../lessonCard/lessonCard';
import Spinner from '../spinner'

function Dashboard() {
  let { userData } = useSelector(state => state); // as in reducers/index

  const [tasks, setTasks] = useState([])
  const [lessons, setLessons] = useState([])

  const getTasks = async () => {
    await axios.get('/tasks')
      .then((res) => { setTasks(res.data) })
  }
  const getLessons = async () => {
    let course = await courseService.getCourseByType('programming')
    setLessons(course.lessons)
  }
  useState(() => {
    if (!tasks.length) getTasks()
    if (!lessons.length) getLessons()
  }, [tasks, lessons])

  return (
    <section id="dashboard">
      <h1 className="welcome">{`Cześć, ${userData.name ? userData.name : 'User Name'}!`}</h1>
      <div className="tasks component">

        <h1 className="title">Zadania na dziś</h1>
        {tasks.map((task) => { return <TaskCard task={task} key={task.title} /> })}
        <Spinner loading={tasks.length === 0} color="dark" />

      </div>

      <div className="courses component">
        <h1 className="title">Punkty</h1>
        <h2>Masz <b>2500 punktów</b>.</h2>
        <p>Możesz je wykorzystać na przykład na:</p>
        <div className="lesson-cards-div">{lessons.map(l => { return <LessonCard lesson={l} key={l._id} /> })}</div>
      </div>

      <div className="recents component">
        <h1 className="title">Aktualności</h1>
      </div>

    </section>
  );
}

export default Dashboard;
