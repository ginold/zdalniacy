import React, { useState } from 'react';
import TaskCard from '../taskcard'
import './dashboard.scss';
import axios from '../../axios'
import LessonCard from '../lessonCard/lessonCard';
import Spinner from '../spinner'
import Auth from '../../services/auth';
import lessonService from '../../services/lessonService';

function Dashboard() {
  let userData = Auth.getUserData()
  const [tasks, setTasks] = useState([])
  const points = userData.points
  const [canAffordLessons, setCanAffordLessons] = useState([])

  const getTasks = async () => {
    await axios.get('/tasks')
      .then((res) => { setTasks(res.data) })
  }
  const getLessons = async () => {
    const lessons = await lessonService.getAll()
    setCanAffordLessons(lessons.filter(lesson => lesson.cost <= points))
  }

  useState(() => {
    if (!tasks.length) getTasks()
    if (!canAffordLessons.length) getLessons()
  }, [tasks])

  return (
    <section id="dashboard" className="main-content">
      <h1 className="welcome">{`Cześć, ${userData.firstname ? userData.firstname : 'User Name'}!`}</h1>
      <div className="tasks component">

        <h1 className="title">Zadania na dziś</h1>
        {tasks.map((task) => { return <TaskCard task={task} key={task.title} /> })}
        <Spinner loading={tasks.length === 0} color="dark" />

      </div>

      <div className="courses component">
        <h1 className="title">Punkty</h1>
        <h2>Masz <b>{points} punktów</b>.</h2>
        <p>Możesz je wykorzystać na przykład na:</p>
        <div className="lesson-cards-div">{canAffordLessons.map(l => { return <LessonCard lesson={l} key={l._id} /> })}</div>
      </div>

      <div className="recents component">
        <h1 className="title">Aktualności</h1>
      </div>

    </section>
  );
}

export default Dashboard;
