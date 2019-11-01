import React, { Component } from 'react';
import Jobfilters from '../jobfilters'
import './work.scss';
import JobOfferCard from '../jobOfferCard';
import posed from 'react-pose';
import jobsService from '../../services/jobService';
import Spinner from '../spinner'
import Fade from '@material-ui/core/Fade';

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
    this.state = { jobOffers: [], filteredJobOffers: [], isOpen: false, isLoading: true }
    this.getJobs()
  }
  getJobs = () => {
    jobsService.getAll().then((jobs) => {
      this.setState({ jobOffers: jobs, filteredJobOffers: jobs, isLoading: false })
      setTimeout(this.toggle, 100);
    })
  }

  getSearchText = (text) => this.filterJobsBySearchText(text);

  filterJobsBySearchText = (text) => {
    this.setState({
      filteredJobOffers: this.state.jobOffers.filter(job =>
        job.title.toLowerCase().startsWith(text) ||
        job.company.toLowerCase().startsWith(text))
    })
  }

  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    const { isOpen, isLoading, filteredJobOffers } = this.state;

    return <div id="work" className="main-content">
      <Jobfilters searchText={this.getSearchText}></Jobfilters>
      <Fade in={!isLoading && filteredJobOffers !== undefined}>
        <JobOffersContainer pose={isOpen ? 'open' : 'closed'} className="job-offers">
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
