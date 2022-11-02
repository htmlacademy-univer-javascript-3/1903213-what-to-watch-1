import { createAction } from '@reduxjs/toolkit';
import { IFilm } from '../types/IFilm';
import { AuthorizationStatus } from '../const';
import { IUser } from '../types/IUser';
import { IReview } from '../types/IReview';

export const Action = {
  CHANGE_GENRE: 'films/changeGenre',
  GET_FILMS: 'data/getFilms',
  GET_PROMO_FILM: 'data/getPromoFilm',
  SHOW_MORE: 'films/showMoreFilms',
  RESET_FILMS_COUNT: 'films/resetFilmsCount',
  REQUIRE_AUTH: 'user/requireAuthorization',
  CHECK_AUTH: 'user/checkAuth',
  LOGIN: 'user/login',
  LOGOUT: 'user/logout',
  ERROR: 'error-message/setError',
  SET_DATA_LOADED_STATUS: 'data/setDataLoadedStatus',
  SET_USER: 'user/setUser',
  GET_FAVORITES: 'data/getFavorites',
  SET_FAVORITES: 'data/setFavorites',
  GET_REVIEWS: 'data/getReviews',
  SET_REVIEW: 'data/setReview'
};

export const changeGenre = createAction<string>(Action.CHANGE_GENRE);

export const getFilms = createAction<IFilm[]>(Action.GET_FILMS);

export const getPromoFilm = createAction<IFilm>(Action.GET_PROMO_FILM);

export const showMore = createAction(Action.SHOW_MORE);

export const resetFilmsCount = createAction(Action.RESET_FILMS_COUNT);

export const requireAuthorization = createAction<AuthorizationStatus>(
  Action.REQUIRE_AUTH
);

export const setError = createAction<string | null>(Action.ERROR);

export const setDataLoadedStatus = createAction<boolean>(
  Action.SET_DATA_LOADED_STATUS
);

export const setUser = createAction<IUser | null>(Action.SET_USER);

export const getFavorites = createAction<IFilm[]>(Action.GET_FAVORITES);

export const getReviews = createAction<IReview[]>(Action.GET_REVIEWS);
