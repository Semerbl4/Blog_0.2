const initialValue = {
  errors: {},
  unexpectedError: 0,
  editProfileSucces: false,
};

const editProfileReducer = (state = initialValue, action) => {
  const newState = { ...initialValue };

  switch (action.type) {
    case 'SET_EDIT_PROFILE_ERRORS':
      newState.errors = action.payload;
      return newState;

    case 'SET_EDIT_PROFILE_UNEXPECTED_ERROR':
      newState.unexpectedError = action.payload;
      return newState;

    case 'SET_EDIT_PROFILE_SUCCES':
      newState.editProfileSucces = true;
      return newState;

    case 'CLEAR_EDIT_PROFILE_REDUCER':
      return initialValue;

    default:
      return state;
  }
};

export default editProfileReducer;
