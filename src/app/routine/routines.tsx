import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import RoutineList from '../../components/RoutineList';

const RoutineListScreen = () => {
    return (
        <View style={styles.container}>
            <RoutineList />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        marginHorizontal: 14,
        marginVertical: 30,
    },
});

export default RoutineListScreen;
