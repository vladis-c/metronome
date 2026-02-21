import {useEffect, useRef} from 'react';
import {Dimensions} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {ARC_RADIUS} from '../constants';
import {colors} from '../theme';

const {width, height} = Dimensions.get('window');

const DEFAULT_CENTER_X = width / 2;
const DEFAULT_CENTER_Y = height / 2;

type PulseProps = {
  trigger: number;
  durationMs: number;
  centerX?: number;
  centerY?: number;
};

const Pulse = ({trigger, durationMs, centerX, centerY}: PulseProps) => {
  const progress = useSharedValue(0);
  const didMount = useRef(false);

  useEffect(() => {
    // to skip first pulse on initial render
    if (didMount.current) {
      progress.value = 0;
      progress.value = withTiming(1, {
        duration: durationMs,
        easing: Easing.out(Easing.quad),
      });
    }
    return () => {
      didMount.current = true;
    };
  }, [trigger]);

  const style = useAnimatedStyle(() => {
    const radius = progress.value * ARC_RADIUS;
    const cx = centerX ?? DEFAULT_CENTER_X;
    const cy = centerY ?? DEFAULT_CENTER_Y;

    return {
      position: 'absolute',
      width: radius * 2,
      height: radius * 2,
      borderRadius: radius,
      opacity: 1 - progress.value,
      transform: [{translateX: cx - radius}, {translateY: cy - radius}],
    };
  });

  return <Animated.View style={[{backgroundColor: colors.tertiary}, style]} />;
};

export default Pulse;
