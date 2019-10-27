import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab';
import MessageIcon from '@material-ui/icons/Message';

class MessageFab extends Component {
  render() {
    return <Fab color="primary" aria-label="message button" className="message fab">
      <MessageIcon />
    </Fab>
  }
}

export default MessageFab;
