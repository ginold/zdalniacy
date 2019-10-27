import React from 'react';
import PrimaryButton from '../primary-button/primary-button';
import TextField from '@material-ui/core/TextField';
import FacebookIcon from '@material-ui/icons/Facebook';
import GTranslateIcon from '@material-ui/icons/GTranslate';

function DisabledSteps(props) {
    const step = props.step
    const handleChange = props.handleChange
    const createAccount = props.createAccount
    let disabledData = props.disabledData
    let currentStep = props.currentStep

        return (
                
            [<div className="form-container step" key="1">
                <h2>Dane</h2>
                <TextField
                    label="E-mail"
                    name="email"
                    className="text-input"
                    value={disabledData.email}
                    onChange={handleChange('email', 'disabled')}
                    margin="normal"
                    variant="outlined"
                    aria-required="true"
                    aria-label="E-mail"
                />
                <TextField
                    label="Hasło"
                    name="password"
                    className="text-input"
                    value={disabledData.password}
                    onChange={handleChange('password', 'disabled')}
                    margin="normal"
                    variant="outlined"
                    aria-required="true"
                    aria-label="Hasło"
                />
                <PrimaryButton text="dalej" primary onClick={() => {step(currentStep+1)}} />
                <b>lub załóż konto za pomocą</b> 
                <div className="icons">
                    <span className="icon"><FacebookIcon/></span>
                    <span className="icon"><GTranslateIcon/></span>
                </div>
                <PrimaryButton text="Wróć" onClick={() => {step(currentStep-1)}} outlined/>
            </div>,

            <div key="2" className="form-container step">
                <h2>Kontakt</h2>
                <TextField
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

                <TextField
                    label="Telefon"
                    name="phonenumber"
                    className="text-input"
                    value={disabledData.phonenumber}
                    onChange={handleChange('phonenumber', 'disabled')}
                    margin="normal"
                    variant="outlined"
                    aria-required="true"
                    aria-label="phone number"
                />
            
                <TextField
                    label="Miasto"
                    name="city"
                    className="text-input"
                    value={disabledData.city}
                    onChange={handleChange('city', 'disabled')}
                    margin="normal"
                    variant="outlined"
                    aria-required="true"
                    aria-label="city"
                />
                <TextField
                    label="Kraj"
                    name="country"
                    className="text-input"
                    value={disabledData.country}
                    onChange={handleChange('country', 'disabled')}
                    margin="normal"
                    variant="outlined"
                    aria-required="true"
                    aria-label="country"
                />

                <PrimaryButton text="Załóż konto!" onClick={createAccount} primary/>
                <br aria-hidden="true"></br>
                <PrimaryButton text="Wróć" onClick={() => {step(currentStep-1)}} outlined/>

            </div>]
        )
    
}

export default DisabledSteps;