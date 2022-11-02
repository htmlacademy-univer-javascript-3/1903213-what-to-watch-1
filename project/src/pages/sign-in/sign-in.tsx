import * as React from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { FormEvent, useRef } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useNavigate } from 'react-router-dom';
import { loginAction } from '../../store/api-actions';
import { IAuth } from '../../types/IAuth';

function SignIn(): JSX.Element {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = (authData: IAuth) => {
    dispatch(loginAction(authData));
    navigate('/');
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (emailRef.current !== null && passwordRef.current !== null) {
      onSubmit({
        login: emailRef.current.value,
        password: passwordRef.current.value
      });
    }
  };

  return (
    <div className='user-page'>
      <Header isSignIn />

      <div className='sign-in user-page__content'>
        <form action='' className='sign-in__form' onSubmit={handleSubmit}>
          <div className='sign-in__fields'>
            <div className='sign-in__field'>
              <input
                className='sign-in__input'
                type='email'
                placeholder='Email address'
                name='user-email'
                id='user-email'
                ref={emailRef}
              />
              <label
                className='sign-in__label visually-hidden'
                htmlFor='user-email'
              >
                Email address
              </label>
            </div>
            <div className='sign-in__field'>
              <input
                className='sign-in__input'
                type='password'
                placeholder='Password'
                name='user-password'
                id='user-password'
                ref={passwordRef}
              />
              <label
                className='sign-in__label visually-hidden'
                htmlFor='user-password'
              >
                Password
              </label>
            </div>
          </div>
          <div className='sign-in__submit'>
            <button className='sign-in__btn' type='submit'>
              Sign in
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default SignIn;
