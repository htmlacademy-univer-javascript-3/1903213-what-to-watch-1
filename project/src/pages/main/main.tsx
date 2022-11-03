import * as React from 'react';
import { Fragment, useEffect, useState } from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import FilmList from '../../components/film-list/film-list';
import { Link } from 'react-router-dom';
import GenresNav from '../../components/genres-nav/genres-nav';
import ShowMore from '../../components/show-more/show-more';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { changeGenre, resetFilmsCount } from '../../store/action';
import { INITIAL_GENRE } from '../../store/reducer';
import { store } from '../../store';
import {
  fetchFavoritesAction,
  fetchFilmsAction,
  fetchPromoFilmAction,
  setFavoriteAction
} from '../../store/api-actions';
import { useAppSelector } from '../../hooks/useAppSelector';
import { AuthorizationStatus, FavoritesStatus } from '../../const';

store.dispatch(fetchFilmsAction());
store.dispatch(fetchPromoFilmAction());
store.dispatch(fetchFavoritesAction());

function Main(): JSX.Element {
  const dispatch = useAppDispatch();
  const promoFilm = useAppSelector((state) => state.promoFilm);
  const favorites = useAppSelector((state) => state.favoritesFilms);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  const onPageUpdateResetFilms = () => {
    dispatch(changeGenre(INITIAL_GENRE));
    dispatch(fetchFilmsAction());
    dispatch(resetFilmsCount());
  };

  const [inList, setInList] = useState(
    favorites?.filter((item) => item.id === promoFilm.id).length > 0
  );

  const onChangeMyListClick = () => {
    dispatch(
      setFavoriteAction({
        filmId: promoFilm.id,
        status: inList ? FavoritesStatus.RemoveFavorite : FavoritesStatus.AddFavorite
      })
    );
    setInList(!inList);
  };

  useEffect(() => {
    onPageUpdateResetFilms();
  }, []);

  return (
    <Fragment>
      <section className='film-card'>
        <div className='film-card__bg'>
          <img src={promoFilm.backgroundImage} alt={promoFilm.name} />
        </div>

        <h1 className='visually-hidden'>WTW</h1>

        <Header isFilmCard isSignIn />

        <div className='film-card__wrap'>
          <div className='film-card__info'>
            <div className='film-card__poster'>
              <img
                src={promoFilm.posterImage}
                alt={`${promoFilm.name} poster`}
                width='218'
                height='327'
              />
            </div>

            <div className='film-card__desc'>
              <h2 className='film-card__title'>{promoFilm.name}</h2>
              <p className='film-card__meta'>
                <span className='film-card__genre'>{promoFilm.genre}</span>
                <span className='film-card__year'>{promoFilm.released}</span>
              </p>

              <div className='film-card__buttons'>
                <Link className='btn btn--play film-card__button' to={`/player/${promoFilm.id}`}>
                  <svg viewBox='0 0 19 19' width='19' height='19'>
                    <use xlinkHref='#play-s'></use>
                  </svg>
                  <span>Play</span>
                </Link>
                {authorizationStatus === AuthorizationStatus.Auth && (
                  <button
                    className='btn btn--list film-card__button'
                    type='button'
                    onClick={onChangeMyListClick}
                  >
                    <svg viewBox='0 0 19 20' width='19' height='20'>
                      <use xlinkHref={`${inList ? '#in-list' : '#add'}`}></use>
                    </svg>
                    <span>My list</span>
                    <span className='film-card__count'>{favorites.length}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className='page-content'>
        <section className='catalog'>
          <h2 className='catalog__title visually-hidden'>Catalog</h2>
          <GenresNav />
          <div className='catalog__films-list'>
            <FilmList />
          </div>
          <div className='catalog__more'>
            <ShowMore />
          </div>
        </section>
        <Footer />
      </div>
    </Fragment>
  );
}

export default Main;
