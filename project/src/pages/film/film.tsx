import * as React from 'react';
import { IFilm } from '../../types/IFilm';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { Link, useParams } from 'react-router-dom';
import Page404 from '../page404/page404';
import FilmList from '../../components/film-list/film-list';
import Tabs from '../../components/tabs/tabs';
import TabsList from '../../components/tabs-list/tabs-list';
import Tab from '../../components/tab/tab';
import TabPanel from '../../components/tab-panel/tab-panel';
import { useState } from 'react';
import { IReview } from '../../types/IReview';

type FilmData = {
  films: IFilm[];
  reviews: IReview[];
};

function Film({ films, reviews }: FilmData): JSX.Element {
  const params = useParams();
  const film = films.find((item) => item.id === Number(params.id));
  const ratingLevel = film ? getRatingLevel(film.rating) : null;
  const [activeTab, setActiveTab] = useState('1');

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

  const onTabClickHandler = (tabId: string) => {
    setActiveTab(tabId);
  };

  const formatTime = (minutes: number): string =>
    `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
  const formatDate = (date: string) => {
    const time = new Date(date);

    return time.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      {film && (
        <section className='film-card film-card--full'>
          <div className='film-card__hero'>
            <div className='film-card__bg'>
              <img src={film.backgroundImage} alt={film.name} />
            </div>
            <h1 className='visually-hidden'>WTW</h1>`
            <Header isFilmCard />
            <div className='film-card__wrap'>
              <div className='film-card__desc'>
                <h2 className='film-card__title'>{film.name}</h2>
                <p className='film-card__meta'>
                  <span className='film-card__genre'>{film.genre}</span>
                  <span className='film-card__year'>{film.released}</span>
                </p>

                <div className='film-card__buttons'>
                  <Link
                    to={`/player/${film.id}`}
                    className='btn btn--play film-card__button'
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
                  <Link to='review' className='btn film-card__button'>
                    Add review
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className='film-card__wrap film-card__translate-top'>
            <div className='film-card__info'>
              <div className='film-card__poster film-card__poster--big'>
                <img
                  src={film.posterImage}
                  alt={`${film.name} Poster`}
                  width='218'
                  height='327'
                />
              </div>

              <Tabs>
                <TabsList>
                  <Tab
                    id='1'
                    selected={activeTab === '1'}
                    tabIndex={1}
                    clickHandler={onTabClickHandler}
                  >
                    Overview
                  </Tab>
                  <Tab
                    id='2'
                    selected={activeTab === '2'}
                    tabIndex={2}
                    clickHandler={onTabClickHandler}
                  >
                    Details
                  </Tab>
                  <Tab
                    id='3'
                    selected={activeTab === '3'}
                    tabIndex={3}
                    clickHandler={onTabClickHandler}
                  >
                    Reviews
                  </Tab>
                </TabsList>
                <TabPanel id={1} selected={activeTab === '1'}>
                  <div className='film-rating'>
                    <div className='film-rating__score'>{film.rating}</div>
                    <p className='film-rating__meta'>
                      <span className='film-rating__level'>{ratingLevel}</span>
                      <span className='film-rating__count'>
                        {film.scoresCount}
                      </span>
                    </p>
                  </div>
                  <div className='film-card__text'>
                    <p>{film.description}</p>

                    <p className='film-card__director'>
                      <strong>Director: {film.director}</strong>
                    </p>

                    <p className='film-card__starring'>
                      <strong>
                        Starring: {film.starring.map((item) => item).join(', ')}{' '}
                        and other
                      </strong>
                    </p>
                  </div>
                </TabPanel>
                <TabPanel id={2} selected={activeTab === '2'}>
                  <div className='film-card__text film-card__row'>
                    <div className='film-card__text-col'>
                      <p className='film-card__details-item'>
                        <strong className='film-card__details-name'>
                          Director
                        </strong>
                        <span className='film-card__details-value'>
                          {film.director}
                        </span>
                      </p>
                      <p className='film-card__details-item'>
                        <strong className='film-card__details-name'>
                          Starring
                        </strong>
                        <span className='film-card__details-value'>
                          {film.starring.map((star) => (
                            <>
                              {`${star}, `}
                              <br />
                            </>
                          ))}
                        </span>
                      </p>
                    </div>

                    <div className='film-card__text-col'>
                      <p className='film-card__details-item'>
                        <strong className='film-card__details-name'>
                          Run Time
                        </strong>
                        <span className='film-card__details-value'>
                          {formatTime(film.runTime)}
                        </span>
                      </p>
                      <p className='film-card__details-item'>
                        <strong className='film-card__details-name'>
                          Genre
                        </strong>
                        <span className='film-card__details-value'>
                          {film.genre}
                        </span>
                      </p>
                      <p className='film-card__details-item'>
                        <strong className='film-card__details-name'>
                          Released
                        </strong>
                        <span className='film-card__details-value'>
                          {film.released}
                        </span>
                      </p>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel id={3} selected={activeTab === '3'}>
                  <div className='film-card__reviews film-card__row'>
                    <div className='film-card__reviews-col'>
                      {reviews
                        .slice(0, Math.round(reviews.length / 2))
                        .map((review) => (
                          <div className='review' key={review.id}>
                            <blockquote className='review__quote'>
                              <p className='review__text'>
                                {review.comment.slice(0, 150)}
                              </p>

                              <footer className='review__details'>
                                <cite className='review__author'>
                                  {review.user.name}
                                </cite>
                                <time
                                  className='review__date'
                                  dateTime={review.date}
                                >
                                  {formatDate(review.date)}
                                </time>
                              </footer>
                            </blockquote>

                            <div className='review__rating'>
                              {review.rating.toFixed(1)}
                            </div>
                          </div>
                        ))}
                    </div>
                    <div className='film-card__reviews-col'>
                      {reviews
                        .slice(Math.round(reviews.length / 2))
                        .map((review) => (
                          <div className='review' key={review.id}>
                            <blockquote className='review__quote'>
                              <p className='review__text'>
                                {review.comment.slice(0, 150)}
                              </p>

                              <footer className='review__details'>
                                <cite className='review__author'>
                                  {review.user.name}
                                </cite>
                                <time
                                  className='review__date'
                                  dateTime={review.date}
                                >
                                  {formatDate(review.date)}
                                </time>
                              </footer>
                            </blockquote>

                            <div className='review__rating'>
                              {review.rating.toFixed(1)}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </TabPanel>
              </Tabs>
            </div>
          </div>
        </section>
      )}
      {!film && <Page404 />}

      <div className='page-content'>
        <section className='catalog catalog--like-this'>
          <h2 className='catalog__title'>More like this</h2>

          <div className='catalog__films-list'>
            <FilmList films={films} activeFilm={film} />
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

export default Film;
