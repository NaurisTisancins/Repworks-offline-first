import { Link } from 'expo-router';
import { useState } from 'react';
import {
    Text,
    StyleSheet,
    Pressable,
    DimensionValue,
    TouchableHighlight,
    StyleProp,
    ViewStyle,
    PressableStateCallbackType,
    PressableProps,
} from 'react-native';
import Colors from '../../constants/Colors';

type ButtonProps = {
    title?: string;
    variant?: 'primary' | 'outlined' | 'danger' | 'passive';
    disabled?: boolean;
    onButtonPress: () => void;
    width?: DimensionValue | undefined;
    height?: DimensionValue | undefined;
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
};

export default function ButtonPrimary({
    title,
    variant = 'primary',
    disabled = false,
    onButtonPress,
    width,
    height = 40,
    children,
    style,
}: ButtonProps) {
    const buttonVariantStyles = (pressed: boolean): StyleProp<ViewStyle> => {
        const disabledStyle: string = Colors.dark['gray300'];

        const backgroundColorPrimary = pressed
            ? Colors.dark.accent7
            : Colors.dark.primary;

        const backgroundColorOutlined = pressed
            ? Colors.dark.gray400
            : Colors.dark.background;

        const baseStyle: StyleProp<ViewStyle> = {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: width ?? '100%',
            height: height,
            borderRadius: 8,
            ...Colors.dark.shadowStyle,
            ...(style as object),
        };

        switch (variant) {
            case 'primary':
                return {
                    ...baseStyle,
                    backgroundColor: disabled
                        ? disabledStyle
                        : backgroundColorPrimary,
                };
            case 'outlined':
                return {
                    ...baseStyle,
                    backgroundColor: disabled
                        ? disabledStyle
                        : backgroundColorOutlined,
                    borderWidth: 2,
                    borderColor: Colors.dark.primary,
                };
            case 'danger':
                return {
                    ...baseStyle,
                    backgroundColor: disabled
                        ? disabledStyle
                        : Colors.dark.danger,
                };
            case 'passive':
                return {
                    ...baseStyle,
                    backgroundColor: disabled
                        ? disabledStyle
                        : Colors.dark['gray'],
                };
        }
    };

    return (
        <>
            <Pressable
                onPress={onButtonPress}
                disabled={disabled}
                style={({ pressed }) => buttonVariantStyles(pressed)}
            >
                {children ?? <Text style={styles.buttonText}>{title}</Text>}
            </Pressable>
        </>
    );
}

const styles = StyleSheet.create({
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
});
