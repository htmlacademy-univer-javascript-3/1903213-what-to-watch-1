export type IReview = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: {
    id: number;
    name: string;
  };
};

export type IReviewForm = {
  filmId: number;
  comment: string;
  rating: number;
};
