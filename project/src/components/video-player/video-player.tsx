import { IFilm } from '../../types/IFilm';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useVideoPlayer from '../../hooks/useVideoPlayer';
import './video-player.css';

type VideoPlayerProps = {
  film: IFilm;
  isPlaying?: boolean;
  isFull?: boolean;
};

function VideoPlayer(props: VideoPlayerProps): JSX.Element {
  const { film, isPlaying, isFull } = props;
  const navigate = useNavigate();
  const videoRef = useRef(document.createElement('video'));
  const peekRef = useRef(document.createElement('input'));
  const peekTooltipRef = useRef(document.createElement('div'));
  const progressRef = useRef(document.createElement('progress'));

  const {
    playerState,
    playVideo,
    stopVideo,
    togglePlay,
    handleOnTimeUpdate,
    handleTimePeekMouseMove,
    handleTimePeekInput,
    handleFullscreenClick,
    initializeVideo,
    formatTime
  } = useVideoPlayer(videoRef, peekRef, peekTooltipRef, progressRef, isFull);

  useEffect(() => {
    if (!isFull) {
      if (isPlaying) {
        playVideo();
      } else {
        stopVideo();
      }
    }
  }, [isPlaying]);

  const handleExitClick = () => navigate(-1);

  return isFull ? (
    <>
      <video
        className='player__video'
        poster={film.posterImage}
        ref={videoRef}
        preload='metadata'
        onTimeUpdate={handleOnTimeUpdate}
        onEnded={stopVideo}
        onLoadedMetadata={initializeVideo}
      >
        <source src={film.videoLink} />
      </video>
      <button type='button' className='player__exit' onClick={handleExitClick}>
        Exit
      </button>
      <div className='player__controls'>
        <div className='player__controls-row'>
          <div className='player__time'>
            <progress
              className='player__progress'
              value={playerState.currentTime}
              ref={progressRef}
            />
            <input
              className='player__peek'
              value={playerState.currentTime}
              min='0'
              type='range'
              step='1'
              ref={peekRef}
              onMouseMove={handleTimePeekMouseMove}
              onInput={handleTimePeekInput}
            />
            <div className='player__peek-tooltip' ref={peekTooltipRef}></div>
          </div>
          <div className='player__time-value'>
            {formatTime(playerState.timeLeft)}
          </div>
        </div>

        <div className='player__controls-row'>
          <button
            type='button'
            className='player__play'
            onClick={togglePlay}
            title={playerState.isPlaying ? 'Pause' : 'Play'}
          >
            {playerState.isPlaying ? (
              <svg viewBox='0 0 19 19' width='19' height='19'>
                <use xlinkHref='#pause'></use>
              </svg>
            ) : (
              <svg viewBox='0 0 19 19' width='19' height='19'>
                <use xlinkHref='#play-s'></use>
              </svg>
            )}

            <span>Play</span>
          </button>
          <div className='player__name'>{film.name}</div>

          <button
            type='button'
            className='player__full-screen'
            onClick={handleFullscreenClick}
          >
            <svg viewBox='0 0 27 27' width='27' height='27'>
              <use xlinkHref='#full-screen'></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </>
  ) : (
    <video
      poster={film.previewImage}
      width='280'
      height='175'
      muted
      loop
      ref={videoRef}
    >
      <source src={film.previewVideoLink} />
    </video>
  );
}

export default VideoPlayer;
