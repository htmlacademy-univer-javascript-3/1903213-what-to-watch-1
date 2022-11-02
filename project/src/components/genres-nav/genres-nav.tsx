import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import * as React from 'react';
import { INITIAL_GENRE } from '../../store/reducer';
import classNames from 'classnames';
import { changeGenre } from '../../store/action';
import { fetchFilmsAction } from '../../store/api-actions';

function GenresNav(): JSX.Element {
  const dispatch = useAppDispatch();
  const { activeGenre, initialFilms } = useAppSelector((state) => state);
  const uniqueGenres = [
    INITIAL_GENRE,
    ...Array.from(
      new Set<string>(initialFilms.map((film) => film.genre)).values()
    )
  ];

  const handleGenreLinkClick = (genre: string) => {
    dispatch(changeGenre(genre));
    dispatch(fetchFilmsAction());
  };

  return (
    <ul className='catalog__genres-list'>
      {uniqueGenres.map((item) => (
        <li
          key={item}
          className={classNames('catalog__genres-item', {
            'catalog__genres-item--active': activeGenre === item
          })}
        >
          <a
            href='javascript:void(0)'
            className='catalog__genres-link'
            onClick={() => handleGenreLinkClick(item)}
          >
            {item}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default GenresNav;
