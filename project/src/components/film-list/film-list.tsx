import * as React from 'react';
import { IFilm } from '../../types/IFilm';
import FilmCard from '../film-card/film-card';

type FilmListProps = {
  films: IFilm[];
  activeFilm?: IFilm;
};

function FilmList({ films, activeFilm }: FilmListProps): JSX.Element {
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
          {films.map((film) => (
            <FilmCard key={film.id} film={film} />
          ))}
        </>
      )}
    </>
  );
}

export default FilmList;
