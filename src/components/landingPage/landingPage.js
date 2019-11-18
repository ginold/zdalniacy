import React, { useEffect } from 'react';
import './landingPage.scss';
import JobService from '../../services/jobService.js'
import { Link } from 'react-router-dom';
import points from '../../static/landing/points.svg';
import apply from '../../static/landing/apply.svg';
import tutorials from '../../static/landing/tutorials.svg';
import Footer from '../footer'
import TextField from '@material-ui/core/TextField';
import PrimaryButton from '../primary-button';

function LandingPage() {

  const [jobs, setJobs] = React.useState([])
  const [search, setSearch] = React.useState('')
  const getJobs = async () => {
    JobService.getAll().then((res) => { setJobs(res) })
  }
  const submit = (e) => {
    e.preventDefault();
    document.getElementById('search-job-button').click()
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
          <Link to="/work/jobOffers"><p>Sprawdź, gdzie pasujesz!</p></Link>
        </div>
        <div className="search-job">
          <h2 className="search-title">Wyszukaj ofertę pracy dla Ciebie!</h2>
          <form onSubmit={submit}>
            <TextField
              id="outlined-search"
              label="Tytuł, pracodawca..."
              type="search"
              placeholder='Na przykład "Facebook"'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              margin="normal"
              variant="outlined"
            />

            <Link
              id='search-job-button'
              to={{
                pathname: "/work/jobOffers",
                search: `?search=${search}`,
                params: { search }
              }}><PrimaryButton primary>Szukaj!</PrimaryButton></Link>
          </form>
        </div>
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
