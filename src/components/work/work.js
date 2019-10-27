import React, { Component } from 'react';
import Jobfilters from '../jobfilters'
import './work.scss';
import JobOfferCard from '../jobOfferCard';
import posed from 'react-pose';
import axios from '../../axios'
import Conditional from '../conditional/conditional';

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
    this.jobOffers = []
    this.state = { jobOffers: [], filteredJobOffers: [], isOpen: false, isLoading: true }
    this.getJobs()
  }
  getJobs = () => {
    axios.get('/jobs')
      .then((res) => {
        this.jobOffers = res.data
        this.setState({ jobOffers: this.jobOffers, filteredJobOffers: this.jobOffers, isLoading: false })
        setTimeout(this.toggle, 100);
      })
  }
  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  getSearchText = (text) => this.filterJobsBySearchText(text);

  filterJobsBySearchText = (text) => {
    this.setState({ filteredJobOffers: this.state.jobOffers.filter(job => job.title.toLowerCase().startsWith(text)) })
  }

  render() {
    const { isOpen, isLoading } = this.state;
    return <div id="work">
      <Jobfilters searchText={this.getSearchText}></Jobfilters>
      <Conditional if={!isLoading}>
        <JobOffersContainer pose={isOpen ? 'open' : 'closed'} className="job-offers">
          {this.state.filteredJobOffers.length > 0 ?
            this.state.filteredJobOffers.map((jobOffer) => {
              return (
                <AnimateCardItem key={jobOffer._id} className="card-item">
                  <JobOfferCard
                    jobOffer={jobOffer}
                    history={this.props.history}>
                  </JobOfferCard>
                </AnimateCardItem>);
            })
            : <h2>Brak wyników.</h2>
          }
        </JobOffersContainer>
      </Conditional>
      <Conditional if={isLoading}>
        <div className="job-offers">
          <h2>Ładowanie...</h2>
        </div>
      </Conditional>

    </div>; // .work
  }
}

export default Work;
