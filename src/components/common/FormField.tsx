import { View, Text, StyleSheet, TextInput } from 'react-native';

type FormFieldProps = {
  label: string;
  value: string;
  fieldName: string;
  onChangeText: ((text: string) => void) | undefined;
};

const FormField = ({
  label,
  value,
  fieldName,
  onChangeText,
}: FormFieldProps) => {
  return (
    <View style={styles.inputFieldContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        data-set={fieldName}
        style={styles.inputField}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputFieldContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 10,
  },
  inputLabel: {
    color: 'darkgray',
    width: '100%',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 3,
  },
  inputField: {
    height: 40,
    width: '100%',
    borderColor: 'darkgray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
    backgroundColor: 'white',
  },
});

export default FormField;
