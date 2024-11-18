import { useState } from 'react';
import '../App.css';

function PlayButton() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="Button">
      <div
      
        className={`circle ${isPlaying ? 'rotate' : ''}`}
        onClick={handleClick}
      >
        <div className={`icon ${isPlaying ? 'pause' : 'play'}`}></div>
      </div>
    </div>
  );
}

export default PlayButton;
