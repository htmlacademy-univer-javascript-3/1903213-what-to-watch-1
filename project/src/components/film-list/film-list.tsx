import * as React from 'react';
import FilmCard from '../film-card/film-card';
import { useAppSelector } from '../../hooks/useAppSelector';

type FilmListProps = {
  isSimilar?: boolean;
  isFavorites?: boolean;
};

function FilmList({ isSimilar, isFavorites }: FilmListProps): JSX.Element {
  const { films, similarFilms, filmsShowCount, favoritesFilms } = useAppSelector((state) => state);

  return (
    <>
      {isSimilar && (
        <>
          {similarFilms.map((film) => (
            <FilmCard key={film.id} film={film} />
          ))}
        </>
      )}
      {isFavorites && (
        <>
          {favoritesFilms.map((film) => (
            <FilmCard key={film.id} film={film} />
          ))}
          {favoritesFilms.length === 0 && <div>Вы пока не добавили фильмы к себе в коллекцию</div>}
        </>
      )}
      {!isSimilar && !isFavorites && (
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
