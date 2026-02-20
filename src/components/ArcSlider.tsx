import {StyleSheet, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import Svg, {Path} from 'react-native-svg';
import {runOnJS} from 'react-native-worklets';
import {
  ARC_RADIUS,
  ARC_SIZE,
  KNOB_PATH_OFFSET,
  KNOB_SIZE,
  MAX_BPM,
  MIN_BPM,
} from '../constants';

type Props = {
  bpm: number;
  onEnd: (bpm: number) => void;
  onChange: (bpm: number) => void;
};

const ArcSlider = ({bpm, onEnd, onChange}: Props) => {
  const angle = useSharedValue(bpmToAngle(bpm));

  const pan = Gesture.Pan()
    .onUpdate(e => {
      const x = e.x - ARC_RADIUS;
      const y = e.y - ARC_RADIUS;

      let a = Math.atan2(y, x);

      if (a > 0) {
        a = 0;
      }
      if (a < -Math.PI) {
        a = -Math.PI;
      }

      angle.value = a;

      runOnJS(onChange)(angleToBpm(a));
    })
    .onEnd(() => runOnJS(onEnd)(angleToBpm(angle.value)));

  const knobStyle = useAnimatedStyle(() => {
    const x =
      ARC_RADIUS +
      (ARC_RADIUS + KNOB_PATH_OFFSET) * Math.cos(angle.value) -
      KNOB_SIZE / 2;
    const y =
      ARC_RADIUS +
      (ARC_RADIUS + KNOB_PATH_OFFSET) * Math.sin(angle.value) -
      KNOB_SIZE / 2;

    return {
      transform: [{translateX: x}, {translateY: y}],
    };
  });

  return (
    <View style={styles.container}>
      <GestureDetector gesture={pan}>
        <View style={styles.root}>
          <Svg width={ARC_SIZE} height={ARC_RADIUS}>
            <Path
              d={createArcPath(
                ARC_RADIUS,
                ARC_RADIUS,
                ARC_RADIUS - 6,
                -Math.PI,
                0,
              )}
              stroke="#ddd"
              strokeWidth={6}
              fill="none"
              strokeLinecap="round"
            />
          </Svg>
          <Animated.View style={[styles.knob, knobStyle]} />
        </View>
      </GestureDetector>
    </View>
  );
};

export default ArcSlider;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  root: {
    width: ARC_SIZE,
    height: ARC_RADIUS + KNOB_SIZE / 2,
  },
  arcContainer: {
    width: ARC_SIZE,
    height: ARC_RADIUS,
    borderTopLeftRadius: ARC_RADIUS,
    borderTopRightRadius: ARC_RADIUS,
    backgroundColor: '#eee',
    overflow: 'hidden',
  },
  knob: {
    position: 'absolute',
    width: KNOB_SIZE,
    height: KNOB_SIZE,
    borderRadius: KNOB_SIZE / 2,
    backgroundColor: '#000',
  },
});

//// HELPERS ///

const bpmToAngle = (bpm: number) => {
  'worklet';
  const t = (bpm - MIN_BPM) / (MAX_BPM - MIN_BPM);
  return -Math.PI + t * Math.PI;
};

const angleToBpm = (angle: number) => {
  'worklet';
  const t = (angle + Math.PI) / Math.PI;
  return Math.round(MIN_BPM + t * (MAX_BPM - MIN_BPM));
};

// TODO: naming
const polarToCartesian = (cx: number, cy: number, r: number, angle: number) => {
  'worklet';
  return {
    x: cx + r * Math.cos(angle),
    y: cy + r * Math.sin(angle),
  };
};

const createArcPath = (
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number,
) => {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);

  const largeArcFlag = endAngle - startAngle <= Math.PI ? '0' : '1';

  return `M ${start.x} ${start.y}
          A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
};
