import * as React from 'react';
import { IFilm } from '../../types/IFilm';
import FilmCard from '../film-card/film-card';
import { useAppSelector } from '../../hooks/useAppSelector';

type FilmListProps = {
  activeFilm?: IFilm;
};

function FilmList({ activeFilm }: FilmListProps): JSX.Element {
  const { films, filmsShowCount } = useAppSelector((state) => state);

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
      {!activeFilm && (
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
