import * as React from 'react';
import classNames from 'classnames';

type Header = {
  isFilmCard?: boolean;
  isMyList?: boolean;
  isSignIn?: boolean;
};

function Header(props: Header): JSX.Element {
  const className = classNames({
    'page-header': true,
    'film-card__head': props.isFilmCard,
    'user-page__head': props.isMyList || props.isSignIn
  });

  return (
    <header className={className}>
      <div className='logo'>
        <a href='main.html' className='logo__link'>
          <span className='logo__letter logo__letter--1'>W</span>
          <span className='logo__letter logo__letter--2'>T</span>
          <span className='logo__letter logo__letter--3'>W</span>
        </a>
      </div>

      {props.isMyList && (
        <h1 className='page-title user-page__title'>
          My list <span className='user-page__film-count'>9</span>
        </h1>
      )}

      {props.isSignIn && (
        <h1 className='page-title user-page__title'>Sign In</h1>
      )}

      {!props.isSignIn && (
        <ul className='user-block'>
          <li className='user-block__item'>
            <div className='user-block__avatar'>
              <img
                src='/img/avatar.jpg'
                alt='User avatar'
                width='63'
                height='63'
              />
            </div>
          </li>
          <li className='user-block__item'>
            <a className='user-block__link'>Sign out</a>
          </li>
        </ul>
      )}
    </header>
  );
}

export default Header;
