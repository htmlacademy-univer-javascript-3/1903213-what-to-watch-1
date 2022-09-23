// @flow
import * as React from 'react';
import Header from '../../components/header/header';
import { IFilm } from '../../types/IFilm';
import { useParams } from 'react-router-dom';
import Page404 from '../page404/page404';
import AddReviewForm from '../../components/add-review-form/add-review-form';

type AddReviewProps = {
  films: IFilm[];
};

function AddReview({ films }: AddReviewProps): JSX.Element {
  const params = useParams();
  const film = films.find((item) => item.id === Number(params.id));

  return (
    <>
      {film && (
        <section className='film-card film-card--full'>
          <div className='film-card__header'>
            <div className='film-card__bg'>
              <img src={film.backgroundImage} alt={film.name} />
            </div>

            <h1 className='visually-hidden'>WTW</h1>

            <Header isAddReview films={films} />

            <div className='film-card__poster film-card__poster--small'>
              <img
                src={film.posterImage}
                alt={film.name}
                width='218'
                height='327'
              />
            </div>
          </div>

          <div className='add-review'>
            <AddReviewForm />
          </div>
        </section>
      )}
      {!film && <Page404 />}
    </>
  );
}

export default AddReview;
