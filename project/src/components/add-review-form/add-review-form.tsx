import * as React from 'react';
import { Fragment } from 'react';

function AddReviewForm(): JSX.Element {
  type FormData = {
    rating: number | undefined;
    reviewText: string | undefined;
  };

  const [formData, setFormData] = React.useState<FormData>({
    rating: undefined,
    reviewText: undefined
  });

  const fieldChangeHandle = (evt: any) => {
    const { name, value } = evt.target;
    setFormData({ ...formData, [name]: value });
  };

  const setRatingStars = () => {
    const starsArr = new Array<JSX.Element>();
    for (let i = 10; i >= 1; i--) {
      starsArr.push(
        <Fragment key={`rating__wrapper-${i}`}>
          <input
            className='rating__input'
            id={`star-${i}`}
            type='radio'
            name='rating'
            value={i}
            onChange={fieldChangeHandle}
          />
          <label className='rating__label' htmlFor={`star-${i}`}>
            Rating {i}
          </label>
        </Fragment>
      );
    }
    return starsArr;
  };

  const stars = setRatingStars();

  return (
    <form action='#' className='add-review__form'>
      <div className='rating'>
        <div className='rating__stars'>{stars.map((item) => item)}</div>
      </div>

      <div className='add-review__text'>
        <textarea
          className='add-review__textarea'
          name='reviewText'
          id='reviewText'
          placeholder='Review text'
          onChange={fieldChangeHandle}
          value={formData.reviewText}
        />
        <div className='add-review__submit'>
          <button className='add-review__btn' type='submit'>
            Post
          </button>
        </div>
      </div>
    </form>
  );
}

export default AddReviewForm;
