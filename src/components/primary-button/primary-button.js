import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import './primary-button.scss';

class PrimaryButton extends Component {

  render() {
    return (
      <Button variant={this.props.primary ? "contained" : "outlined"}
        className={
          ` ${this.props.disabled ? 'disabled' : ''}
              ${this.props.primary ? "primary-button" : "outlined-button"}
              ${this.props.green ? "green" : ''}
              ${this.props.className ? this.props.className : ''}
              `
        }
        disabled={this.props.disabled}
        onClick={this.props.onClick}>
        {this.props.text}
        {this.props.children}
      </Button>
    );
  }
}

export default PrimaryButton;
