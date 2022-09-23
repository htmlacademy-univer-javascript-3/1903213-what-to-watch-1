import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IFilm } from '../../types/IFilm';
import Page404 from '../page404/page404';

type PlayerProps = {
  films: IFilm[];
};

function Player({ films }: PlayerProps): JSX.Element {
  const params = useParams();
  const navigate = useNavigate();
  const film = films.find((item) => item.id === Number(params.id));

  const handleExitClick = () => navigate(-1);
  return (
    <>
      {film && (
        <div className='player'>
          <video
            src={film.videoLink}
            className='player__video'
            poster={film.posterImage}
          />

          <button
            type='button'
            className='player__exit'
            onClick={handleExitClick}
          >
            Exit
          </button>

          <div className='player__controls'>
            <div className='player__controls-row'>
              <div className='player__time'>
                <progress className='player__progress' value='30' max='100' />
                <div
                  className='player__toggler'
                  style={{
                    left: '30%'
                  }}
                >
                  Toggler
                </div>
              </div>
              <div className='player__time-value'>{film.runTime}</div>
            </div>

            <div className='player__controls-row'>
              <button type='button' className='player__play'>
                <svg viewBox='0 0 19 19' width='19' height='19'>
                  <use xlinkHref='#play-s'></use>
                </svg>
                <span>Play</span>
              </button>
              <div className='player__name'>{film.name}</div>

              <button type='button' className='player__full-screen'>
                <svg viewBox='0 0 27 27' width='27' height='27'>
                  <use xlinkHref='#full-screen'></use>
                </svg>
                <span>Full screen</span>
              </button>
            </div>
          </div>
        </div>
      )}
      {!film && <Page404 />}
    </>
  );
}

export default Player;
