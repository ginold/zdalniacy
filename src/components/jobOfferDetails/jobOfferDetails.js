import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './jobOfferDetails.scss';
import PrimaryButton from '../primary-button/primary-button';
import JobOfferCard from '../jobOfferCard';
import ModalWindow from '../modal';
import jobService from '../../services/jobService'
import SaveButton from '../saveButton/saveButton';
import Auth from '../../services/auth';
import JobProperties from '../jobProperties/jobProperties';
import Spinner from '../spinner';
import JobLessonsNeeded from '../jobLessonsNeeded'

class JobOfferDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      job: { lessonsNeeded: [] }, modalOpen: false,
      applied: false, loading: true, areLessonsAccomplished: false
    }
  }
  componentDidMount() {
    this.getJob().then((job) => {
      this.setState({ job, loading: false, applied: this.checkIsApplied(job) })
    })
  }
  getJob = () => {
    const locationState = this.props.location.state

    return new Promise((resolve, reject) => {
      if (!locationState) {
        let id = this.props.location.pathname.split("/")[3]
        jobService.getJobById(id).then(job => {
          resolve(job.data)
        }).catch(err => resolve(err))
      } else {
        resolve(locationState)
      }
    })
  }
  checkIsApplied = (job) => {
    if (Auth.isAuthenticated()) {
      const jobsApplied = Auth.getUserData().jobsApplied
      for (let i = 0; i < jobsApplied.length; i++) {
        if (jobsApplied[i]._id === job._id) return true
      }
      return false
    }
    return false
  }
  similarJobs = () => {
    let s = []
    for (let i = 0; i < 2; i++) {
      s.push(<JobOfferCard jobOffer={this.state.job} key={i} />)
    }
    return s
  }
  closeModal = () => this.setState({ modalOpen: false })

  openModal = () => {
    if (this.state.areLessonsAccomplished && Auth.isAuthenticated()) {
      this.setState({ modalType: 'apply', modalOpen: true })
    } else {
      this.setState({ modalType: 'cantApply', modalOpen: true })
    }
  }
  sendApplication = (application) => {
    return new Promise((resolve, reject) => {
      let jobsApplied = Auth.getUserData().jobsApplied
      jobsApplied.push(this.state.job)

      Auth.updateUser().then(() => {
        this.setState({ applied: true })
        Auth.setUserData({ jobsApplied })
        console.log('sent!')
        resolve()
      }).catch(err => reject(err))
    })
  }
  areLessonsAccomplished = (accomplished) => {
    this.setState({ areLessonsAccomplished: accomplished })
  }

  render() {
    const { job, applied, loading } = this.state

    return <>
      <section className="main-content" id="job-offer-details">
        <Spinner loading={loading} color="dark" className="top" />

        {!loading && <div className="job-offer-details-container">
          <div className="job-description">
            <p className="job-offer-above-header">Oferta pracy</p>
            <div className="job-offer-header">
              <img className="thumbnail" src={`/images/company/${job.company}.png`} alt={job.title} />
              <h1 className="title">{job.title}</h1>
            </div>
            <JobProperties job={job} />
            <div className="content">
              <p className="job-description-text">{job.description}</p>
              {job.requirements && <>
                <h2>Wymagania</h2>
                <p className="job-requirements">{job.requirements}</p>
              </>}
            </div>
          </div>

          <div className="side">
            <div className="top-buttons">
              <PrimaryButton text="Wróć" outlined onClick={() => { this.props.history.push('/work/jobOffers') }}></PrimaryButton>
              <SaveButton object={job} type="jobs" />
              <PrimaryButton text={!applied ? 'Aplikuj' : 'Już aplikowano'}
                primary onClick={this.openModal} disabled={applied} green={applied}>
              </PrimaryButton>
            </div>
            <div className="similar-job-offers">
              <h3 className="title">Podobne oferty</h3>
              {this.similarJobs()}
            </div>
          </div>

          <JobLessonsNeeded job={job} areLessonsAccomplished={this.areLessonsAccomplished} />
          {!applied && <div className="bottom-buttons">
            <SaveButton object={job} type="jobs" />
            <PrimaryButton text={!applied ? 'Aplikuj' : 'Już aplikowano'}
              primary onClick={this.openModal} disabled={applied} green={applied}>
            </PrimaryButton>
          </div>}

        </div>}
        <ModalWindow isOpen={this.state.modalOpen} isClosed={this.closeModal} lessonsNeeded={job.lessonsNeeded}
          type={this.state.modalType} object={job} sendApplication={this.sendApplication}></ModalWindow>
      </section>
    </>;
  }
}

JobOfferDetails.propTypes = {
  job: PropTypes.object
};

export default JobOfferDetails;
