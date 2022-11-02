import * as React from 'react';
import { IFilm } from '../../types/IFilm';
import FilmCard from '../film-card/film-card';
import { useAppSelector } from '../../hooks/useAppSelector';

type FilmListProps = {
  activeFilm?: IFilm;
  isFavorites?: boolean;
};

function FilmList({ activeFilm, isFavorites }: FilmListProps): JSX.Element {
  const { films, filmsShowCount, favoritesFilms } = useAppSelector(
    (state) => state
  );

  return (
    <>
      {activeFilm && (
        <>
          {films
            .filter(
              (film) =>
                film.genre === activeFilm.genre && film.id !== activeFilm.id
            )
            .map((film) => (
              <FilmCard key={film.id} film={film} />
            ))}
        </>
      )}
      {isFavorites && (
        <>
          {favoritesFilms.map((film) => (
            <FilmCard key={film.id} film={film} />
          ))}
          {favoritesFilms.length === 0 && (
            <div>Вы пока не добавили фильмы к себе в коллекцию</div>
          )}
        </>
      )}
      {!activeFilm && !isFavorites && (
        <>
          {films.slice(0, filmsShowCount).map((film) => (
            <FilmCard key={film.id} film={film} />
          ))}
        </>
      )}
    </>
  );
}

export default FilmList;
