import * as React from 'react';
import './page404.css';
import { Link } from 'react-router-dom';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

function Page404(): JSX.Element {
  return (
    <div className='user-page'>
      <Header isError />

      <div className='sign-in user-page__content'>
        <div className='error-title'>404</div>
        <div className='error-description'>
          Страница по данному пути не найдена
        </div>
        <Link to='/' className='error-back-link'>
          Вернуться на главную
        </Link>
      </div>

      <Footer />
    </div>
  );
}

export default Page404;
