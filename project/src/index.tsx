import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { IPromoFilm } from './types/IFilm';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const promoFilmData: IPromoFilm = {
  name: 'The Grand Budapest Hotel',
  genre: 'Comedy',
  released: 2014
};

root.render(
  <React.StrictMode>
    <App promoFilmData={promoFilmData} />
  </React.StrictMode>
);
