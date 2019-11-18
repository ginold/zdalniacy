import React, { Component } from 'react';
import './notFound.scss'
import PrimaryButton from '../primary-button';
import { Link } from 'react-router-dom';

class NotFound extends Component {
  render() {
    return <section id="not-found" className="main-content">
      <div className="container">
        <h1>Nie znaleziono strony :(</h1>
        <Link to="/"><PrimaryButton primary>Wróć do strony głównej</PrimaryButton></Link>
      </div>
    </section>;
  }
}
export default NotFound;
