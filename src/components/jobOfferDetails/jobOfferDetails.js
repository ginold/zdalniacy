import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './jobOfferDetails.scss';
import PrimaryButton from '../primary-button/primary-button';
import JobOfferCard from '../jobOfferCard';
import ModalWindow from '../../modal';
import axios from '../../axios'

class JobOfferDetails extends Component {
  constructor(props) {
    super(props)
    this.state = { job: props.location.state || {}, modalOpen: false }
    if (!this.state.job._id) this.getJob()
  }
  getJob = () => {
    let id = this.props.location.pathname.split("/")[3]
    axios.get('/jobs/' + id).then(res => {
      this.setState({ job: res.data })
    })
  }
  similarJobs = () => {
    let s = []
    for (let i = 0; i < 4; i++) {
      s.push(<JobOfferCard jobOffer={this.state.job} key={i} />)
    }
    return s
  }

  closeModal = () => {
    this.setState({ modalOpen: false })
  }

  apply = () => {
    console.log('apply')
    this.setState({ modalOpen: true })
  }

  saveJob = () => {
    console.log('save')
  }
  sendApplication = application => {
    this.closeModal()
    const job = { ...this.state.job, applied: true }
    this.setState({ job })
    console.log(application)
    console.log('sent!')
  }

  render() {
    let job = this.state.job
    // return <p>asd</p>
    return <div className="job-offer-details-container">
      <div className="column-1">
        <div className="job-offer-header">
          <img className="thumbnail" src={`/images/company/${job.company}.png`} alt={job.title} />
          <h1 className="title">{job.title}</h1>
        </div>
        <div className="content">
          <p>{job.description}</p>
          {!job.applied && <div className="bottom-buttons">
            <PrimaryButton text="Zapisz" outlined green onClick={this.saveJob} ></PrimaryButton>
            <PrimaryButton text="Aplikuj" primary onClick={this.apply}></PrimaryButton>
          </div>}
        </div>
      </div>

      <div className="column-2">
        <div className="top-buttons">
          <PrimaryButton text="Wróć" outlined onClick={() => { this.props.history.push('/work') }}></PrimaryButton>
          <PrimaryButton text="Zapisz" outlined green onClick={this.saveJob}></PrimaryButton>
          <PrimaryButton text={!job.applied ? 'Aplikuj' : 'Już aplikowano'}
            primary onClick={this.apply} disabled={job.applied} green={job.applied}>
          </PrimaryButton>
        </div>
        <div className="similar-job-offers">
          <h3 className="title">Podobne oferty</h3>
          {this.similarJobs()}
        </div>
      </div>
      <ModalWindow isOpen={this.state.modalOpen} isClosed={this.closeModal}
        type="apply" object={job} title="Wyślij aplikację" sendApplication={this.sendApplication}></ModalWindow>
    </div>;
  }
}

JobOfferDetails.propTypes = {
  job: PropTypes.object
};

export default JobOfferDetails;
