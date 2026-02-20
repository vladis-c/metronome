import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors, typography} from '../theme';

const RoundButton = ({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor: colors.blue[900]}]}
      onPress={onPress}>
      <Text style={[typography.body, {color: colors.blue[100]}]}>{title}</Text>
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
