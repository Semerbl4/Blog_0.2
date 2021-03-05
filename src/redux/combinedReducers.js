import { combineReducers } from 'redux';

import mainReducer from './mainReducer';
import errReducer from './errReducer';
import signUpReducer from './signUpReducer';
import signInReducer from './signInReducer';
import logedUserReducer from './logedUserReducer';
import editProfileReducer from './editProfileReducer';

export default combineReducers({
  mainReducer,
  errReducer,
  signUpReducer,
  logedUserReducer,
  signInReducer,
  editProfileReducer,
});
