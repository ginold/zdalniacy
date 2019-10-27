import React from 'react';
import PrimaryButton from '../primary-button/primary-button';
import TextField from '@material-ui/core/TextField';
import FacebookIcon from '@material-ui/icons/Facebook';
import GTranslateIcon from '@material-ui/icons/GTranslate';

function EmployerSteps(props) {
    const step = props.step
    const handleChange = props.handleChange
    const createAccount = props.createAccount
    const values = props.values
    
        return (
            // array so that there is only "one" root element, 2 divs in fact    
            [<div className="form-container step">
                <h2>Dane</h2>
                <TextField
                    label="E-mail firmowy"
                    name="email"
                    className="text-input"
                    value={values.email}
                    onChange={handleChange('email', 'employer')}
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
                    onChange={handleChange('password', 'employer')}
                    margin="normal"
                    variant="outlined"
                    aria-required="true"
                    aria-label="Hasło"
                />
                <PrimaryButton text="dalej" primary onClick={() => {step(values.currentStep+1)}} />
                <b>lub załóż konto za pomocą</b> 
                <div className="icons">
                    <span className="icon"><FacebookIcon/></span>
                    <span className="icon"><GTranslateIcon/></span>
                </div>
                <PrimaryButton text="Wróć" onClick={() => {step(values.currentStep-1)}} outlined/>
            </div>,

            <div className="form-container step">
                <h2>Kontakt</h2>
                <TextField
                    label="Data urodzenia"
                    name="birthdate"
                    className="text-input"
                    value={values.birthdate}
                    onChange={handleChange('birthdate', 'employer')}
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
                    label="Branża"
                    name="phonenumber"
                    className="text-input"
                    value={values.phonenumber}
                    onChange={handleChange('phonenumber', 'employer')}
                    margin="normal"
                    variant="outlined"
                    aria-required="true"
                    aria-label="phone number"
                />
            
                <TextField
                    label="Miasto"
                    name="city"
                    className="text-input"
                    value={values.city}
                    onChange={handleChange('city', 'employer')}
                    margin="normal"
                    variant="outlined"
                    aria-required="true"
                    aria-label="city"
                />
                <TextField
                    label="Kraj"
                    name="country"
                    className="text-input"
                    value={values.country}
                    onChange={handleChange('country', 'employer')}
                    margin="normal"
                    variant="outlined"
                    aria-required="true"
                    aria-label="country"
                />
                <PrimaryButton text="Załóż konto!" onClick={createAccount} primary/>
                <br aria-hidden="true"></br>
                <PrimaryButton text="Wróć" onClick={() => {step(values.currentStep-1)}} outlined/>

            </div>]
        )
    
}

export default EmployerSteps;