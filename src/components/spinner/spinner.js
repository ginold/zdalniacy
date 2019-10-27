import React, { Component } from 'react';
import PulseLoader from 'react-spinners/PulseLoader';
import './spinner.scss';

class Spinner extends Component {
  render() {
    return <span className={this.props.className + ' spinner'}>
      <PulseLoader
        color={this.props.color === 'dark' ? '#142537' : '#fff'}
        loading={this.props.loading}
        size={50} />
    </span>;
  }
}

export default Spinner;
