import { createAction } from '@reduxjs/toolkit';

export const Action = {
  CHANGE_GENRE: 'films/changeGenre',
  GET_FILMS: 'films/getFilms'
};

export const changeGenre = createAction<string>(Action.CHANGE_GENRE);

export const getFilms = createAction(Action.GET_FILMS);
