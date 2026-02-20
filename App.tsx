import {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import ArcSlider from './src/components/ArcSlider';
import Pulse from './src/components/Pulse';
import RoundButton from './src/components/RoundButton';
import {MINUTE, START_BUTTON_Y_OFFSET} from './src/constants';
import useBeatSoundPlayer from './src/hooks/useBeatSoundPlayer';
import {colors, typography} from './src/theme/';

const App = () => {
  const [beatCounter, setBeatCounter] = useState(0);
  const {previewBpm, setPreviewBpm, bpm, setBpm, isPlaying, setIsPlaying} =
    useBeatSoundPlayer({setBeatCounter});
  const [pulseXAxis, setPulseXAxis] = useState(0);

  return (
    <GestureHandlerRootView>
      <View style={{flex: 1, backgroundColor: colors.primary}}>
        <View
          pointerEvents="none"
          style={{
            display: !pulseXAxis ? 'none' : 'flex',
            position: 'absolute',
            marginTop: pulseXAxis,
          }}>
          <Pulse trigger={beatCounter} durationMs={MINUTE / bpm} />
        </View>
        <View style={styles.wrapper}>
          <View style={styles.container}>
            <Text
              style={{
                ...typography.h1,
                color: colors.text,
                marginBottom: 24,
              }}>
              {previewBpm} BPM
            </Text>
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
      </View>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  row: {
    flexDirection: 'row',
    gap: 12,
  },
});
