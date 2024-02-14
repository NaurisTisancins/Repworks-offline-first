import React from 'react';

import {
    TextInput as RNTextInput,
    TextInputProps as RNTextInputProps,
    StyleSheet,
} from 'react-native';

import { View, Text } from '../../components/Themed';

import {
    useController,
    useFormContext,
    ControllerProps,
    UseControllerProps,
} from 'react-hook-form';
import Sizing from '../../constants/Sizing';
import Colors from '../../constants/Colors';

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
            <View style={{ backgroundColor: Colors.dark.background }}>
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
        color: Colors.dark.textSecondary,
        fontSize: Sizing.fontSize['sm'],
        paddingBottom: Sizing.spacing['xs'],
        paddingLeft: Sizing.spacing['xs'],
        marginLeft: 0,
    },
    container: {
        justifyContent: 'center',
        backgroundColor: Colors.dark.background,
    },
    input: {
        backgroundColor: Colors.dark.white,
        height: 40,
        paddingHorizontal: Sizing.spacing['md'],
        borderRadius: Sizing.borderRadius['sm'],
    },
    multiLineInput: {
        backgroundColor: Colors.dark.white,
        minHeight: 80,
        paddingHorizontal: Sizing.spacing['md'],
        borderRadius: Sizing.borderRadius['sm'],
    },
    errorContainer: {
        height: 25,
        backgroundColor: Colors.dark.background,
    },
    error: {
        backgroundColor: Colors.dark.background,
        color: 'red',
    },
});
