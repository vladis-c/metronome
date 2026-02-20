import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const RoundButton = ({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

export default RoundButton;

const styles = StyleSheet.create({
  button: {
    height: 48,
    width: 48,
    borderRadius: 24,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
