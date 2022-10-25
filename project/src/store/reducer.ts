import { createReducer } from '@reduxjs/toolkit';
import { changeGenre, getFilms } from './action';
import { films } from '../mocks/films';

export const INITIAL_GENRE = 'All Genres';
export const INITIAL_FILMS = films;

const initialState = {
  activeGenre: INITIAL_GENRE,
  films: films
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
    });
});

export { reducer };
