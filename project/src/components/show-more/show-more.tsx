import * as React from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { showMore } from '../../store/action';

function ShowMore(): JSX.Element | null {
  const dispatch = useAppDispatch();
  const { films, filmsShowCount } = useAppSelector((state) => state);

  return filmsShowCount < films.length ? (
    <button
      className='catalog__button'
      type='button'
      onClick={() => dispatch(showMore())}
    >
      Show more
    </button>
  ) : null;
}

export default ShowMore;
