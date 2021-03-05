import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Alert } from 'antd';

import * as actions from '../../redux/actions';

import EditProfileStyle from './EditProfile.module.scss';

const EditProfile = ({
  putUpdateUser,
  token,
  clearEditProfileReducer,
  hasBeenTakenError,
  unexpectedError,
  editProfileSucces,
}) => {
  useEffect(() => () => clearEditProfileReducer(), [clearEditProfileReducer]);

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    console.dir(data);
    console.log(register);
    putUpdateUser(data.username, data.email, data.newPassword, data.avatar, token);
  };

  return (
    <div className={EditProfileStyle.container}>
      {editProfileSucces && (
        <Alert message="Profile succesfuly edited" type="success" className={EditProfileStyle.succes} />
      )}
      {!!unexpectedError && (
        <Alert
          message={`Ошибка ${unexpectedError}`}
          description="Не удалось запросить данные"
          type="error"
          className="unexpectedErrorGlobal"
        />
      )}
      <h1 className={EditProfileStyle.title}>Edit Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <span className={EditProfileStyle.inputTitle}>Username</span>
          <input
            className={EditProfileStyle.input}
            type="text"
            name="username"
            placeholder="Username"
            ref={register({ required: true })}
          />
          {errors.username && <p className={EditProfileStyle.inputValidError}>Username is required</p>}
          {hasBeenTakenError.username && (
            <p className={EditProfileStyle.inputValidError}>{`Username ${hasBeenTakenError.username}`}</p>
          )}
        </label>
        <label>
          <span className={EditProfileStyle.inputTitle}>Email adress</span>
          <input
            className={EditProfileStyle.input}
            type="email"
            name="email"
            placeholder="Email adress"
            ref={register({ required: true, pattern: { value: /^\S+@\S+$/i, message: 'Type in email adress' } })}
          />
          {errors.email && <p className={EditProfileStyle.inputValidError}>Email is required</p>}
          {hasBeenTakenError.email && (
            <p className={EditProfileStyle.inputValidError}>{`Email ${hasBeenTakenError.email}`}</p>
          )}
        </label>
        <label className={EditProfileStyle.inputContainer}>
          <span className={EditProfileStyle.inputTitle}>New Password</span>
          <input
            className={EditProfileStyle.input}
            type="password"
            name="newPassword"
            placeholder="New password"
            ref={register({ minLength: 8, maxLength: 40 })}
          />
          {errors.password && <p className={EditProfileStyle.inputValidError}>Password is required</p>}
        </label>
        <label className={EditProfileStyle.inputContainer}>
          <span className={EditProfileStyle.inputTitle}>Avatar image (url)</span>
          <input
            className={EditProfileStyle.input}
            type="url"
            name="avatar"
            placeholder="Avatar image"
            ref={register({
              pattern: {
                value: /[-a-zA-Z0-9@:%_.~#?&=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_.~#?&=]*)?/gi,
                message: 'Have to be URL',
              },
            })}
          />
          {errors.password && <p className={EditProfileStyle.inputValidError}>Password is required</p>}
        </label>
        <input className={EditProfileStyle.submit} type="submit" value="Save" />
      </form>
    </div>
  );
};

EditProfile.propTypes = {
  putUpdateUser: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  clearEditProfileReducer: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  hasBeenTakenError: PropTypes.object.isRequired,
  unexpectedError: PropTypes.number.isRequired,
  editProfileSucces: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.logedUserReducer.user.token,
  hasBeenTakenError: state.editProfileReducer.errors,
  unexpectedError: state.editProfileReducer.unexpectedError,
  editProfileSucces: state.editProfileReducer.editProfileSucces,
});

export default connect(mapStateToProps, actions)(EditProfile);
