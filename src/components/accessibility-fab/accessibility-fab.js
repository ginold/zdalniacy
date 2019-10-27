import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab';
import AccessibleIcon from '@material-ui/icons/Accessible';
import './accessibility-fab.scss';

class AccessibilityFab extends Component {
  render() {
    return <Fab aria-label="accessibility button" className="accessibility fab">
      <AccessibleIcon />
    </Fab>
  }
}

export default AccessibilityFab;
