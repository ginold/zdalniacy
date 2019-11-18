import React from "react"
import './login.scss';
import logo from '../../static/logo/logo-wfb-white.svg';
import PrimaryButton from '../primary-button/primary-button';
import FacebookIcon from '@material-ui/icons/Facebook';
import FacebookLogin from 'react-facebook-login';
import Auth from "../../services/auth";
import unlockedLessonsService from "../../services/unlockedLessonsService";
import useForm from '../../helpers/useForm'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Spinner from "../spinner";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

function Login(props) {
  const [loginError, setLoginError] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [rememberMe, setRememberMe] = React.useState(false)

  const handleLogin = () => {
    setLoading(true)
    Auth.login({ password: values.password, email: values.email }).then(async (res) => {
      if (res.status === 200) {
        Auth.signIn()
        const data = await unlockedLessonsService.getUnlockedLessonsByUserId(res.data._id)
        Auth.setUserData({ ...res.data, unlockedLessons: data.lessons })
        if (rememberMe) Auth.rememberMe()
        redirect()
      }
    }).catch(err => {
      console.log(err)
      setLoginError(true)
      setLoading(false)
    })
  }
  const redirect = () => {
    if (props.location.state) {
      goTo(props.location.state.from)
    } else {
      goTo('/')
    }
  }
  const initialValues = {
    email: '', password: ''
  }
  const { values, handleChange, handleSubmit, invalidEmail, requiredFieldText } = useForm(initialValues, handleLogin);
  const goTo = (path) => {
    props.history.push(path);
  }
  return (
    <div className="signup-signin-window">
      <Spinner loading={loading} color="dark" />
      <section className="signup-signin-container">
        <div className="signup-signin-header">
          <img alt="white logo" src={logo}></img>
          <h1 className="title">Zaloguj się</h1>
        </div>
        <div className="form-container">
          <ValidatorForm onSubmit={handleSubmit}>
            <PrimaryButton text="Nie masz konta?" onClick={() => goTo('/signup')} outlined />
            <TextValidator
              label="E-mail"
              onChange={handleChange}
              name="email"
              margin="normal"
              variant="outlined"
              aria-required="true"
              aria-label="E-mail"
              value={values.email}
              validators={['required', 'isEmail']}
              errorMessages={[requiredFieldText, invalidEmail]}
            />
            <TextValidator
              id="password-input"
              label="Hasło"
              name="password"
              className="text-input"
              type="password"
              autoComplete="current-password"
              value={values.password}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              aria-required="true"
              aria-label="Hasło"
              validators={['required']}
              errorMessages={[requiredFieldText]}
            />
            <FormControlLabel
              className="remember-me"
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  value="checkedB"
                  inputProps={{
                    'aria-label': 'secondary checkbox',
                  }} />
              }
              label="Zapamiętaj mnie" />

            {loginError && <p>Błąd przy logowaniu.</p>}
            <PrimaryButton text="Login" primary onClick={handleSubmit} />
            <div className="other-login-options">
              <b>lub zaloguj się za pomocą</b>
              <div className="icons">
                <span className="icon">
                  {/* <FacebookLogin
                    appId="757649437992618"
                    size="small"
                    fields="name,email,picture"
                    callback={handleFacebookLogin} /> */}
                </span>
              </div>
              <PrimaryButton text="Wróć do strony głównej" onClick={() => goTo('/')} outlined green />
            </div>
          </ValidatorForm>
        </div>
      </section>
    </div>
  )

}

export default Login
