import * as React from 'react';
import { IFilm } from '../../types/IFilm';
import FilmCard from '../film-card/film-card';

type FilmListProps = {
  films: IFilm[];
};

function FilmList({ films }: FilmListProps): JSX.Element {
  return (
    <>
      {films.map((film) => (
        <FilmCard key={film.id} film={film} />
      ))}
    </>
  );
}

export default FilmList;
