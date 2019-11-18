import React from 'react';
import PropTypes from 'prop-types';
import PrimaryButton from '../primary-button'
import { Link, useLocation } from 'react-router-dom';

function LoginButton(props) {
  const location = useLocation()
  const from = props.from || location.pathname;
  const p = props

  return (<Link
    to={{
      pathname: "/login",
      state: { from }
    }}>
    <PrimaryButton
      outlined={p.outlined}
      primary={p.primary}
      className={p.className}
    >Zaloguj się
    </PrimaryButton>
  </Link>
  )
}

LoginButton.propTypes = {
  outlined: PropTypes.bool,
  primary: PropTypes.bool,
  className: PropTypes.string
};

export default LoginButton;
