/* eslint-disable jsx-a11y/interactive-supports-focus */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { nanoid } from 'nanoid';

import { format } from 'date-fns';

import cn from 'classnames';

import articleStyle from './Article.module.scss';

// import ava from '../../imgs/Ava.png'

const Article = ({ title, favoritesCount, body, author, createdAt, tagList, slug }) => {
  const likesImgCn = cn(articleStyle.likes, articleStyle.likesImg);

  const tags = () =>
    tagList.map((el) => (
      <li className={articleStyle.tag} key={nanoid()}>
        {el}
      </li>
    ));

  const articleDate = () => {
    let month = new Date(Date.parse(createdAt));
    month = format(month, 'LLLL d, y');
    return month;
  };

  return (
    <div className={articleStyle.article}>
      <div className={articleStyle.post}>
        <div className={articleStyle.titleContainer}>
          <Link to={`/atricles/${slug}`}>
            <h1 className={articleStyle.title} title="перейти к статье">
              {/* <a role='button' id={slug}
              onClick={(event) => {
                event.preventDefault()
                console.dir(event.target.id)
              }}
              onKeyDown={(event) => {
                event.preventDefault()
                console.log(event.target)
              }}> */}
              {title}
              {/* </a> */}
            </h1>
          </Link>
          <div className={likesImgCn}>{favoritesCount}</div>
        </div>
        <ul type="none" className={articleStyle.tags}>
          {tags()}
        </ul>
        <p className={articleStyle.content}>{body}</p>
      </div>
      <div className={articleStyle.person}>
        <div className={articleStyle.personInfo}>
          <p className={articleStyle.personName}>{author.username}</p>
          <p className={articleStyle.personDate}>{articleDate()}</p>
        </div>
        <img className={articleStyle.avatar} src={author.image} alt="Аватар" />
      </div>
    </div>
  );
};

Article.propTypes = {
  title: PropTypes.string.isRequired,
  favoritesCount: PropTypes.number.isRequired,
  body: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  author: PropTypes.object.isRequired,
  createdAt: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  tagList: PropTypes.array.isRequired,
};

export default Article;
