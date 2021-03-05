const initialValue = {
  user: {},
};

const logedUserReducer = (state = initialValue, action) => {
  const newState = { ...initialValue };

  switch (action.type) {
    case 'DELETE_LOGED_USER':
      return initialValue;

    case 'SET_LOGED_USER':
      newState.user = { ...action.payload.user };
      return newState;

    default:
      return state;
  }
};

export default logedUserReducer;
