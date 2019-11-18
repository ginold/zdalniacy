import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Auth from '../../services/auth';
import PrimaryButton from '../primary-button';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import './saveButton.scss';
import ModalWindow from '../../modal';

class SaveButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: props.type,
      object: props.object,
      saved: false,
      modalOpen: false,
      modalContent: {
        header: 'Zapisz', title: 'Nie można zapisać!', text: 'Aby zapisać, musisz być zalogowany.'
      }
    }
    this.save = this.save.bind(this)
  }
  componentDidMount() {
    this.setState({ saved: this.isSaved() })
  }
  // make it better, maybe add types to the models to distinguish
  save = () => {
    if (Auth.isAuthenticated()) {
      let data = Auth.getUserData().saved
      data[this.state.type].push(this.state.object)
      const isSaved = true
      this.update(data, isSaved)
    } else {
      this.setState({ modalOpen: true })
    }
  }
  isSaved = () => {
    if (Auth.isAuthenticated()) {
      const data = Auth.getUserData().saved[this.state.type]
      for (let d of data) {
        if (d._id === this.state.object._id) {
          return true
        }
      }
    }
    return false
  }
  remove = () => {
    let data = Auth.getUserData().saved
    const dataType = data[this.state.type]
    for (let i = 0; i <= dataType.length; i++) {
      if (dataType[i]._id === this.state.object._id) {
        dataType.splice(i, 1);
        const isSaved = false
        this.update(data, isSaved)
        return
      }
    }
  }
  update = (data, isSaved) => {
    Auth.setUserData(data)
    this.setState({ saved: isSaved })
    Auth.updateUser()
  }
  closeModal = () => {
    this.setState({ modalOpen: false })
  }

  render() {
    return (
      <>
        {!this.state.saved && <PrimaryButton className="save-button" outlined green onClick={this.save}><BookmarkBorderIcon />Zapisz</PrimaryButton >}
        {this.state.saved && <PrimaryButton className="save-button" outlined green onClick={this.remove}><BookmarkIcon />Zapisano</PrimaryButton >}

        <ModalWindow isOpen={this.state.modalOpen} isClosed={this.closeModal}
          type='default' modalContent={this.state.modalContent} ></ModalWindow>
      </>)
  }
}

SaveButton.propTypes = {
  object: PropTypes.object
};

export default SaveButton;
