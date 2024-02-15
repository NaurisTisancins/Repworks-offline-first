import { View, Text, StyleSheet, TextInput } from 'react-native';
import Colors from '../../constants/Colors';

type FormFieldProps = {
    label?: string;
    value: string;
    placeholder: string;
    fieldName?: string;
    onBlur?: ((e: any) => void) | undefined;
    onChangeText: ((text: string) => void) | undefined;
    multiline?: boolean;
    numberOfLines?: number;
};

const FormField = ({
    label,
    value,
    placeholder,
    fieldName,
    onBlur,
    onChangeText,
    multiline,
    numberOfLines = 1,
}: FormFieldProps) => {
    const inputStyleProps = multiline
        ? styles.multiLineInputField
        : styles.inputField;

    return (
        <View style={styles.inputFieldContainer}>
            {label && <Text style={styles.inputLabel}>{label}</Text>}
            <TextInput
                multiline={multiline}
                numberOfLines={numberOfLines}
                data-set={fieldName ?? 'no-field-name'}
                placeholder={placeholder}
                onChangeText={onChangeText}
                value={value}
                onBlur={onBlur}
                style={inputStyleProps}
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
        color: Colors.dark.grayCool[200],
        width: '100%',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 3,
    },
    inputField: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        padding: 5,
        paddingLeft: 10,
        fontSize: 16,
        fontWeight: '600',
        color: 'black',
        backgroundColor: 'white',
    },
    multiLineInputField: {
        width: '100%',
        minHeight: 80,
        borderWidth: 1,
        borderRadius: 10,
        padding: 5,
        paddingLeft: 10,
        fontSize: 16,
        fontWeight: '600',
        color: 'black',
        backgroundColor: 'white',
    },
});

export default FormField;
