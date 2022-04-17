import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { login } from '../../Services/Assignment.service';
import './Login.scss';
import { EMAIL_REGEXP } from '../../Constants/Auth.constants';
import { Input } from '../../Components/Input/Input';

export function Login({ setToken }: { setToken: (token: string) => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [validationForm, setValidationForm] = useState({
    name: '',
    email: '',
  })
  const [isValid, setIsValid] = useState<boolean>();

  const navigate = useNavigate();

  useEffect(() => {
    setIsValid(!validationForm.email && !validationForm.name);
  }, [validationForm])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await validateForm();

    if (!isValid) {
      return;
    }

    try {
      const token = await login({
        name,
        email,
      });

      setToken(token);
      navigate("../", { replace: true });
    } catch (e) {
      console.error(e);
    }
  }

  const validateForm = async () => {
    await validateName();
    await validateEmail();
  }

  const validateName = async () => {
    let tempValidationForm = { ...validationForm };

    if (!name) {
      tempValidationForm = { ...tempValidationForm, name: 'Invalid name' };
    } else {
      tempValidationForm = { ...tempValidationForm, name: '' };
    }

    await setValidationForm(tempValidationForm);
  }

  const validateEmail = async () => {
    let tempValidationForm = { ...validationForm };

    if (!EMAIL_REGEXP.test(email)) {
      tempValidationForm = { ...tempValidationForm, email: 'Invalid email' };
    } else {
      tempValidationForm = { ...tempValidationForm, email: '' };
    }


    await setValidationForm(tempValidationForm);
  }

  const changeEmail = async ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    await setValidationForm({ ...validationForm, email: '' });
    await setEmail(value);
  }

  const changeName = async ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    await setValidationForm({ ...validationForm, name: '' });
    await setName(value);
  }

  return(
    <div className="login__wrapper">
      <form
        className="login__form"
        onSubmit={handleSubmit}
      >
        <h2>
          Login
        </h2>
        <div className="login__input">
          <Input
            id="name"
            label="Name"
            invalidMessage={validationForm.name}
            validate={validateName}
            changeValue={changeName}
          />
        </div>
        <div className="login__input">
          <Input
            id="email"
            label="Email"
            invalidMessage={validationForm.email}
            validate={validateEmail}
            changeValue={changeEmail}
          />
        </div>
        <button
          type="submit"
          className="login__button"
        >
          Submit
        </button>
      </form>
    </div>
  )
}
