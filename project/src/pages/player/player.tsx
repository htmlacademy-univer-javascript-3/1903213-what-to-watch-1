import * as React from 'react';
import { useParams } from 'react-router-dom';
import { IFilm } from '../../types/IFilm';
import Page404 from '../page404/page404';
import VideoPlayer from '../../components/video-player/video-player';

type PlayerProps = {
  films: IFilm[];
};

function Player({ films }: PlayerProps): JSX.Element {
  const params = useParams();
  const film = films.find((item) => item.id === Number(params.id));

  return (
    <>
      {film && (
        <div className='player'>
          <VideoPlayer film={film} isFull />
        </div>
      )}
      {!film && <Page404 />}
    </>
  );
}

export default Player;
