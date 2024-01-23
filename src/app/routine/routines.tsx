import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import RoutineList from '../../components/RoutineList';
import ButtonPrimary from '../../components/common/ButtonPrimary';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const RoutineListScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <RoutineList />
            <View
                style={{
                    right: 0,
                    left: 0,
                    position: 'absolute',
                    bottom: 100,
                }}
            >
                <ButtonPrimary
                    onButtonPress={() => {
                        router.push('/routine/createRoutine');
                    }}
                    title='Create a new routine'
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        height: '100%',
        marginHorizontal: 14,
    },
});

export default RoutineListScreen;
