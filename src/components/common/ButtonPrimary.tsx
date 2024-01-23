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

type ButtonProps = {
    title?: string;
    variant?: 'primary' | 'outlined';
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
        const baseStyle: StyleProp<ViewStyle> = {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: width,
            height: height,
            borderRadius: 8,
            ...(style as object),
        };

        const disabledStyle: string = 'lightblue';

        const backgroundColorPrimary = pressed ? 'coral' : 'teal';

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
                    backgroundColor: disabled ? disabledStyle : 'black',
                    borderWidth: 2,
                    borderColor: 'teal',
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
