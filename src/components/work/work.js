import React, { Component } from 'react';
import Jobfilters from '../jobfilters'
import './work.scss';
import JobOfferCard from '../jobOfferCard';
import posed from 'react-pose';
import jobsService from '../../services/jobService';
import Spinner from '../spinner'
import Fade from '@material-ui/core/Fade';
import jobService from '../../services/jobService';
import Auth from '../../services/auth';

// for animations
const JobOffersContainer = posed.div({
  open: { x: '0%', delayChildren: 100, staggerChildren: 50 }
});
const AnimateCardItem = posed.div({
  open: { y: 0, opacity: 1 }, closed: { y: 20, opacity: 0 }
});

class Work extends Component {

  constructor(props) {
    super(props)
    this.state = {
      jobOffers: [], filteredJobOffers: [], animate: false,
      isLoading: true, isRecommendedPath: false, isLogged: Auth.isAuthenticated()
    }
  }
  componentDidMount() {
    this.getJobs()
  }
  initState = (jobs) => {
    this.setState({ jobOffers: jobs, filteredJobOffers: jobs, isLoading: false })
    setTimeout(() => {
      this.setState({ animate: !this.state.animate })
      if (this.props.location.params) this.filterJobsBySearchText(this.props.location.params.search)
    }, 100)

    if (this.props.location.pathname.indexOf('recommended') > -1) {
      this.setState({ isRecommendedPath: true })
      this.filterJobsByRecommended(jobs)
    }
  }
  getJobs = () => {
    const jobs = jobService.getJobsFromStore()

    if (!jobs.length) {
      jobsService.getAll().then((jobs) => {
        jobService.setJobs(jobs)
        this.initState(jobs)
      }).catch(err => console.log(err))
    } else {
      this.initState(jobs)
    }
  }

  getSearchText = (text) => this.filterJobsBySearchText(text);

  filterJobsBySearchText = (text) => {
    this.setState({
      filteredJobOffers: this.state.jobOffers.filter(job =>
        job.title.toLowerCase().startsWith(text) ||
        job.company.toLowerCase().startsWith(text))
    })
  }
  filterJobsByRecommended = (jobs) => {
    if (this.state.isLogged) {
      const interests = Auth.getUserData().interests
      console.log(interests)
      let filteredJobsIds = []
      let filteredJobs = []

      console.log(jobs)
      for (let interest of interests) {
        for (let job of jobs) {
          console.log(job.tags, interest)
          if (job.tags.includes(interest)) filteredJobsIds.push(job._id)
        }
      }
      for (let job of [...new Set(filteredJobsIds)]) {
        for (let job2 of jobs) {
          if (job === job2._id) filteredJobs.push(job2)
        }
      }
      this.setState({ filteredJobOffers: filteredJobs })
    }
  }

  render() {
    const { animate, isLoading, filteredJobOffers,
      isRecommendedPath, isLogged } = this.state;

    return <div id="work" className="main-content">
      <Jobfilters searchText={this.getSearchText} query={this.props.location.params} />
      <Fade in={!isLoading}>
        <JobOffersContainer pose={animate ? 'open' : 'closed'} className="job-offers">
          {isRecommendedPath && !isLogged && <h3>Tu będą wyświetlane proponowane oferty pracy specjalnie dla Ciebie. Zaloguj się!</h3>}
          {isRecommendedPath && isLogged && <h3>Oferty pracy specjalnie dla Ciebie na podstawie twoich zainteresowań!</h3>}

          {filteredJobOffers.length > 0 ?
            filteredJobOffers.map((jobOffer) => {
              return (
                <AnimateCardItem key={jobOffer._id} className="card-item">
                  <JobOfferCard
                    jobOffer={jobOffer}
                    history={this.props.history}>
                  </JobOfferCard>
                </AnimateCardItem>);
            })
            : <h2 className="no-results">Brak wyników.</h2>
          }
        </JobOffersContainer>
      </Fade>
      <Spinner loading={isLoading} className="top" color="dark" />

    </div>; // .work
  }
}

export default Work;
