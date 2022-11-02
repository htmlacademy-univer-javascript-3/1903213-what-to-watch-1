import Main from '../../pages/main/main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from '../../pages/sign-in/sign-in';
import Film from '../../pages/film/film';
import MyList from '../../pages/my-list/my-list';
import AddReview from '../../pages/add-review/add-review';
import Player from '../../pages/player/player';
import Page404 from '../../pages/page404/page404';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import PrivateRoute from '../private-route/private-route';
import Layout from '../layout/layout';
import { useAppSelector } from '../../hooks/useAppSelector';
import { isCheckedAuth } from '../../services/isCheckedAuth';
import Loading from '../../pages/loading/loading';
import { AuthorizationStatus } from '../../const';

function App(): JSX.Element {
  const { authorizationStatus, isDataLoaded } = useAppSelector(
    (state) => state
  );

  const isAuth = authorizationStatus === AuthorizationStatus.Auth;

  if (isCheckedAuth(authorizationStatus) || isDataLoaded) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Main />} />
          <Route path='login' element={<SignIn />} />
          <Route
            path='mylist'
            element={
              <PrivateRoute isAuth={isAuth}>
                <MyList />
              </PrivateRoute>
            }
          />
          <Route path='films/:id/'>
            <Route index element={<Film />} />
            <Route
              path='review'
              element={
                <PrivateRoute isAuth={isAuth}>
                  <AddReview />
                </PrivateRoute>
              }
            />
          </Route>
          <Route path='player/:id' element={<Player />} />
        </Route>

        <Route path='*' element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
