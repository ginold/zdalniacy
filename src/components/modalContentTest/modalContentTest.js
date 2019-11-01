import React from 'react';
import PropTypes from 'prop-types';
import PrimaryButton from '../primary-button';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import NotificationsService from '../../services/notificationsService'
import Auth from '../../services/auth';

function ModalContentTest(props) {
  const type = props.type
  const checkedAnswers = props.answers;
  const handleClose = props.handleClose

  const finish = () => {
    Auth.addPoints(500)
    NotificationsService.pushNotification({ title: "Test rozwiązany. Teraz się dopiero zacznie xD" })
  }
  const getAnswers = () => {
    let answersDiv = []

    for (let type in checkedAnswers) {
      const question = checkedAnswers[type].title
      const answers = checkedAnswers[type].answers

      answersDiv.push(<div key={Math.random()} className="answer">
        <b>{question}</b>
        {answers.map((a, i) => {
          return `${a}${i < answers.length - 1 ? ', ' : '.'} `
        })}
      </div>)
    }
    return answersDiv;
  }

  return (<div className={" modal-window " + type}>
    <h2 id="transition-modal-title">Koniec testu</h2>
    <div className="content">

      <h3>Ukończyłeś test rozpoznawczy!</h3>
      <p>Dzięki temu będziemy mogli dopasować do Ciebie kursy i oferty pracy,
        które mogą Cię zainteresować.
      </p>
      <p>Szerokiej drogi!</p>

    </div> {/* .content */}
    <div className="bottom-buttons">
      <Link to="/dashboard"><PrimaryButton onClick={() => { finish() }} primary>OK!</PrimaryButton></Link>
      <PrimaryButton onClick={handleClose} outlined>Wróć do testu</PrimaryButton>
    </div>
  </div>
  )
}

ModalContentTest.propTypes = {
  type: PropTypes.string,
  answers: PropTypes.object,
  handleClose: PropTypes.func
};

const mapStateToProps = state => ({
  router: state
})

export default connect(mapStateToProps)(ModalContentTest);
