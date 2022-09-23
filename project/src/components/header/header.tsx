import * as React from 'react';
import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { IFilm } from '../../types/IFilm';

type HeaderProps = {
  isFilmCard?: boolean;
  isMyList?: boolean;
  isSignIn?: boolean;
  isError?: boolean;
  isAddReview?: boolean;
  filmsCount?: number;
  films?: IFilm[];
};

function Header(props: HeaderProps): JSX.Element {
  const params = useParams();
  const film = props.films?.find((item) => item.id === Number(params.id));

  const className = classNames({
    'page-header': true,
    'film-card__head': props.isFilmCard,
    'user-page__head': props.isMyList || props.isSignIn
  });

  return (
    <header className={className}>
      <div className='logo'>
        <Link to='/' className='logo__link'>
          <span className='logo__letter logo__letter--1'>W</span>
          <span className='logo__letter logo__letter--2'>T</span>
          <span className='logo__letter logo__letter--3'>W</span>
        </Link>
      </div>

      {props.isAddReview && !props.isError && (
        <nav className='breadcrumbs'>
          <ul className='breadcrumbs__list'>
            <li className='breadcrumbs__item'>
              <Link to={`/films/${film?.id}`} className='breadcrumbs__link'>
                {film?.name}
              </Link>
            </li>
            <li className='breadcrumbs__item'>
              <a className='breadcrumbs__link'>Add review</a>
            </li>
          </ul>
        </nav>
      )}

      {props.isMyList && !props.isError && (
        <h1 className='page-title user-page__title'>
          My list{' '}
          <span className='user-page__film-count'>{props.filmsCount}</span>
        </h1>
      )}

      {props.isSignIn && !props.isError && (
        <h1 className='page-title user-page__title'>Sign In</h1>
      )}

      {!props.isSignIn && !props.isError && (
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
