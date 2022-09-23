import * as React from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import FilmList from '../../components/film-list/film-list';
import { IFilm } from '../../types/IFilm';

type MyListProps = {
  films: IFilm[];
};

function MyList({ films }: MyListProps): JSX.Element {
  return (
    <div className='user-page'>
      <Header isMyList filmsCount={films.length} />

      <section className='catalog'>
        <h2 className='catalog__title visually-hidden'>Catalog</h2>

        <div className='catalog__films-list'>
          <FilmList films={films} />
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default MyList;
