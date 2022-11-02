import * as React from 'react';
import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import Logo from '../logo/logo';
import UserBlock from '../user-block/user-block';
import { useAppSelector } from '../../hooks/useAppSelector';
import { AuthorizationStatus } from '../../const';

type HeaderProps = {
  isFilmCard?: boolean;
  isMyList?: boolean;
  isSignIn?: boolean;
  isError?: boolean;
  isAddReview?: boolean;
  filmsCount?: number;
};

function Header(props: HeaderProps): JSX.Element {
  const params = useParams();
  const authorizationStatus = useAppSelector(
    (state) => state.authorizationStatus
  );
  const isAuth = authorizationStatus === AuthorizationStatus.Auth;
  const films = useAppSelector((state) => state.films);
  const film = films.find((item) => item.id === Number(params.id));

  const className = classNames({
    'page-header': true,
    'film-card__head': props.isFilmCard,
    'user-page__head': props.isMyList || props.isSignIn
  });

  return (
    <header className={className}>
      <Logo />
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

      {!props.isError && <UserBlock isAuth={isAuth} />}
    </header>
  );
}

export default Header;
