import { useState } from 'react';
import {
  Text,
  StyleSheet,
  Pressable,
  DimensionValue,
  TouchableHighlight,
} from 'react-native';

type ButtonProps = {
  title: string;
  type?: string;
  disabled?: boolean;
  onButtonPress: () => void;
  width?: DimensionValue | undefined;
  height?: DimensionValue | undefined;
};

export default function ButtonPrimary({
  title,
  disabled,
  onButtonPress,
  width,
  height = 40,
}: ButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const touchProps = {
    style: isPressed ? styles.btnPress : styles.button, // <-- but you can still apply other style changes
    onPressIn: () => setIsPressed(true),
    onPressOut: () => setIsPressed(false),
  };

  return (
    <Pressable
      onPress={onButtonPress}
      {...touchProps}
      style={[
        { width: width, height: height },
        isPressed ? styles.btnPress : styles.button,
      ]}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'teal',
    borderRadius: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  btnPress: {
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'coral',
    borderRadius: 20,
  },
});
