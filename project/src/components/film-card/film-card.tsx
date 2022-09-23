// @flow
import * as React from 'react';
import { IFilm } from '../../types/IFilm';
import { Link } from 'react-router-dom';

type FilmCardProps = {
  film: IFilm;
  handleMouseEnter: (filmId: number) => void;
  handleMouseLeave: () => void;
};

function FilmCard({
  film,
  handleMouseEnter,
  handleMouseLeave
}: FilmCardProps): JSX.Element {
  return (
    <article
      className='small-film-card catalog__films-card'
      onMouseEnter={() => handleMouseEnter(film.id)}
      onMouseLeave={handleMouseLeave}
    >
      <div className='small-film-card__image'>
        <img src={film.previewImage} alt={film.name} width='280' height='175' />
      </div>
      <h3 className='small-film-card__title'>
        <Link className='small-film-card__link' to={`/films/${film.id}`}>
          {film.name}
        </Link>
      </h3>
    </article>
  );
}

export default FilmCard;
