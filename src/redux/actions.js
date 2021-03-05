export const deleteLoggedUser = () => ({ type: 'DELETE_LOGED_USER' });

export const setPage = (page) => ({ type: 'SET_PAGE', payload: page });

export const setArticlesForPage = (articles) => ({ type: 'SET_ARTICLES_FOR_PAGE', payload: articles });

export const setArticlesLoading = () => ({ type: 'SET_ARTICLES_LOADING' });

export const setErrGetArtForPage = () => ({ type: 'ERROR_GET_ARTICLES_FOR_PAGE' });

export const setSignUpUsername = (usn) => ({ type: 'SET_SIGN_UP_USERNAME', payload: usn });

export const setSignUpEmail = (mail) => ({ type: 'SET_SIGN_UP_EMAIL', payload: mail });

export const setSignUpPassword = (pas) => ({ type: 'SIGN_UP_PASSWORD', payload: pas });

export const setSignUpRepeatPassword = (pas) => ({ type: 'SIGN_UP_REPEAT_PASSWORD', payload: pas });

export const toogleAgreement = () => ({ type: 'TOOGLE_SIGN_UP_AGREEMENT' });

export const clearSignUpReducer = () => ({ type: 'CLEAR_SIGN_UP_REDUCER' });

export const setSignInPassOrEmailIncorrect = () => ({ type: 'SET_SIGN_IN_PASSWORD_OR_EMAIL_INCORRECT' });

export const cleanSignInReducer = () => ({ type: 'CLEAN_SIGN_IN_REDUCER' });

export const setEditProfileSucces = () => ({ type: 'SET_EDIT_PROFILE_SUCCES' });

export const setSignInUnexpectedErr = (err) => ({ type: 'SET_SIGN_IN_UNEXPECTED_ERR', payload: err });

export const setEditProfileUnexpectedError = (err) => ({ type: 'SET_EDIT_PROFILE_UNEXPECTED_ERROR', payload: err });

export const clearEditProfileReducer = () => ({ type: 'CLEAR_EDIT_PROFILE_REDUCER' });

export const setSignInEmail = (mail) => ({ type: 'SET_SIGN_IN_EMAIL', payload: mail });

export const setSignInPassword = (pas) => ({ type: 'SET_SIGN_IN_PASSWORD', payload: pas });

export const setLogedUser = (user) => ({ type: 'SET_LOGED_USER', payload: user });

export const setSignUpErrors = (err) => ({ type: 'SET_SIGN_UP_ERRORS', payload: err });

export const setEditProfileErrors = (err) => ({ type: 'SET_EDIT_PROFILE_ERRORS', payload: err });

export const setUnexpectedError = (unerr) => ({ type: 'SET_UNEXPECTED_ERROR', payload: unerr });

export const getArticlesForPage = (page) => async (dispatch) => {
  dispatch(setArticlesLoading());
  let skippedArticles = 0;
  if (page > 1) {
    skippedArticles = 5 * (page - 1);
  }
  let resp = await fetch(`https://conduit.productionready.io/api/articles?limit=5&offset=${skippedArticles}`);
  if (resp.ok) {
    resp = await resp.json();
    dispatch(setArticlesLoading());
    dispatch(setArticlesForPage(resp.articles));
  } else {
    dispatch(setArticlesLoading());
    dispatch(setErrGetArtForPage());
  }
};

export const postSignUp = (usn, mail, pas) => async (dispatch) => {
  const signUpData = {
    user: {
      username: usn,
      email: mail,
      password: pas,
    },
  };

  let resp = await fetch('https://conduit.productionready.io/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(signUpData),
  });

  if (resp.ok) {
    resp = await resp.json();
    // console.log(resp)
    dispatch(setLogedUser(resp));
    dispatch(setEditProfileSucces());
  } else if (resp.status === 422) {
    // console.log(resp)
    resp = await resp.json();
    dispatch(setSignUpErrors(resp.errors));
    // console.log(resp)
  } else {
    dispatch(setUnexpectedError(resp.status));
  }
};

export const postSignIn = (mail, pas) => async (dispatch) => {
  // console.log([mail, pas])
  const signInData = {
    user: {
      email: mail,
      password: pas,
    },
  };

  // console.log(JSON.stringify(signInData))

  let resp = await fetch('https://conduit.productionready.io/api/users/login', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(signInData),
  });

  if (resp.ok) {
    resp = await resp.json();
    dispatch(setLogedUser(resp));
    // console.log('ok')
  } else if (resp.status === 422) {
    resp = await resp.json();
    // console.log(resp)
    // console.log([mail, pas])
    dispatch(setSignInPassOrEmailIncorrect());
  } else {
    dispatch(setSignInUnexpectedErr(resp.status));
  }
};

export const putUpdateUser = (username, email, password, image, token) => async (dispatch) => {
  dispatch(clearEditProfileReducer());

  const updateUserData = {
    user: {
      username,
      email,
    },
  };

  if (password) {
    updateUserData.user.password = password;
  }
  if (image) {
    updateUserData.user.image = image;
  }

  let resp = await fetch('https://conduit.productionready.io/api/user', {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json; charset=utf-8',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(updateUserData),
  });

  // console.log(resp)

  if (resp.ok) {
    resp = await resp.json();
    // console.log(resp)
    dispatch(setLogedUser(resp));
    dispatch(setEditProfileSucces());
  } else if (resp.status === 422) {
    resp = await resp.json();
    // console.log(resp)
    dispatch(setEditProfileErrors(resp.errors));
  } else {
    console.log(resp.status);
    dispatch(setEditProfileUnexpectedError(resp.status));
  }
};
