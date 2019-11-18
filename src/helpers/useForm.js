import { useState } from 'react';
import { ValidatorForm } from 'react-material-ui-form-validator';

const useForm = (initialValues, callback) => {
    const requiredFieldText = "To pole jest wymagane."
    const invalidEmail = 'E-mail jest nieprawidłowy.'
    const minLength = "Przynajmniej 5 znaków."
    const passwordMatch = "Hasła się nie zgadzają."

    const [values, setValues] = useState(initialValues);

    const handleSubmit = (event) => {
        if (event) event.preventDefault();
        callback();
    };

    const handleChange = (event) => {
        event.persist();
        setValues(values => ({ ...values, [event.target.name]: event.target.value }));
    };
    const isSamePassword = (password) => {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== password) {
                return false;
            }
            return true;
        });
    }

    return {
        handleChange,
        handleSubmit,
        values,
        isSamePassword,
        invalidEmail,
        passwordMatch,
        minLength,
        requiredFieldText
    }
};

export default useForm;