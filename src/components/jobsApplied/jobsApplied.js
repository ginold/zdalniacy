import React, { Component } from 'react';
import JobOfferCard from '../jobOfferCard'
import Auth from '../../services/auth';
import Conditional from '../conditional/conditional';

class JobsApplied extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogged: Auth.isAuthenticated(),
      jobs: Auth.isAuthenticated() ? Auth.getAppliedJobs() : []
    }
  }

  render() {
    const isLogged = this.state.isLogged
    const jobs = this.state.jobs

    console.log(jobs)

    return <section id="applied-jobs" className="main-content">
      <div className="jobs-applied-container">
        <h1>Wysłane aplikacje</h1>
        <Conditional if={isLogged && jobs.length > 0}>
          <div className="jobs-applied-list">
            {jobs.map((j, i) => {
              return <JobOfferCard key={i + '-job-card'}
                jobOffer={j}>
              </JobOfferCard>
            })}
          </div>
        </Conditional>
        <Conditional if={isLogged && jobs.length === 0}>
          <p className="info">Nie masz zadnych wysłanych aplikacji.</p>
          <p className="info">Tu znajdziesz oferty pracy, do których aplikowałeś.</p>
        </Conditional>
        {!isLogged && <p className="info">Musisz być zalogowany.</p>}
      </div>
    </section>;
  }
}

export default JobsApplied;
