import React from "react"
import './login.scss';
import TextField from '@material-ui/core/TextField';
import logo from '../../static/logo/logo-wfb-white.svg';
import PrimaryButton from '../primary-button/primary-button';
import FacebookIcon from '@material-ui/icons/Facebook';
import GTranslateIcon from '@material-ui/icons/GTranslate';

import FacebookLogin from 'react-facebook-login';
import Auth from "../../auth";


function Login(props) {

  const [values, setValues] = React.useState({
    password: '', email: '', fromFacebook: false
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };
  const handleFacebookLogin = res => {
    Auth.signIn()
    Auth.setUserData({ ...res, fromFacebook: true })
    goTo('/work')
  }
  const handleLogin = () => {
    Auth.signIn()
    Auth.setUserData(values)
    goTo('/')
  }
  const goTo = (path) => {
    props.history.push(path);
  }
  return (
    <div className="signup-signin-window">
      <div className="signup-signin-container">
        <div className="signup-signin-header">
          <img alt="white logo" src={logo}></img>
          <h1>Zaloguj się</h1>
        </div>
        <div className="form-container">
          <form>
            <PrimaryButton text="Nie masz konta?" onClick={() => goTo('/signup')} outlined />

            <TextField
              label="E-mail"
              name="email"
              className="text-input"
              value={values.email}
              onChange={handleChange('email')}
              margin="normal"
              variant="outlined"
              aria-required="true"
              aria-label="E-mail"
            />
            <TextField
              label="Hasło"
              name="password"
              className="text-input"
              value={values.password}
              onChange={handleChange('password')}
              margin="normal"
              variant="outlined"
              aria-required="true"
              aria-label="Hasło"
            />

            <PrimaryButton text="Login" primary onClick={handleLogin} />
            <div className="other-login-options">
              <b>lub zaloguj się za pomocą</b>
              <div className="icons">
                <span className="icon">
                  <FacebookLogin
                    appId="757649437992618"
                    size="small"
                    fields="name,email,picture"
                    callback={handleFacebookLogin} />
                </span>
                <span className="icon"><GTranslateIcon /></span>
              </div>
              <PrimaryButton text="Wróć do strony głównej" onClick={() => goTo('/')} outlined green />
            </div>
          </form>
        </div>
      </div>
    </div>
  )

}

export default Login
