import React from 'react';
import PropTypes from 'prop-types';
import PrimaryButton from '../primary-button';
import { Link } from 'react-router-dom';
import Fade from '@material-ui/core/Fade';

function ModalContentTest(props) {
  const type = props.type
  const handleClose = props.handleClose
  const finish = props.finish

  return (<Fade in={true}>
    <div className={" modal-window " + type}>
      <div className="modal-window-container">

        <h2 id="transition-modal-title">Koniec testu</h2>
        <div className="content">

          <h3>Ukończyłeś test rozpoznawczy!</h3>
          <p>
            Dzięki temu będziemy mogli dopasować do Ciebie kursy i oferty pracy,
            które mogą Cię zainteresować.
          </p>
          <p>Szerokiej drogi!</p>

          <div className="bottom-buttons">
            <Link to="/"><PrimaryButton onClick={finish} primary>OK!</PrimaryButton></Link>
            <PrimaryButton onClick={handleClose} outlined>Wróć do testu</PrimaryButton>
          </div>
        </div> {/* .content */}
      </div>
    </div>
  </Fade>
  )
}

ModalContentTest.propTypes = {
  type: PropTypes.string,
  handleClose: PropTypes.func,
  finish: PropTypes.func
};

export default ModalContentTest
