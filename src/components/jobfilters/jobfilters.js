import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './jobfilters.scss';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import SortIcon from '@material-ui/icons/Sort';

class Jobfilters extends Component {
  constructor(props) {
    super(props)
    this.state = { searchText: '' }
    this.filterJobsBySearch = this.filterJobsBySearch.bind(this)
    this.categories = ['kategorie', 'poziom', 'wymiar pracy', 'inne']
  }

  getSearchTextFromQuery = () => {
    if (this.props.query) {
      this.filterJobsBySearch(this.props.query.search)
    }
  }
  filterJobsBySearch = (value) => {
    this.setState({ searchText: value })
    this.props.searchText(value)
  }
  componentDidMount() {
    this.getSearchTextFromQuery()
  }

  render() {
    return <div className="jobfilters-container">
      <h3>Filtruj:</h3>
      <div className="job-filters">
        {this.categories.map((c) => { return <div className="job-filter" key={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</div> })}
        <Paper className="search-filter-input-root">
          <InputBase
            margin="dense"
            value={this.state.searchText}
            placeholder="Pracodawca, tytuł..."
            inputProps={{ 'aria-label': 'search job offers' }}
            onChange={(e) => this.filterJobsBySearch(e.target.value)}
          />

          <IconButton aria-label="search" className="search-filter">
            <SearchIcon />
          </IconButton>
        </Paper>
        <IconButton color="primary" aria-label="sort by" className="sort-filter-button">
          <SortIcon />
        </IconButton>
      </div>
    </div>;
  }
}

Jobfilters.propTypes = {};

export default Jobfilters;
