import * as React from 'react';
import Header from '../../components/header/header';
import MovieCard from '../../components/movie-card/movie-card';
import Footer from '../../components/footer/footer';

function MyList(): JSX.Element {
  return (
    <div className='user-page'>
      <Header isMyList />

      <section className='catalog'>
        <h2 className='catalog__title visually-hidden'>Catalog</h2>

        <div className='catalog__films-list'>
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default MyList;
