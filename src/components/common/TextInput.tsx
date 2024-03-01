import React from 'react';

import {
    DimensionValue,
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
    Control,
} from 'react-hook-form';
import Sizing from '../../constants/Sizing';
import Colors, { InsetShadows, Shadows } from '../../constants/Colors';

interface TextInputProps extends RNTextInputProps, UseControllerProps {
    label?: string;
    labelColor?: string;
    name: string;
    height?: number;
    width?: number;
    paddngHorizontal?: number;
    paddingVertical?: number;
    defaultValue?: string;
    backgroundColor?: string;
    placeholder?: string;
    setFormError: Function;
}

const ControlledInput = (props: TextInputProps) => {
    const formContext = useFormContext();
    const { formState } = formContext;

    const { name, label, labelColor, rules, defaultValue, ...inputProps } =
        props;

    const { field } = useController({ name, rules, defaultValue });

    const hasError = Boolean(formState?.errors[name]);

    const inputStyles = {
        ...styles.input,
        backgroundColor: props.backgroundColor ?? styles.input.backgroundColor,
        height: props.height ? props.height : 40,
        width: props.width ?? ('100%' as DimensionValue),
        paddingHorizontal: props.paddngHorizontal
            ? props.paddngHorizontal
            : Sizing.spacing['md'],
        paddingVertical: props.paddingVertical
            ? props.paddingVertical
            : Sizing.spacing['xs'],
    };

    const inputStyleProps = props.multiline
        ? styles.multiLineInput
        : inputStyles;

    const lableStyle = {
        ...styles.label,
        color: labelColor ? labelColor : styles.label.color,
    };

    return (
        <View style={styles.container}>
            {label && <Text style={lableStyle}>{label}</Text>}
            <View style={{ backgroundColor: 'transparent' }}>
                <RNTextInput
                    autoCapitalize='none'
                    textAlign='left'
                    onChangeText={field.onChange}
                    onBlur={field.onBlur}
                    inputMode={inputProps.inputMode ?? 'text'}
                    value={field.value.toString()}
                    {...inputProps}
                    style={inputStyleProps}
                />

                <View style={[hasError && styles.errorContainer]}>
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
        color: Colors.dark.grayCool[800],
        fontSize: Sizing.fontSize['sm'],
        paddingBottom: Sizing.spacing['xs'],
        paddingLeft: Sizing.spacing['xs'],
        marginLeft: 0,
    },
    container: {
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    input: {
        backgroundColor: Colors.dark.grayWarm[100],
        borderRadius: Sizing.borderRadius['sm'],
        ...Shadows.light.elevation2,
    },
    multiLineInput: {
        backgroundColor: Colors.dark.grayWarm[100],
        minHeight: 80,
        borderRadius: Sizing.borderRadius['sm'],
        ...Shadows.light.elevation2,
    },
    errorContainer: {
        height: 25,
        backgroundColor: Colors.dark.transparent,
    },
    error: {
        backgroundColor: Colors.dark.transparent,
        color: 'red',
    },
});
