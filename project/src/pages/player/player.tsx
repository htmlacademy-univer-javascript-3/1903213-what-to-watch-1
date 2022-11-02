import * as React from 'react';
import { useParams } from 'react-router-dom';
import Page404 from '../page404/page404';
import VideoPlayer from '../../components/video-player/video-player';
import { useAppSelector } from '../../hooks/useAppSelector';

function Player(): JSX.Element {
  const params = useParams();
  const films = useAppSelector((state) => state.films);
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
