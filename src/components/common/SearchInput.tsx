import {
    View,
    StyleSheet,
    ViewStyle,
    Text,
    Pressable,
    TextInput,
} from 'react-native';
// import { TextInput } from './TextInput';
import React from 'react';
import MiniModal from './MiniModal';
import Icon from './Icon';

interface SearchInputProps {
    name: string;
    label: string;
    placeholder: string;
    onChange: (e: any) => void;
    value: string;
    setFormError?: React.Dispatch<React.SetStateAction<boolean>>;
    keyboardType?: 'default' | 'number-pad' | 'decimal-pad' | 'numeric';
    rules?: any;
}

function SearchInput({
    name,
    label,
    placeholder,
    onChange,
    value,
    setFormError,
    keyboardType = 'default',
    rules,
}: Readonly<SearchInputProps>) {
    const iconStyles: ViewStyle = {
        position: 'absolute',
        right: 10,
        top: 10,
        display: value ? 'none' : 'flex',
    };

    return (
        <View>
            <View>
                <Text style={styles.label}>{label}</Text>
                <View style={styles.searchSection}>
                    <TextInput
                        style={styles.input}
                        placeholder={placeholder}
                        onChange={onChange}
                        value={value}
                        keyboardType={keyboardType}
                    />
                    <Icon
                        name='search'
                        size={18}
                        color='black'
                        style={iconStyles}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    searchSection: {
        justifyContent: 'center',
    },

    label: {
        color: 'black',
        marginBottom: 10,
        marginLeft: 0,
    },
    input: {
        position: 'relative',
        backgroundColor: 'white',
        height: 40,
        padding: 10,
        borderRadius: 4,
        borderWidth: 1,
        marginBottom: 10,
    },
});

export default SearchInput;
