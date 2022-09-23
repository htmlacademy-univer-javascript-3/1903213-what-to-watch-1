import * as React from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { IFilm } from '../../types/IFilm';
import FilmList from '../../components/film-list/film-list';
import { Link } from 'react-router-dom';

type MainProps = {
  promoFilm: IFilm;
  films: IFilm[];
};

function Main({ promoFilm, films }: MainProps): JSX.Element {
  return (
    <>
      <section className='film-card'>
        <div className='film-card__bg'>
          <img src={promoFilm.backgroundImage} alt={promoFilm.name} />
        </div>

        <h1 className='visually-hidden'>WTW</h1>

        <Header isFilmCard />

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
                <Link
                  className='btn btn--play film-card__button'
                  to={`/player/${promoFilm.id}`}
                >
                  <svg viewBox='0 0 19 19' width='19' height='19'>
                    <use xlinkHref='#play-s'></use>
                  </svg>
                  <span>Play</span>
                </Link>
                <button
                  className='btn btn--list film-card__button'
                  type='button'
                >
                  <svg viewBox='0 0 19 20' width='19' height='20'>
                    <use xlinkHref='#add'></use>
                  </svg>
                  <span>My list</span>
                  <span className='film-card__count'>9</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className='page-content'>
        <section className='catalog'>
          <h2 className='catalog__title visually-hidden'>Catalog</h2>

          <ul className='catalog__genres-list'>
            <li className='catalog__genres-item catalog__genres-item--active'>
              <a href='#' className='catalog__genres-link'>
                All genres
              </a>
            </li>
            <li className='catalog__genres-item'>
              <a href='#' className='catalog__genres-link'>
                Comedies
              </a>
            </li>
            <li className='catalog__genres-item'>
              <a href='#' className='catalog__genres-link'>
                Crime
              </a>
            </li>
            <li className='catalog__genres-item'>
              <a href='#' className='catalog__genres-link'>
                Documentary
              </a>
            </li>
            <li className='catalog__genres-item'>
              <a href='#' className='catalog__genres-link'>
                Dramas
              </a>
            </li>
            <li className='catalog__genres-item'>
              <a href='#' className='catalog__genres-link'>
                Horror
              </a>
            </li>
            <li className='catalog__genres-item'>
              <a href='#' className='catalog__genres-link'>
                Kids & Family
              </a>
            </li>
            <li className='catalog__genres-item'>
              <a href='#' className='catalog__genres-link'>
                Romance
              </a>
            </li>
            <li className='catalog__genres-item'>
              <a href='#' className='catalog__genres-link'>
                Sci-Fi
              </a>
            </li>
            <li className='catalog__genres-item'>
              <a href='#' className='catalog__genres-link'>
                Thrillers
              </a>
            </li>
          </ul>
          <div className='catalog__films-list'>
            <FilmList films={films} />
          </div>
          <div className='catalog__more'>
            <button className='catalog__button' type='button'>
              Show more
            </button>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}

export default Main;
