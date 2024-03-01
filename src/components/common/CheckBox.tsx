import React, { useState } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text,
    TextStyle,
} from 'react-native';
import Colors, { Shadows } from '../../constants/Colors';
import Sizing from '../../constants/Sizing';

type CheckboxProps = {
    checked?: boolean;
    onChecked?: () => void;
    label?: string;
    width?: number;
    height?: number;
};

const Checkbox = ({
    checked,
    onChecked,
    label,
    width,
    height,
}: CheckboxProps) => {
    const checkboxStyles = {
        ...styles.checkbox,
        width: width ? width : 20,
        height: height ? height : 20,
    };

    const labelCheckStyles: TextStyle = {
        fontSize: Sizing.fontSize.md,
        fontWeight: '600',
    };

    return (
        <TouchableOpacity style={styles.container} onPress={onChecked}>
            <View
                style={[
                    checkboxStyles,
                    checked ? styles.checked : styles.backgroundColor,
                ]}
            >
                {label && (
                    <Text
                        style={[
                            labelCheckStyles,
                            checked
                                ? styles.lableCheckedColor
                                : styles.labelColor,
                        ]}
                    >
                        {label}
                    </Text>
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.dark.background[200],
        borderRadius: Sizing.borderRadius.sm,
        ...Shadows.light.elevation2,
    },
    checkbox: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: Colors.dark.green[600],
        borderRadius: Sizing.borderRadius.sm,
    },
    backgroundColor: {
        backgroundColor: Colors.dark.background[200],
    },
    checked: {
        backgroundColor: Colors.dark.green[600], // Change to desired color when checked
    },
    labelColor: {
        color: Colors.dark.green[600],
    },
    lableCheckedColor: {
        color: Colors.dark.green[100],
    },
});

export default Checkbox;
