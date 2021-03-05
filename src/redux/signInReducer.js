const initialValue = {
  passOrEmailIncorrect: false,
  unexpectedError: 0,
};

const signInReducer = (state = initialValue, action) => {
  const newState = { ...state };

  switch (action.type) {
    case 'SET_SIGN_IN_PASSWORD_OR_EMAIL_INCORRECT':
      newState.passOrEmailIncorrect = true;
      return newState;

    case 'SET_SIGN_IN_UNEXPECTED_ERR':
      newState.unexpectedError = action.payload;
      return newState;

    case 'CLEAN_SIGN_IN_REDUCER':
      return { ...initialValue };

    default:
      return state;
  }
};

export default signInReducer;
