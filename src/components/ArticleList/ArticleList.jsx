import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Pagination, Spin } from 'antd';

import Article from '../Article/Article';
import * as actions from '../../redux/actions';

import articleListStyle from './ArticleList.module.scss';
import 'antd/dist/antd.css';

const ArticleList = ({ currentPage, articles, setPage, getArticlesForPage, articlesLoading }) => {
  useEffect(() => {
    getArticlesForPage(currentPage);
  }, [currentPage, getArticlesForPage]);

  const createArticles = (stateArticles) => {
    const arrOfArticles = stateArticles.map((el) => (
      <li className={articleListStyle.article} key={el.slug}>
        <Article
          createdAt={el.createdAt}
          title={el.title}
          favorited={el.favorited}
          favoritesCount={el.favoritesCount}
          tagList={el.tagList}
          body={el.body}
          author={el.author}
          slug={el.slug}
        />
      </li>
    ));
    return arrOfArticles;
  };

  return (
    <div id="ArticleListContainer">
      {articlesLoading && <Spin id="spiner" size="large" className="ArticleListContainer__spiner" />}
      <ul type="none" className={articleListStyle.articleList}>
        {articles.length > 0 && !articlesLoading && createArticles(articles)}
      </ul>
      {articles.length > 0 && !articlesLoading && (
        <Pagination
          className="pagination"
          defaultCurrent={currentPage}
          showSizeChanger={false}
          total={5000}
          onChange={(page) => {
            setPage(page);
          }}
        />
      )}
    </div>
  );
};

ArticleList.propTypes = {
  currentPage: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  articles: PropTypes.array.isRequired,
  setPage: PropTypes.func.isRequired,
  getArticlesForPage: PropTypes.func.isRequired,
  articlesLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  currentPage: state.mainReducer.currentPage,
  articles: state.mainReducer.articles,
  articlesLoading: state.mainReducer.articlesLoading,
});

export default connect(mapStateToProps, actions)(ArticleList);
