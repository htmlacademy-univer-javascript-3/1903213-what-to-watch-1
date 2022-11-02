export enum APIRoutes {
  Films = '/films',
  Login = '/login',
  Logout = '/logout',
  PromoFilm = '/promo',
  Favorite = '/favorite',
  Comments = '/comments'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export enum FavoritesStatus {
  RemoveFavorite,
  AddFavorite
}

export const TIMEOUT_SHOW_ERROR = 2000;
