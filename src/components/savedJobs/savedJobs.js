import React, { Component } from 'react';
import Auth from '../../services/auth';
import JobOfferCard from '../jobOfferCard';
import './savedJobs.scss'
import Conditional from '../conditional/conditional';
import { connect } from 'react-redux'

class SavedJobs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogged: Auth.isAuthenticated(),
      jobs: props.userData.saved.jobs
    }
  }

  render() {
    const { isLogged, jobs } = this.state

    return <section id="saved-jobs" className="main-content">
      <div className="jobs-saved-container">
        <h1>Zapisane oferty pracy</h1>
        <Conditional if={isLogged && jobs.length > 0}>
          <div className="jobs-saved-list">
            {jobs.map((j, i) => {
              return <JobOfferCard key={j._id} jobOffer={j} />
            })}
          </div>
        </Conditional>
        <Conditional if={isLogged && jobs.length === 0}>
          <p className="info">Nie masz zadnych zapisanych ofert pracy.</p>
          <p className="info">Tu znajdziesz oferty pracy, które możesz zapisać do późniejszego obejrzenia.</p>
        </Conditional>
        {!isLogged && <p className="info">Musisz być zalogowany.</p>}
      </div>
    </section>;
  }
}
const mapStateToProps = state => {
  return { userData: state.userData }
}

export default connect(mapStateToProps)(SavedJobs);
