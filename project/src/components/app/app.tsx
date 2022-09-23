import Main from '../../pages/main/main';
import { IFilm } from '../../types/IFilm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from '../../pages/sign-in/sign-in';
import Film from '../../pages/film/film';
import MyList from '../../pages/my-list/my-list';
import AddReview from '../../pages/add-review/add-review';
import Player from '../../pages/player/player';
import Page404 from '../../pages/page404/page404';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import PrivateRoute from '../private-route/private-route';

type BaseProps = {
  promoFilmData: IFilm;
  filmData: IFilm;
};

function App({ promoFilmData, filmData }: BaseProps): JSX.Element {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Main film={promoFilmData} />} />
        <Route path='/login' element={<SignIn />} />
        <Route
          path='/mylist'
          element={
            <PrivateRoute isAuth={false}>
              <MyList />
            </PrivateRoute>
          }
        />
        <Route path='/films/:id' element={<Film filmData={filmData} />}>
          <Route
            path='review'
            element={
              <PrivateRoute isAuth={false}>
                <AddReview />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path='/player/:id' element={<Player />} />
        <Route path='*' element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
