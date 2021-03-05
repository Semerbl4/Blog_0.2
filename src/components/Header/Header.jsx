import React from 'react';
import { Link } from 'react-router-dom';
// import cn from 'classnames';

import HeaderRightSide from '../HeaderRightSide/HeaderRightSide';

import headerStyle from './Header.module.scss';

const Header = () => (
  <div className={headerStyle.container}>
    <Link to="/">
      <div className={headerStyle.titleContainer}>
        <p className={headerStyle.title}>Realworld Blog</p>
      </div>
    </Link>
    <HeaderRightSide />
  </div>
);

export default Header;
