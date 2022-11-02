import * as React from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import FilmList from '../../components/film-list/film-list';
import { useAppSelector } from '../../hooks/useAppSelector';

function MyList(): JSX.Element {
  const favorites = useAppSelector((state) => state.favoritesFilms);

  return (
    <div className='user-page'>
      <Header isMyList filmsCount={favorites.length} />

      <section className='catalog'>
        <h2 className='catalog__title visually-hidden'>Catalog</h2>

        <div className='catalog__films-list'>
          <FilmList isFavorites />
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default MyList;
