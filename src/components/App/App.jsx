import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import { Alert } from 'antd';

import * as actions from '../../redux/actions';

import appStyle from './App.module.scss';

import Header from '../Header/Header';
import ArticleList from '../ArticleList/ArticleList';
import Article from '../Article/Article';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import EditProfile from '../EditProfile/EditProfile';

import 'antd/dist/antd.css';
// import OpenedArticle from '../OpenedArticle/OpenedArticle'

const App = ({ articles, errorGetArticlesForPage, logedUser, setLogedUser }) => {
  useEffect(() => {
    // console.log(localStorage)
    // localStorage.clear()
    console.log(Object.keys(logedUser.user).length === 0 && !!localStorage.getItem('storageUser'));
    console.log(logedUser);
    console.log(localStorage);

    if (Object.keys(logedUser.user).length !== 0) {
      localStorage.setItem('storageUser', JSON.stringify(logedUser));
      console.log(localStorage);
    }
    if (Object.keys(logedUser.user).length === 0 && !!localStorage.getItem('storageUser')) {
      let extractedStorageUse = localStorage.getItem('storageUser');
      extractedStorageUse = JSON.parse(extractedStorageUse);
      console.log(extractedStorageUse);
      setLogedUser(extractedStorageUse);
    }
  }, [logedUser, setLogedUser]);

  return (
    <div className={appStyle.container}>
      <BrowserRouter>
        <Route path="/" component={Header} />
        <Route
          exact
          path={['/', '/articles']}
          render={() => {
            if (errorGetArticlesForPage) {
              return (
                <Alert message="Ошибка" description="Не удалось получить статьи с сервера" type="error" showIcon />
              );
            }
            return <ArticleList />;
          }}
        />
        <Route
          exact
          path="/atricles/:slug"
          render={({ match }) => {
            const [selectedArticle] = articles.filter((el) => el.slug === match.params.slug);
            return (
              <Article
                createdAt={selectedArticle.createdAt}
                title={selectedArticle.title}
                favorited={selectedArticle.favorited}
                favoritesCount={selectedArticle.favoritesCount}
                tagList={selectedArticle.tagList}
                body={selectedArticle.body}
                author={selectedArticle.author}
                slug={selectedArticle.slug}
              />
            );
          }}
        />
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/profile" component={EditProfile} />
      </BrowserRouter>
      {/* <OpenedArticle /> */}
    </div>
  );
};

App.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  articles: PropTypes.array.isRequired,
  errorGetArticlesForPage: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  logedUser: PropTypes.object.isRequired,
  setLogedUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  articles: state.mainReducer.articles,
  errorGetArticlesForPage: state.errReducer.errorGetArticlesForPage,
  logedUser: state.logedUserReducer,
});

export default connect(mapStateToProps, actions)(App);
