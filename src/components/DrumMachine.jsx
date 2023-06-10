import React, { useState, useEffect, useCallback } from 'react';
import '../App.scss';

const sounds = [
  {
    keyCode: 81,
    key: 'Q',
    id: 'Heater-1',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
  },
  {
    keyCode: 87,
    key: 'W',
    id: 'Heater-2',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
  },
  {
    keyCode: 69,
    key: 'E',
    id: 'Heater-3',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
  },
  {
    keyCode: 65,
    key: 'A',
    id: 'Heater-4',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
  },
  {
    keyCode: 83,
    key: 'S',
    id: 'Clap',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
  },
  {
    keyCode: 68,
    key: 'D',
    id: 'Open-HH',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
  },
  {
    keyCode: 90,
    key: 'Z',
    id: "Kick-n'-Hat",
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
  },
  {
    keyCode: 88,
    key: 'X',
    id: 'Kick',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
  },
  {
    keyCode: 67,
    key: 'C',
    id: 'Closed-HH',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
  },
];

const Options = ({
  power,
  playing,
  handlePowerChange,
  handleVolumeChange,
  volume,
}) => {
  return (
    <div id="options">
      <div id="display">{playing}</div>
      <div id="sliders">
        <label className="label" htmlFor="power">
          Open
          <div className="flipswitch">
            <input
              type="checkbox"
              name="flipswitch"
              className="flipswitch-cb"
              id="power"
              onChange={handlePowerChange}
              checked={power}
              defaultChecked
            />
            <label className="flipswitch-label" htmlFor="power">
              <div className="flipswitch-inner"></div>
              <div className="flipswitch-switch"></div>
            </label>
          </div>
        </label>
        <div id="volume">
          <label htmlFor="volume">
            Volume
            <input
              type="range"
              name="volume"
              id="volume-range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

const DrumMachine = () => {
  const [playing, setPlaying] = useState('');
  const [power, setPower] = useState(true);
  const [volume, setVolume] = useState(0.5); // Initial volume level

  const handlePlaySound = useCallback(
    (event, sound) => {
      if (!power) {
        return;
      }
      const audioElement = document.getElementById(sound.key);
      const buttonElement = event.target;
      audioElement.currentTime = 0;
      audioElement.volume = volume; // Set the volume
      audioElement.play();
      buttonElement.classList.add('animate-pad');
      setTimeout(() => {
        buttonElement.classList.remove('animate-pad');
      }, 100);
      setPlaying(sound.id);
    },
    [power, volume],
  );

  const handleKeyDown = useCallback(
    (event) => {
      const sound = sounds.find((item) => event.keyCode === item.keyCode);
      if (sound) {
        const buttonElement = document.getElementById(sound.id);
        if (buttonElement) {
          handlePlaySound({ target: buttonElement }, sound);
        }
      }
    },
    [handlePlaySound],
  );

  const handlePowerChange = (event) => {
    setPower(event.target.checked);
  };

  const handleVolumeChange = (event) => {
    setVolume(parseFloat(event.target.value));
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div id="drum-machine">
      <div id="buttons">
        {sounds.map((sound) => {
          return (
            <button
              className="drum-pad"
              id={sound.id}
              onMouseDown={(event) => {
                handlePlaySound(event, sound);
              }}
            >
              <audio
                src={sound.src}
                className="clip"
                id={sound.key}
                onEnded={() => {
                  const audioElement = document.getElementById(sound.key);
                  audioElement.currentTime = 0;
                }}
              ></audio>
              {sound.key}
            </button>
          );
        })}
      </div>
      <Options
        playing={playing}
        handlePowerChange={handlePowerChange}
        handleVolumeChange={handleVolumeChange}
        volume={volume}
      />
    </div>
  );
};

export default DrumMachine;
