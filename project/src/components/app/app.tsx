import Main from '../../pages/main/main';
import { IPromoFilm } from '../../types/IFilm';

type promoFilmData = {
  promoFilmData: IPromoFilm;
};

function App({ promoFilmData }: promoFilmData): JSX.Element {
  return (
    <Main
      released={promoFilmData.released}
      name={promoFilmData.name}
      genre={promoFilmData.genre}
    />
  );
}

export default App;
