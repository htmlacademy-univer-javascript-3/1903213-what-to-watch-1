import React, { useState, useEffect } from 'react';

const useVideoPlayer = (
  videoElement: React.MutableRefObject<HTMLVideoElement>,
  peekElement?: React.MutableRefObject<HTMLInputElement>,
  peekTooltipElement?: React.MutableRefObject<HTMLDivElement>,
  progressElement?: React.MutableRefObject<HTMLProgressElement>,
  isFull?: boolean
) => {
  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    timeLeft: videoElement.current.duration,
    currentTime: Math.round(videoElement.current.currentTime),
    isMuted: false
  });

  const playVideo = () => {
    setPlayerState({
      ...playerState,
      isPlaying: true
    });
  };

  const stopVideo = () => {
    setPlayerState({
      ...playerState,
      isPlaying: false
    });
  };

  const togglePlay = () => {
    setPlayerState({
      ...playerState,
      isPlaying: !playerState.isPlaying
    });
  };

  useEffect(() => {
    if (isFull) {
      playerState.isPlaying
        ? videoElement.current.play()
        : videoElement.current.pause();
    } else {
      playerState.isPlaying
        ? videoElement.current.play()
        : videoElement.current.load();
    }
  }, [playerState.isPlaying, videoElement]);

  const initializeVideo = () => {
    const videoWorks = !!document.createElement('video').canPlayType;
    if (videoWorks) {
      videoElement.current.controls = false;
    }
    setPlayerState({
      isPlaying: false,
      timeLeft: videoElement.current.duration,
      currentTime: Math.round(videoElement.current.currentTime),
      isMuted: false
    });
    peekElement?.current.setAttribute(
      'max',
      videoElement.current.duration.toString()
    );
    progressElement?.current.setAttribute(
      'max',
      videoElement.current.duration.toString()
    );
  };

  const handleOnTimeUpdate = () => {
    const timeLeft =
      videoElement.current.duration - videoElement.current.currentTime;
    setPlayerState({
      ...playerState,
      timeLeft,
      currentTime: Math.round(videoElement.current.currentTime)
    });
  };

  const handleTimePeekMouseMove = (event: any) => {
    const skipTo = Math.round(
      (event.nativeEvent.offsetX / event.target.clientWidth) *
        parseInt(event.target.getAttribute('max'), 10)
    );
    peekElement?.current.setAttribute('data-seek', skipTo.toString());
    const formattedTime = formatTime(skipTo);
    if (peekTooltipElement) {
      peekTooltipElement.current.textContent = formattedTime;
      const rect = videoElement.current.getBoundingClientRect();
      peekTooltipElement.current.style.left = `${event.pageX - rect.left}px`;
    }
  };

  const handleTimePeekInput = (event: any) => {
    const skipTo = event.target.dataset.seek
      ? Number(event.target.dataset.seek)
      : Number(event.target.value);
    videoElement.current.currentTime = skipTo;
    if (progressElement) {
      progressElement.current.value = skipTo;
    }
    if (peekElement) {
      peekElement.current.value = skipTo.toString();
    }
  };

  const handleFullscreenClick = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoElement.current.parentElement?.requestFullscreen();
    }
  };

  const formatTime = (seconds: number) => {
    const time = new Date(0, 0, 0, 0, 0, 0, 0);
    time.setSeconds(seconds);

    if (seconds >= 3600) {
      return time.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    } else {
      return time.toLocaleTimeString('ru-RU', {
        minute: '2-digit',
        second: '2-digit'
      });
    }
  };

  return {
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
  };
};

export default useVideoPlayer;
