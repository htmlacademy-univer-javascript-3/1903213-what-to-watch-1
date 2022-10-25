import { createReducer } from '@reduxjs/toolkit';
import { changeGenre, getFilms, resetFilmsCount, showMore } from './action';
import { films } from '../mocks/films';

export const INITIAL_GENRE = 'All Genres';
export const INITIAL_FILMS = films;
export const INITIAL_FILMS_SHOW_COUNT = 2;
export const ALL_FILMS = films.length;

const initialState = {
  activeGenre: INITIAL_GENRE,
  films: films,
  filmsShowCount: INITIAL_FILMS_SHOW_COUNT
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.activeGenre = action.payload;
    })
    .addCase(getFilms, (state) => {
      state.films =
        state.activeGenre === INITIAL_GENRE
          ? films
          : films.filter((film) => film.genre === state.activeGenre);
      state.filmsShowCount = INITIAL_FILMS_SHOW_COUNT;
    })
    .addCase(showMore, (state) => {
      state.filmsShowCount =
        ALL_FILMS > state.filmsShowCount
          ? state.filmsShowCount + INITIAL_FILMS_SHOW_COUNT
          : state.filmsShowCount;
    })
    .addCase(resetFilmsCount, (state) => {
      state.filmsShowCount = INITIAL_FILMS_SHOW_COUNT;
    });
});

export { reducer };
