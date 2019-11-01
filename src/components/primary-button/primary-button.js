import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import './primary-button.scss';

class PrimaryButton extends Component {

  render() {
    return (
      <Button variant={this.props.primary ? "contained" : "outlined"}
        className={
          `     ${this.props.className}
                ${this.props.disabled ? 'disabled' : null}
                ${this.props.primary ? "primary-button" : "outlined-button"}
                ${this.props.green ? "green" : ""}
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
