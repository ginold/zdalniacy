import React from 'react';
import PrimaryButton from '../primary-button/primary-button';
import FacebookIcon from '@material-ui/icons/Facebook';
import { TextValidator } from 'react-material-ui-form-validator';
import useForm from '../../helpers/useForm'

function DisabledSteps(props) {
    const step = props.step
    const handleChange = props.handleChange
    const createAccount = props.createAccount
    let disabledData = props.userData
    let currentStep = props.currentStep
    const { isSamePassword, requiredFieldText, invalidEmail,
        passwordMatch, minLength } = useForm()
    isSamePassword(disabledData.password)

    return (
        <>
            <div className="form-container step" key="1">
                <h2>Dane</h2>
                <TextValidator
                    label="E-mail"
                    name="email"
                    className="text-input"
                    value={disabledData.email}
                    onChange={handleChange('email', 'disabled')}
                    margin="normal"
                    variant="outlined"
                    aria-required="true"
                    aria-label="E-mail"
                    validators={['required', 'isEmail']}
                    errorMessages={[requiredFieldText, invalidEmail]}
                />
                <TextValidator
                    label="Hasło"
                    name="password"
                    className="text-input"
                    value={disabledData.password}
                    onChange={handleChange('password', 'disabled')}
                    margin="normal"
                    variant="outlined"
                    aria-required="true"
                    aria-label="password"
                    type="password"
                    id="password-field"
                    validators={['required', 'minStringLength:5']}
                    errorMessages={[requiredFieldText, minLength]}
                />
                <TextValidator
                    label="Powtórz hasło"
                    name="repeatPassword"
                    className="text-input"
                    value={disabledData.repeatPassword}
                    onChange={handleChange('repeatPassword', 'disabled')}
                    margin="normal"
                    variant="outlined"
                    type="password"
                    aria-required="true"
                    aria-label="repeatPassword"
                    id="repeat-password-field"
                    validators={['required', 'isPasswordMatch']}
                    errorMessages={[requiredFieldText, passwordMatch]}
                />
                <PrimaryButton text="dalej" primary onClick={() => { step(currentStep + 1) }} />
                <p><b>lub załóż konto za pomocą</b></p>
                <div className="icons">
                    <span className="icon"><FacebookIcon /></span>
                </div>
                <PrimaryButton text="Wróć" onClick={() => { step(currentStep - 1) }} outlined />
            </div>

            <div key="2" className="form-container step">
                <h2>Kontakt</h2>
                <TextValidator
                    label="Imię"
                    name="firstname"
                    className="text-input"
                    value={disabledData.firstname}
                    onChange={handleChange('firstname', 'disabled')}
                    margin="normal"
                    variant="outlined"
                    aria-required="true"
                    aria-label="first name"
                />
                <TextValidator
                    label="Nazwisko"
                    name="familyname"
                    className="text-input"
                    value={disabledData.familyname}
                    onChange={handleChange('familyname', 'disabled')}
                    margin="normal"
                    variant="outlined"
                    aria-required="true"
                    aria-label="family name"
                />
                <TextValidator
                    label="Data urodzenia"
                    name="birthdate"
                    className="text-input"
                    value={disabledData.birthdate}
                    onChange={handleChange('birthdate', 'disabled')}
                    margin="normal"
                    variant="outlined"
                    aria-required="true"
                    aria-label="birth date"
                />
                {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>

                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Data urodzenia"
                    value={values.birthdate}
                    KeyboardButtonProps={{
                    'aria-label': 'change date',
                    }}
                />
                </MuiPickersUtilsProvider> */}

                <PrimaryButton text="Załóż konto!" onClick={createAccount} primary />
                <br aria-hidden="true"></br>
                <PrimaryButton text="Wróć" onClick={() => { step(currentStep - 1) }} outlined />

            </div>
        </>
    )

}

export default DisabledSteps;