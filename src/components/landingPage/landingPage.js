import React, { useEffect } from 'react';
import './landingPage.scss';
import JobService from '../../services/jobService.js'
import JobOfferCard from '../jobOfferCard';
import { Link } from 'react-router-dom';
import points from '../../static/landing/points.svg';
import apply from '../../static/landing/apply.svg';
import tutorials from '../../static/landing/tutorials.svg';
import Footer from '../footer'

function LandingPage() {

  const [jobs, setJobs] = React.useState([])
  const getJobs = async () => {
    JobService.getAll().then((res) => { setJobs(res) })
  }
  useEffect(() => {
    if (!jobs.length) getJobs()
  }, []) // empty array => runs only once

  return (<section className="landing-page">
    <div className="landing-page-container">

      <div className="job-offers">
        <div className="work-text">
          <h1>Leż i pracuj wygodnie z domu.</h1>
          <p>Mamy dla Ciebie {jobs.length} ofert pracy.</p>
          <Link to="/work"><p>Sprawdź, gdzie pasujesz!</p></Link>
        </div>
        {jobs.length > 0 &&
          <div className="job-cards">
            <JobOfferCard jobOffer={jobs[3]} />
            <JobOfferCard jobOffer={jobs[4]} />
            <JobOfferCard jobOffer={jobs[5]} />
          </div>}
      </div>

      <div className="features">
        <div className="what-to-see">
          <div className="tutorials feature">
            <img src={tutorials} alt="tutorials"></img>
            <p>Oglądaj tutoriale, słuchaj wykładów, zbieraj punkty.</p>
          </div>
          <div className="points feature">
            <p>Rozwiązuj zadania, quizy, testy, wymieniaj punkty na kolejne materiały.</p>
            <img src={points} alt="poinst"></img>
          </div>
          <div className="apply feature">
            <img src={apply} alt="apply"></img>
            <p>Aplikuj do pracy marzeń, zbieraj certyfikaty!</p>
          </div>
        </div>
        <div className="features-heading">
          <h2>Zdobądź niezbędne umiejętności do wykonywania przyszłej pracy, prosto z łóżka!</h2>
          <Link to="/education/courses">Wybierz temat, który Cię interesuje</Link>
        </div>
      </div>

    </div> {/*landing-page-container */}
    <Footer></Footer>
  </section>);
}


export default LandingPage;
