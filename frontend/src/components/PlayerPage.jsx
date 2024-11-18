import { useTrack } from "../context/TrackContext";
import {
  // GiPlayButton,
  // GiPauseButton,
  GiPreviousButton,
  GiNextButton,
  GiSpeaker,
  GiSpeakerOff,
} from "react-icons/gi";
import { useEffect, useRef, useState } from "react";
import CustomSlider from "./CustomSlider";
import PlayButton from "./PlayButton";

const PlayerPage = () => {
  const { tracks, currentTrackIndex, nextTrack, prevTrack } = useTrack();
  const track = tracks[currentTrackIndex] || {};
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [isVolumeVisible, setIsVolumeVisible] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateProgress);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", updateProgress);
    };
  }, []);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSpeedChange = (e) => {
    const audio = audioRef.current;
    audio.playbackRate = e.target.value;
    setSpeed(e.target.value);
  };

  const handleProgressChange = (newProgress) => {
    const audio = audioRef.current;
    const updatedProgress = (newProgress / 100) * duration;
    audio.currentTime = updatedProgress;
    setProgress(updatedProgress);
  };

  const handleVolumeChange = (newVolume) => {
    const audio = audioRef.current;
    // Adjust calculation for vertical slider
    // const adjustedVolume = (100 - newVolume) / 100;
    const adjustedVolume = newVolume / 100;  // The volume directly corresponds to the slider value
    audio.volume = adjustedVolume;
    setVolume(adjustedVolume);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const toggleVolumeVisibility = () => {
    setIsVolumeVisible(!isVolumeVisible);
  };

  return (
    <div className="flex flex-col gap-4 ">
      <div className="mx-auto ">
        <img src={track.album.cover_big} alt={track.title} className="h-[300px]" />
        <h2>{track.title}</h2>
        <h4 className="text-sm text-gray-500">By:-{track.artist.name}</h4>
        <audio ref={audioRef} src={track.preview} type="audio/mpeg" />

        
        {/* Custom Progress Bar */}
        <div className="flex items-center gap-2 mt-4">
          <span>{formatTime(progress)}</span>
          <CustomSlider
            value={(progress / duration) * 100 || 0}
            max={100}
            onChange={handleProgressChange}
          />
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="mx-auto flex w-1/2 justify-center items-center gap-8 h-16">
        {/* Volume Control */}
        <div className="relative flex flex-col items-center">
          <button
            onClick={toggleVolumeVisibility}
            className="flex justify-center mt-4 items-center bg-gray-800 text-white p-2  rounded-full hover:bg-gray-700"
          >
            {volume > 0 ? <GiSpeaker /> : <GiSpeakerOff />}
          </button>
          {isVolumeVisible && (
            <div className="absolute bottom-8 md:bottom-12 flex flex-col items-center">
              <CustomSlider
                value={( volume) * 100} // Adjust slider value to match upward motion
                max={100}
                onChange={handleVolumeChange}
                direction="vertical" // Make this slider vertical
              />
            </div>
          )}
        </div>

        {/* Play, Pause, Next, Previous */}
        <div className="flex md:mx-auto md:justify-center justify-between mt-4 gap-4">
          <button
            onClick={prevTrack}
            className="bg-gray-800 text-white md:py-1 md:px-4 px-2 rounded-full hover:bg-gray-700"
          >
            <GiPreviousButton />
          </button>
          <div className="bg-white text-black rounded-full md:w-12 md:h-12 h-8 w-8">
            <button className=" flex justify-center items-center w-full h-full md:text-3xl text-xl" onClick={handlePlayPause}>
              {/* {isPlaying ? (
                <GiPauseButton className=" " />
              ) : (
                <GiPlayButton className="" />
              )} */}
              <PlayButton isPlaying={isPlaying} />
            </button>
          </div>
          <button
            onClick={nextTrack}
            className="bg-gray-800 text-white md:py-1 md:px-4 px-2 rounded-full hover:bg-gray-700"
          >
            <GiNextButton />
          </button>
        </div>

        {/* Speed Control */}
        <div className="flex flex-col mt-4">
          {/* <label>Speed</label> */}
          <select className="text-black" value={speed} onChange={handleSpeedChange}>
            <option value="0.25">0.25x</option>
            <option value="0.5">0.5x</option>
            <option value="1">1x</option>
            <option value="1.25">1.25x</option>
            <option value="1.5">1.5x</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default PlayerPage;
