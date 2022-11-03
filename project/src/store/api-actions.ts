import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/IState';
import { AxiosInstance } from 'axios';
import { APIRoutes, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../const';
import { IFilm } from '../types/IFilm';
import {
  Action,
  getFavorites,
  getFilm,
  getFilms,
  getPromoFilm,
  getReviews,
  getSimilarFilms,
  requireAuthorization,
  setDataLoadedStatus,
  setError,
  setUser
} from './action';
import { IAuth } from '../types/IAuth';
import { IUser } from '../types/IUser';
import { dropToken, saveToken } from '../services/token';
import { store } from './index';
import { IFavorite } from '../types/IFavorite';
import { IReview, IReviewForm } from '../types/IReview';

export const fetchFilmsAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(Action.GET_FILMS, async (_arg, { dispatch, extra: api }) => {
  const { data } = await api.get<IFilm[]>(APIRoutes.Films);
  dispatch(setDataLoadedStatus(true));
  dispatch(getFilms(data));
  dispatch(setDataLoadedStatus(false));
});

export const fetchFilmAction = createAsyncThunk<
  void,
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(Action.GET_FILM, async (filmId, { dispatch, extra: api }) => {
  const { data } = await api.get<IFilm>(`${APIRoutes.Films}/${filmId}`);
  dispatch(setDataLoadedStatus(true));
  dispatch(getFilm(data));
  dispatch(setDataLoadedStatus(false));
});

export const fetchSimilarFilmsAction = createAsyncThunk<
  void,
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(Action.GET_SIMILAR_FILMS, async (filmId, { dispatch, extra: api }) => {
  const { data } = await api.get<IFilm[]>(`${APIRoutes.Films}/${filmId}/similar`);
  dispatch(setDataLoadedStatus(true));
  dispatch(getSimilarFilms(data));
  dispatch(setDataLoadedStatus(false));
});

export const fetchPromoFilmAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(Action.GET_PROMO_FILM, async (_arg, { dispatch, extra: api }) => {
  const { data } = await api.get<IFilm>(APIRoutes.PromoFilm);
  dispatch(setDataLoadedStatus(true));
  dispatch(getPromoFilm(data));
  dispatch(setDataLoadedStatus(false));
});

export const fetchFavoritesAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(Action.GET_FAVORITES, async (_arg, { dispatch, extra: api }) => {
  const { data } = await api.get<IFilm[]>(APIRoutes.Favorite);
  dispatch(setDataLoadedStatus(true));
  dispatch(getFavorites(data));
  dispatch(setDataLoadedStatus(false));
});

export const setFavoriteAction = createAsyncThunk<
  void,
  IFavorite,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(Action.GET_FAVORITES, async ({ filmId, status }, { dispatch, extra: api }) => {
  await api.post<IFilm>(`${APIRoutes.Favorite}/${filmId}/${status}`);
  dispatch(setDataLoadedStatus(true));
  dispatch(fetchFavoritesAction());
  dispatch(setDataLoadedStatus(false));
});

export const fetchReviewsAction = createAsyncThunk<
  void,
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(Action.GET_REVIEWS, async (filmId, { dispatch, extra: api }) => {
  const { data } = await api.get<IReview[]>(`${APIRoutes.Comments}/${filmId}`);
  dispatch(setDataLoadedStatus(true));
  dispatch(getReviews(data));
  dispatch(setDataLoadedStatus(false));
});

export const setReviewAction = createAsyncThunk<
  void,
  IReviewForm,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(Action.SET_REVIEW, async ({ filmId, comment, rating }, { dispatch, extra: api }) => {
  const { data } = await api.post<IReview[]>(`${APIRoutes.Comments}/${filmId}`, {
    comment,
    rating
  });
  dispatch(setDataLoadedStatus(true));
  dispatch(getReviews(data));
  dispatch(setDataLoadedStatus(false));
});

export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(Action.CHECK_AUTH, async (_arg, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get(APIRoutes.Login);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(setUser(data));
  } catch {
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    dispatch(setUser(null));
  }
});

export const loginAction = createAsyncThunk<
  void,
  IAuth,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(Action.LOGIN, async ({ login: email, password }, { dispatch, extra: api }) => {
  const { data } = await api.post<IUser>(APIRoutes.Login, {
    email,
    password
  });
  saveToken(data.token);
  dispatch(requireAuthorization(AuthorizationStatus.Auth));
  dispatch(setUser(data));
});

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(Action.LOGOUT, async (_arg, { dispatch, extra: api }) => {
  await api.delete(APIRoutes.Logout);
  dropToken();
  dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  dispatch(setUser(null));
});

export const clearErrorAction = createAsyncThunk('game/clearError', () => {
  setTimeout(() => store.dispatch(setError(null)), TIMEOUT_SHOW_ERROR);
});
