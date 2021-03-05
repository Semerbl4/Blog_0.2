import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import * as actions from '../../redux/actions';

import ava from '../../imgs/Ava.png';

import headerRSStyle from './HeaderRightSide.module.scss';

const HeaderRightSide = ({ user, deleteLoggedUser }) => {
  // console.log(user.image)

  const buttonSIClasses = cn(headerRSStyle.button, headerRSStyle.buttonSI);
  const buttonSUClasses = cn(headerRSStyle.button, headerRSStyle.buttonSU);
  const buttonLOClasses = cn(headerRSStyle.button, headerRSStyle.buttonLO);

  if (Object.keys(user).length === 0) {
    return (
      <div className={headerRSStyle.buttonsContainer}>
        <Link to="/sign-in">
          <button type="button" className={buttonSIClasses}>
            Sign in
          </button>
        </Link>
        <Link to="/sign-up">
          <button type="button" className={buttonSUClasses}>
            Sign Up
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className={headerRSStyle.buttonsContainer}>
      <Link to="/">
        <button type="button" className={headerRSStyle.ButtonCreateArtc}>
          Create Article
        </button>
      </Link>
      <Link to="/profile">
        <div className={headerRSStyle.userContainer}>
          <span className={headerRSStyle.username}>{user.username}</span>
          <img src={user.image || ava} alt="avatar" className={headerRSStyle.avatar} />
        </div>
      </Link>
      <Link to="">
        <button
          type="button"
          className={buttonLOClasses}
          onClick={() => {
            deleteLoggedUser();
            localStorage.clear();
          }}
        >
          Log Out
        </button>
      </Link>
    </div>
  );
};

HeaderRightSide.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object.isRequired,
  deleteLoggedUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.logedUserReducer.user,
});

export default connect(mapStateToProps, actions)(HeaderRightSide);
