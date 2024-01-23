import React from 'react';

import {
    View,
    TextInput as RNTextInput,
    TextInputProps as RNTextInputProps,
    Text,
    StyleSheet,
} from 'react-native';

import {
    useController,
    useFormContext,
    ControllerProps,
    UseControllerProps,
} from 'react-hook-form';

interface TextInputProps extends RNTextInputProps, UseControllerProps {
    label: string;
    labelColor?: string;
    name: string;
    defaultValue?: string;
    setFormError: Function;
}

const ControlledInput = (props: TextInputProps) => {
    const formContext = useFormContext();
    const { formState } = formContext;

    const { name, label, labelColor, rules, defaultValue, ...inputProps } =
        props;

    const { field } = useController({ name, rules, defaultValue });

    const hasError = Boolean(formState?.errors[name]);

    const inputStyleProps = props.multiline
        ? styles.multiLineInput
        : styles.input;

    const lableStyle = {
        ...styles.label,
        color: labelColor ? labelColor : styles.label.color,
    };

    return (
        <View style={styles.container}>
            {label && <Text style={lableStyle}>{label}</Text>}
            <View>
                <RNTextInput
                    autoCapitalize='none'
                    textAlign='left'
                    onChangeText={field.onChange}
                    onBlur={field.onBlur}
                    value={field.value}
                    {...inputProps}
                    style={inputStyleProps}
                />

                <View style={styles.errorContainer}>
                    {hasError && (
                        <Text style={styles.error}>
                            {formState?.errors[name]?.message?.toString()}
                        </Text>
                    )}
                </View>
            </View>
        </View>
    );
};

export const TextInput = (props: TextInputProps) => {
    const { name, rules, label, defaultValue, setFormError, ...inputProps } =
        props;

    const formContext = useFormContext();

    // Placeholder until input name is initialized
    if (!formContext || !name) {
        const msg = !formContext
            ? 'TextInput must be wrapped by the FormProvider'
            : 'Name must be defined';
        console.error(msg);
        setFormError(true);
        return null;
    }

    return <ControlledInput {...props} />;
};

const styles = StyleSheet.create({
    label: {
        color: 'white',
        marginBottom: 10,
        marginLeft: 0,
    },
    container: {
        flex: -1,
        justifyContent: 'center',
    },
    input: {
        backgroundColor: 'white',
        height: 40,
        padding: 10,
        borderRadius: 4,
    },
    multiLineInput: {
        backgroundColor: 'white',
        minHeight: 80,
        padding: 10,
        borderRadius: 4,
    },
    errorContainer: {
        flex: -1,
        height: 25,
    },
    error: {
        color: 'red',
    },
});
