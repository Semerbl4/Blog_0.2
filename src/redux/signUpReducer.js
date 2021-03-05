const initialValue = {
  username: '',
  email: '',
  password: '',
  repeatPassword: '',
  agreement: false,
  signUpSucces: false,
  errors: {},
  unexpectedError: 0,
};

const signUpReducer = (state = initialValue, action) => {
  const newState = { ...state };
  newState.errors = { ...state.errors };

  switch (action.type) {
    case 'SET_UNEXPECTED_ERROR':
      newState.unexpectedError = action.payload;
      return newState;

    case 'SET_SIGN_UP_ERRORS':
      newState.errors = { ...action.payload };
      return newState;

    case 'CLEAR_SIGN_UP_REDUCER':
      for (const key in newState) {
        if (key === 'signUpSucces') {
          // eslint-disable-next-line no-continue
          continue;
        }
        newState.key = initialValue.key;
      }
      return newState;

    case 'TOOGLE_SIGN_UP_AGREEMENT':
      newState.agreement = !newState.agreement;
      return newState;

    case 'SET_SIGN_UP_EMAIL':
      newState.email = action.payload;
      return newState;

    case 'SET_SIGN_UP_USERNAME':
      newState.username = action.payload;
      return newState;

    case 'SIGN_UP_PASSWORD':
      newState.password = action.payload;
      return newState;

    case 'SIGN_UP_REPEAT_PASSWORD':
      newState.repeatPassword = action.payload;
      return newState;

    default:
      return state;
  }
};

export default signUpReducer;
