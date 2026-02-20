import {useEffect, useRef} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {ARC_RADIUS} from '../constants';
import {colors} from '../theme';

const {width, height} = Dimensions.get('window');

const CENTER_X = width / 2;
const CENTER_Y = height / 2;

type PulseProps = {
  trigger: number;
  durationMs: number;
};

const Pulse = ({trigger, durationMs}: PulseProps) => {
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
    const radius = progress.value * ARC_RADIUS + 20;

    return {
      width: radius * 2,
      height: radius * 2,
      borderRadius: radius,
      opacity: 1 - progress.value,
      transform: [
        {translateX: CENTER_X - radius},
        {translateY: CENTER_Y - radius},
      ],
    };
  });

  return <Animated.View style={[{backgroundColor: colors.blue[100]}, style]} />;
};

export default Pulse;
