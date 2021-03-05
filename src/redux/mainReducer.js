const initialState = {
  currentPage: 1,
  articles: [],
  articlesLoading: false,
};

const reducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case 'SET_ARTICLES_LOADING':
      newState.articlesLoading = !newState.articlesLoading;
      return newState;

    case 'SET_PAGE':
      newState.currentPage = action.payload;
      return newState;

    case 'SET_ARTICLES_FOR_PAGE':
      newState.articles = action.payload;
      return newState;

    default:
      return state;
  }
};

export default reducer;
