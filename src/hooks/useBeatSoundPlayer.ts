import {setAudioModeAsync, useAudioPlayer} from 'expo-audio';
import {useEffect, useRef, useState} from 'react';
import {INITIAL_BPM, MINUTE} from '../constants';

const audio = require('../../assets/freesound_community-metronome-85688.mp3');

const useBeatSoundPlayer = ({
  setBeatCounter,
}: {
  setBeatCounter: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [bpm, setBpm] = useState(INITIAL_BPM);
  const [previewBpm, setPreviewBpm] = useState(bpm);

  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const player = useAudioPlayer(audio);

  useEffect(() => {
    setAudioModeAsync({
      playsInSilentMode: true,
      shouldPlayInBackground: false,
      interruptionMode: 'doNotMix',
    });
  }, []);

  useEffect(() => {
    player.volume = 1; // max volume
  }, [player]);

  const playSound = async () => {
    try {
      await player.seekTo(0);
      player.play();
      setBeatCounter(prev => prev + 1);
    } catch (e) {
      //TODO: alert
      console.log('Error when playing the sound', e);
    }
  };

  const startMetronome = () => {
    stopMetronome(); // stops previous one
    playSound(); // first sound before the interval starts
    if (!intervalRef.current) {
      intervalRef.current = setInterval(playSound, MINUTE / bpm);
    }
  };

  const stopMetronome = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (!isPlaying) {
      stopMetronome();
      return;
    }
    startMetronome();

    return () => stopMetronome();
  }, [isPlaying, bpm]);

  return {bpm, setBpm, isPlaying, setIsPlaying, previewBpm, setPreviewBpm};
};

export default useBeatSoundPlayer;
