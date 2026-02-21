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
  const [pulseCenter, setPulseCenter] = useState<{x: number; y: number} | null>(
    null,
  );

  return (
    <GestureHandlerRootView>
      <View style={[styles.container, {backgroundColor: colors.primary}]}>
        <Text
          style={{
            ...typography.h1,
            color: colors.text,
            marginBottom: 24,
          }}>
          {previewBpm} BPM
        </Text>
        <View style={styles.arcContainer}>
          <ArcSlider bpm={bpm} onEnd={setBpm} onChange={setPreviewBpm} />
          <View
            style={styles.button}
            onLayout={e => {
              const {x, y, width, height} = e.nativeEvent.layout;
              setPulseCenter({x: x + width / 2, y: y + height / 2});
            }}>
            <RoundButton
              title={isPlaying ? 'Stop' : 'Start'}
              onPress={() => setIsPlaying(prev => !prev)}
            />
          </View>
          <View pointerEvents="none" style={styles.pulse}>
            <Pulse
              trigger={beatCounter}
              durationMs={MINUTE / bpm}
              centerX={pulseCenter?.x}
              centerY={pulseCenter?.y}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  arcContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {marginTop: START_BUTTON_Y_OFFSET, zIndex: 1},
  pulse: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
