// @flow
import * as React from 'react';
import { IFilm } from '../../types/IFilm';
import { Link } from 'react-router-dom';
import VideoPlayer from '../video-player/video-player';
import { useState } from 'react';

type FilmCardProps = {
  film: IFilm;
};

function FilmCard({ film }: FilmCardProps): JSX.Element {
  const [isPlayVideo, setIsPlayVideo] = useState(false);
  const [timerId, setTimerId] = useState<ReturnType<typeof setTimeout>>();

  const handleMouseEnter = () => {
    const timer = setTimeout(() => {
      setIsPlayVideo(true);
    }, 1000);
    setTimerId(timer);
  };

  const handleMouseLeave = () => {
    clearTimeout(timerId);
    setIsPlayVideo(false);
  };

  return (
    <article
      className='small-film-card catalog__films-card'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className='small-film-card__image'>
        <VideoPlayer film={film} isPlaying={isPlayVideo} />
      </div>
      <h3 className='small-film-card__title'>
        <Link className='small-film-card__link' to={`/films/${film.id}`}>
          {film.name}
        </Link>
      </h3>
    </article>
  );
}

export default FilmCard;
