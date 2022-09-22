import * as React from 'react';
import { IFilm } from '../../types/IFilm';
import MovieCard from '../../components/movie-card/movie-card';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

type FilmData = {
  filmData: IFilm;
};

function Film({ filmData }: FilmData): JSX.Element {
  const ratingLevel = getRatingLevel(filmData.rating);

  function getRatingLevel(rating: number) {
    if (rating < 3) {
      return 'Bad';
    } else if (rating < 5) {
      return 'Normal';
    } else if (rating < 8) {
      return 'Good';
    } else if (rating < 10) {
      return 'VeryGood';
    } else if (rating === 10) {
      return 'Awesome';
    } else {
      return 'Don`t know';
    }
  }

  return (
    <>
      <section className='film-card film-card--full'>
        <div className='film-card__hero'>
          <div className='film-card__bg'>
            <img src={filmData.backgroundImage} alt={filmData.name} />
          </div>

          <h1 className='visually-hidden'>WTW</h1>

          <Header isFilmCard />

          <div className='film-card__wrap'>
            <div className='film-card__desc'>
              <h2 className='film-card__title'>{filmData.name}</h2>
              <p className='film-card__meta'>
                <span className='film-card__genre'>{filmData.genre}</span>
                <span className='film-card__year'>{filmData.released}</span>
              </p>

              <div className='film-card__buttons'>
                <button
                  className='btn btn--play film-card__button'
                  type='button'
                >
                  <svg viewBox='0 0 19 19' width='19' height='19'>
                    <use xlinkHref='#play-s'></use>
                  </svg>
                  <span>Play</span>
                </button>
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
                <a href='add-review.html' className='btn film-card__button'>
                  Add review
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className='film-card__wrap film-card__translate-top'>
          <div className='film-card__info'>
            <div className='film-card__poster film-card__poster--big'>
              <img
                src={filmData.posterImage}
                alt={`${filmData.name} Poster`}
                width='218'
                height='327'
              />
            </div>

            <div className='film-card__desc'>
              <nav className='film-nav film-card__nav'>
                <ul className='film-nav__list'>
                  <li className='film-nav__item film-nav__item--active'>
                    <a href='#' className='film-nav__link'>
                      Overview
                    </a>
                  </li>
                  <li className='film-nav__item'>
                    <a href='#' className='film-nav__link'>
                      Details
                    </a>
                  </li>
                  <li className='film-nav__item'>
                    <a href='#' className='film-nav__link'>
                      Reviews
                    </a>
                  </li>
                </ul>
              </nav>
              <div className='film-rating'>
                <div className='film-rating__score'>{filmData.rating}</div>
                <p className='film-rating__meta'>
                  <span className='film-rating__level'>{ratingLevel}</span>
                  <span className='film-rating__count'>
                    {filmData.scoresCount}
                  </span>
                </p>
              </div>
              <div className='film-card__text'>
                <p>{filmData.description}</p>

                <p className='film-card__director'>
                  <strong>Director: {filmData.director}</strong>
                </p>

                <p className='film-card__starring'>
                  <strong>
                    Starring: {filmData.starring.map((item) => item).join(', ')}{' '}
                    and other
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className='page-content'>
        <section className='catalog catalog--like-this'>
          <h2 className='catalog__title'>More like this</h2>

          <div className='catalog__films-list'>
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

export default Film;
