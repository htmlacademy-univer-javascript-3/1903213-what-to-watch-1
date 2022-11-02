import { createReducer } from '@reduxjs/toolkit';
import {
  changeGenre,
  getFavorites,
  getFilms,
  getPromoFilm,
  getReviews,
  requireAuthorization,
  resetFilmsCount,
  setDataLoadedStatus,
  setError,
  setUser,
  showMore
} from './action';
import { AuthorizationStatus } from '../const';
import { IFilm } from '../types/IFilm';
import { IUser } from '../types/IUser';
import { IReview } from '../types/IReview';

export const INITIAL_GENRE = 'All Genres';
export const INITIAL_FILMS_SHOW_COUNT = 8;

type InitialState = {
  activeGenre: string;
  films: IFilm[];
  initialFilms: IFilm[];
  promoFilm: IFilm;
  favoritesFilms: IFilm[];
  reviews: IReview[];
  filmsShowCount: number;
  totalFilmsCount: number;
  authorizationStatus: AuthorizationStatus;
  user: IUser | null;
  error: string | null;
  isDataLoaded: boolean;
};

const initialState: InitialState = {
  activeGenre: INITIAL_GENRE,
  films: [],
  initialFilms: [],
  promoFilm: {} as IFilm,
  favoritesFilms: [],
  reviews: [],
  user: null,
  filmsShowCount: INITIAL_FILMS_SHOW_COUNT,
  totalFilmsCount: 0,
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  isDataLoaded: false
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(changeGenre, (state, action) => {
      state.activeGenre = action.payload;
    })
    .addCase(getFilms, (state, action) => {
      state.films =
        state.activeGenre === INITIAL_GENRE
          ? action.payload
          : action.payload.filter((film) => film.genre === state.activeGenre);
      state.initialFilms = action.payload;
      state.filmsShowCount = INITIAL_FILMS_SHOW_COUNT;
      state.totalFilmsCount = action.payload.length;
    })
    .addCase(getPromoFilm, (state, action) => {
      state.promoFilm = action.payload;
    })
    .addCase(showMore, (state) => {
      state.filmsShowCount =
        state.totalFilmsCount > state.filmsShowCount
          ? state.filmsShowCount + INITIAL_FILMS_SHOW_COUNT
          : state.filmsShowCount;
    })
    .addCase(resetFilmsCount, (state) => {
      state.filmsShowCount = INITIAL_FILMS_SHOW_COUNT;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setDataLoadedStatus, (state, action) => {
      state.isDataLoaded = action.payload;
    })
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(getFavorites, (state, action) => {
      state.favoritesFilms = action.payload;
    })
    .addCase(getReviews, (state, action) => {
      state.reviews = action.payload;
    });
});

export { reducer };
