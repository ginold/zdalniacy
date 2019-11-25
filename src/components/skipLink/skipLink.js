import React, { Component } from 'react';
import './skipLink.scss'

class SkipLink extends Component {
  render() {
    return <ul id="skip-link" tabIndex="1">
      <li><a href="#main">Do głównej zawartości</a></li>
    </ul>;
  }
}

export default SkipLink;
