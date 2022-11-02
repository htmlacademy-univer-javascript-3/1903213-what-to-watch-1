import * as React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { logoutAction } from '../../store/api-actions';

type UserBlockProps = {
  isAuth?: boolean;
};

function UserBlock({ isAuth }: UserBlockProps): JSX.Element {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleLogoutClick = () => {
    dispatch(logoutAction());
  };

  return (
    <ul className='user-block'>
      {!isAuth && (
        <li className='user-block__item'>
          <Link to='/login' className='user-block__link'>
            Sign In
          </Link>
        </li>
      )}
      {isAuth && (
        <>
          <li className='user-block__item'>
            <div className='user-block__avatar'>
              <Link to='/mylist'>
                <img
                  src={user?.avatarUrl}
                  alt={`${user?.name}} avatar`}
                  width='63'
                  height='63'
                />
              </Link>
            </div>
          </li>
          <li className='user-block__item'>
            <Link
              to=''
              className='user-block__link'
              onClick={handleLogoutClick}
            >
              Sign out
            </Link>
          </li>
        </>
      )}
    </ul>
  );
}

export default UserBlock;
