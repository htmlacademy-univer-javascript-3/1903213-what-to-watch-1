import { createAction } from '@reduxjs/toolkit';

export const Action = {
  CHANGE_GENRE: 'films/changeGenre',
  GET_FILMS: 'films/getFilms',
  SHOW_MORE: 'films/showMoreFilms',
  RESET_FILMS_COUNT: 'films/resetFilmsCount'
};

export const changeGenre = createAction<string>(Action.CHANGE_GENRE);

export const getFilms = createAction(Action.GET_FILMS);

export const showMore = createAction(Action.SHOW_MORE);

export const resetFilmsCount = createAction(Action.RESET_FILMS_COUNT);
