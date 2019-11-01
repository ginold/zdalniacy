import React from 'react';
// import PropTypes from 'prop-types';
import './signup.scss';

// import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
// import DateFnsUtils from '@date-io/date-fns';

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

function Signup(props) {
  let from = null;
  if (props.history.location.state) {
    from = props.history.location.state.from
  }
  const steps = ['Krok 1', 'Krok 2', 'Krok 3'];
  const containerElement = React.createRef()
  const stepsContainer = React.createRef()
  let containerWidth = () => { return parseInt(getComputedStyle(containerElement.current).width, 10) }

  const [disabledData, setDisabledData] = React.useState({
    birthdate: '', email: '', phonenumber: '', city: '',
    country: '', password: '', firstname: '', familyname: '', userName: ''
  })

  const [employerData, setEmployerData] = React.useState({
    email: '',
    fields: [],
    name: '',
    city: '',
    country: '',
    password: ''
  })
  const userData = { disabledData, employerData }

  const [values, setValues] = React.useState({
    currentStep: 0,
    userType: ''
  });

  const handleChange = (name, userType) => event => {
    if (userType === 'disabled') {
      setDisabledData({ ...disabledData, [name]: event.target.value });
    } else if (userType === 'employer') {
      setEmployerData({ ...employerData, [name]: event.target.value });
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
    const data = { ...userData[values.userType + 'Data'], ...{ userType: values.userType, points: 1000 } }
    Auth.createAccount(data).then(() => {
      Auth.signIn()
      Auth.setUserData(data)
      NotificationsService.pushNotification({ title: "Udało się! Witaj wsród nas :)" })
      goTo('/work')
    }).catch(err => console.log(err))
  }

  return (
    <div className="signup-signin-window">
      <div className="signup-signin-container" ref={containerElement}>
        <div className="signup-signin-header">
          <img alt="white logo" src={logo}></img>
          <h1>Załóż konto</h1>
        </div>

        <div className="steps-container" ref={stepsContainer}>

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
            createAccount={createAccount} currentStep={values.currentStep} disabledData={disabledData} />}
          {values.userType === 'employer' && <EmployerSteps step={step} containerWidth={containerWidth} handleChange={handleChange}
            createAccount={createAccount} values={values} />}
        </div> {/*.steps-container */}
      </div>

      {values.currentStep !== 0 &&
        <div className="info">
          <div className="progress">
            <Stepper activeStep={values.currentStep}>
              {steps.map((label) => {
                return (
                  <Step key={label}>
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
