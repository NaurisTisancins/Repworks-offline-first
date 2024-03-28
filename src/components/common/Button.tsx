import {
    Text,
    StyleSheet,
    Pressable,
    DimensionValue,
    StyleProp,
    ViewStyle,
    TextStyle,
} from 'react-native';
import Colors, { Shadows } from '../../constants/Colors';

type ButtonProps = {
    title?: string;
    titleStyles?: StyleProp<TextStyle>;
    variant?: 'primary' | 'outlined' | 'danger' | 'passive' | 'success';
    disabled?: boolean;
    onButtonPress: () => void;
    width?: DimensionValue | undefined;
    height?: DimensionValue | undefined;
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
};

export default function Button({
    title,
    titleStyles,
    variant = 'primary',
    disabled = false,
    onButtonPress,
    width,
    height = 40,
    children,
    style,
}: ButtonProps) {
    const buttonVariantStyles = (pressed: boolean): StyleProp<ViewStyle> => {
        const disabledStyle: string = Colors.dark.grayCool[400];

        const backgroundColorPrimary = pressed
            ? Colors.dark.accent7
            : Colors.dark.primary;

        const backgroundColorOutlined = pressed
            ? Colors.dark.grayCool[200]
            : Colors.dark.background[600];

        const backgroundColorSuccess = pressed
            ? Colors.dark.green[200]
            : Colors.dark.green[500];

        const baseStyle: StyleProp<ViewStyle> = {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: width ?? '100%',
            height: height,
            borderRadius: 8,
            ...Shadows.light.elevation2,
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
                    borderColor: Colors.dark.grayCool[400],
                };
            case 'danger':
                return {
                    ...baseStyle,
                    backgroundColor: disabled
                        ? disabledStyle
                        : Colors.dark.danger,
                };

            case 'success':
                return {
                    ...baseStyle,
                    backgroundColor: disabled
                        ? disabledStyle
                        : backgroundColorSuccess,
                };
            case 'passive':
                return {
                    ...baseStyle,
                    backgroundColor: disabled
                        ? disabledStyle
                        : Colors.dark.grayCool[400],
                };
        }
    };

    return (
        <Pressable
            onPress={onButtonPress}
            disabled={disabled}
            style={({ pressed }) => buttonVariantStyles(pressed)}
        >
            {children ?? (
                <Text style={[titleStyles ? titleStyles : styles.buttonText]}>
                    {title}
                </Text>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    buttonText: {
        textAlign: 'center',
        color: Colors.dark.grayCool[200],
        fontWeight: '600',
        fontSize: 16,
    },
});
