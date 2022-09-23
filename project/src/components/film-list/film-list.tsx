import * as React from 'react';
import { IFilm } from '../../types/IFilm';
import FilmCard from '../film-card/film-card';
import { useState } from 'react';

type FilmListProps = {
  films: IFilm[];
};

function FilmList({ films }: FilmListProps): JSX.Element {
  const [activeFilm, setActiveFilm] = useState<number | null>();

  const handleMouseEnter = (filmId: number) => {
    setActiveFilm(filmId);
  };

  const handleMouseLeave = () => {
    setActiveFilm(null);
  };

  return (
    <>
      {films.map((film) => (
        <FilmCard
          key={film.id}
          film={film}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        />
      ))}
      {activeFilm}
    </>
  );
}

export default FilmList;
