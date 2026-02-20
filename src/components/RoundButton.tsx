import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors, typography} from '../theme';

type RoundButtonProps = {
  title: string;
  onPress: () => void;
};

const RoundButton = ({title, onPress}: RoundButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor: colors.secondary}]}
      onPress={onPress}>
      <Text style={[typography.body, {color: colors.text}]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default RoundButton;

const styles = StyleSheet.create({
  button: {
    height: 48,
    width: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
