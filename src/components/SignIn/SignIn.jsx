import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link, withRouter } from 'react-router-dom';

import { Alert } from 'antd';

import * as actions from '../../redux/actions';
import SignInStyle from './SignIn.module.scss';

const SignIn = ({ postSignIn, passOrEmailIncorrect, unexpectedError, history, user, cleanSignInReducer }) => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    // console.log(data.password)
    postSignIn(data.email, data.password);
    // history.push('/')
  };

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      history.push('/');
    }
    return () => cleanSignInReducer();
  }, [user, history, cleanSignInReducer]);

  return (
    <div className={SignInStyle.container}>
      {passOrEmailIncorrect && (
        <Alert message="Email or password is invalid" type="error" className={SignInStyle.passOrEmailIncor} />
      )}
      {!!unexpectedError && (
        <Alert
          message={`Ошибка ${unexpectedError}`}
          description="Не удалось запросить данные"
          type="error"
          className="unexpectedErrorGlobal"
        />
      )}
      <h1 className={SignInStyle.title}>Sign in</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <span className={SignInStyle.inputTitle}>Email adress</span>
          <input
            className={SignInStyle.input}
            type="email"
            name="email"
            placeholder="Email adress"
            ref={register({ required: true, pattern: /^\S+@\S+$/i })}
          />
          {errors.email && <p className={SignInStyle.inputValidError}>Email is required</p>}
        </label>
        <label className={SignInStyle.inputContainer}>
          <span className={SignInStyle.inputTitle}>Password</span>
          <input
            className={SignInStyle.input}
            type="password"
            name="password"
            placeholder="Password"
            ref={register({ required: true })}
          />
          {errors.password && <p className={SignInStyle.inputValidError}>Password is required</p>}
        </label>
        <input className={SignInStyle.login} type="submit" value="Login" />
        <p className={SignInStyle.signUpOffer}>
          Don&apos;t have an account?
          <Link to="/sign-up" className={SignInStyle.redirect}>
            {' '}
            Sign Up.
          </Link>
        </p>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  passOrEmailIncorrect: state.signInReducer.passOrEmailIncorrect,
  unexpectedError: state.signInReducer.unexpectedError,
  user: state.logedUserReducer.user,
});

SignIn.propTypes = {
  passOrEmailIncorrect: PropTypes.bool.isRequired,
  postSignIn: PropTypes.func.isRequired,
  unexpectedError: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object.isRequired,
  cleanSignInReducer: PropTypes.func.isRequired,
};

export default withRouter(connect(mapStateToProps, actions)(SignIn));
