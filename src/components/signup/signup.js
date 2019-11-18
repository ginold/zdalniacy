import React from 'react';
// import PropTypes from 'prop-types';
import './signup.scss';
import logo from '../../static/logo/logo-wfb-white.svg';
import EmployerSteps from '../employerSteps/employerSteps';
import DisabledSteps from '../disabledSteps/disabledSteps';
import WorkIcon from '@material-ui/icons/Work';
import PersonIcon from '@material-ui/icons/Person';
import PrimaryButton from '../primary-button/primary-button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { Button } from '@material-ui/core';
import NotificationsService from '../../services/notificationsService'
import Auth from '../../services/auth';
import LoginButton from '../loginButton/loginButton';
import { ValidatorForm } from 'react-material-ui-form-validator';

function Signup(props) {
  let from = null;
  if (props.history.location.state) {
    from = props.history.location.state.from
  }
  const steps = ['Krok 1', 'Krok 2', 'Krok 3'];
  const containerElement = React.createRef()
  const stepsContainer = React.createRef()
  const [loading, setLoading] = React.useState(false)
  let containerWidth = () => { return parseInt(getComputedStyle(containerElement.current).width, 10) }

  const [userData, setUserData] = React.useState({
    birthdate: '', email: '', phonenumber: '', city: '', repeatPassword: '',
    country: '', password: '', firstname: '', familyname: '', userName: ''
  })

  const [values, setValues] = React.useState({
    currentStep: 0, userType: ''
  });

  const handleChange = (name, userType) => event => {
    if (userType) {
      setUserData({ ...userData, [name]: event.target.value });
    } else {
      setValues({ ...values, [name]: event.target.value });
    }
  };

  const goTo = (path) => {
    props.history.push(path);
  }
  // IS LATE ON CURRENSTSTEP VALUE, wtf with state?
  const step = (step) => {
    values.currentStep = step
    setValues({ ...values, currentStep: step });
    stepsContainer.current.style.transform = `translate(-${step * containerWidth()}px)`
  }

  // TODO send only necessary values
  const createAccount = () => {
    setLoading(true)
    const data = { ...userData, ...{ userType: values.userType } }
    Auth.createAccount(data).then((userData) => {
      setLoading(false)
      Auth.signIn()
      Auth.setUserData(userData.data)
      NotificationsService.pushNotification({ title: "Udało się! Witaj wsród nas :)" })
      goTo('/')
    }).catch(err => console.log(err))
  }

  return (
    <div className={`signup-signin-window ${loading ? 'loading' : ''}`}>
      <div className="signup-signin-container" ref={containerElement}>
        <div className="signup-signin-header">
          <img alt="white logo" src={logo}></img>
          <h1 className="title">Załóż konto</h1>
        </div>

        <div ref={stepsContainer} className="steps-container">
          <ValidatorForm onSubmit={createAccount}>

            <div className="step form-container">
              <h2>Jestem</h2>
              <br aria-hidden="true"></br>
              <hr></hr>
              <Button className="choose-usertype" onClick={() => { step(values.currentStep + 1); setValues({ ...values, userType: 'disabled' }); }}>
                <PersonIcon></PersonIcon>
                <p className="usertype">Osobą niepełnosprawną</p>
              </Button>
              <hr></hr>
              <Button className="choose-usertype" onClick={() => { step(values.currentStep + 1); setValues({ ...values, userType: 'employer' }); }}>
                <WorkIcon></WorkIcon>
                <p className="usertype">Pracodawcą</p>
              </Button>
              <hr></hr>

              <p>Masz już konto?</p>
              <LoginButton from={from} outlined />
              <p>lub</p>
              <PrimaryButton text="Wróć do strony głównej" onClick={() => goTo('/')} outlined green />
            </div>

            {values.userType === 'disabled' && <DisabledSteps step={step} containerWidth={containerWidth} handleChange={handleChange}
              createAccount={createAccount} currentStep={values.currentStep} userData={userData} />}
            {values.userType === 'employer' && <EmployerSteps step={step} containerWidth={containerWidth} handleChange={handleChange}
              createAccount={createAccount} values={values} />}
          </ValidatorForm>
        </div> {/*.steps-container */}
      </div>

      {values.currentStep !== 0 &&
        <div className="info">
          <div className="progress">
            <Stepper activeStep={values.currentStep}>
              {steps.map((label, i) => {
                return (
                  <Step key={i + '-step'}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </div>
          {values.userType === 'disabled' ?
            <div className="message">
              <h2>Załóż konto, żeby</h2>
              <ul>
                <li>znaleźć pracę marzeń</li>
                <li>poznać nowych użytkowników</li>
                <li>nauczyć się nowych rzeczy</li>
                <li>rozmawiać z naszymi mentorami</li>
              </ul>
            </div> :
            <div className="message">
              <h2>Załóż konto, żeby</h2>
              <ul>
                <li>publickować oferty pracy</li>
                <li>poznać nowych użytkowników</li>
                <li>coś tam</li>
                <li>no dobra</li>
              </ul>
            </div>}
        </div>} {/* info */}

    </div>
  )

}

Signup.propTypes = {};

export default Signup;
