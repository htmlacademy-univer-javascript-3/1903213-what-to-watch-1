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
import Layout from '../layout/layout';

type AppProps = {
  promoFilm: IFilm;
  films: IFilm[];
};

function App({ promoFilm, films }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Main promoFilm={promoFilm} films={films} />} />
          <Route path='login' element={<SignIn />} />
          <Route
            path='mylist'
            element={
              <PrivateRoute isAuth>
                <MyList films={films} />
              </PrivateRoute>
            }
          />
          <Route path='films/:id/'>
            <Route index element={<Film films={films} />} />
            <Route
              path='review'
              element={
                <PrivateRoute isAuth>
                  <AddReview films={films} />
                </PrivateRoute>
              }
            />
          </Route>
          <Route path='player/:id' element={<Player films={films} />} />
        </Route>

        <Route path='*' element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
