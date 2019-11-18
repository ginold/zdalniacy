import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Badge from '@material-ui/core/Badge';
import MessageIcon from '@material-ui/icons/Message';
import IconButton from '@material-ui/core/IconButton';

class MessagesButton extends Component {
  render() {
    return (
      <Badge badgeContent={null} className="badge">
        <IconButton className="icon-button">
          <MessageIcon className="icon" />
        </IconButton>
      </Badge>
    );
  }
}

MessagesButton.propTypes = {
  text: PropTypes.string
};

export default MessagesButton;
