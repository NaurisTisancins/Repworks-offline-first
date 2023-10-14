import { View, Text, StyleSheet, Pressable } from 'react-native';

type ButtonProps = {
  title: string;
  type?: string;
  disabled?: boolean;
  onButtonPress: () => void;
  width?: number;
  height?: number;
};

export default function ButtonPrimary({
  title,
  disabled,
  onButtonPress,
  width,
  height = 40,
}: ButtonProps) {
  return (
    <Pressable
      onPress={onButtonPress}
      style={[styles.button, { width: width, height: height }]}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
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
});
