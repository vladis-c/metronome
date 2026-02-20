import {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import ArcSlider from './src/components/ArcSlider';
import Pulse from './src/components/Pulse';
import RoundButton from './src/components/RoundButton';
import {START_BUTTON_Y_OFFSET} from './src/constants';
import useBeatSoundPlayer from './src/hooks/useBeatSoundPlayer';

const App = () => {
  const [beatCounter, setBeatCounter] = useState(0);
  const {previewBpm, setPreviewBpm, bpm, setBpm, isPlaying, setIsPlaying} =
    useBeatSoundPlayer({setBeatCounter});

  const [pulseXAxis, setPulseXAxis] = useState(0);

  return (
    <GestureHandlerRootView>
      <View
        pointerEvents="none"
        style={{
          display: !pulseXAxis ? 'none' : 'flex',
          position: 'absolute',
          marginTop: pulseXAxis,
        }}>
        <Pulse trigger={beatCounter} durationMs={60000 / bpm} />
      </View>
      <View style={styles.container}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 32, marginBottom: 24}}>{previewBpm} BPM</Text>
          <ArcSlider bpm={bpm} onEnd={setBpm} onChange={setPreviewBpm} />
          <View
            style={{top: START_BUTTON_Y_OFFSET}}
            onLayout={e =>
              setPulseXAxis(e.nativeEvent.layout.x + START_BUTTON_Y_OFFSET)
            }>
            <RoundButton
              title={isPlaying ? 'Stop' : 'Start'}
              onPress={() => setIsPlaying(prev => !prev)}
            />
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  bpmText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
});
