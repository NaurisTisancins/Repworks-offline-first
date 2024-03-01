import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../../components/Themed';
import RoutineList from '../../components/RoutineList';
import Button from '../../components/common/Button';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../constants/Colors';
import { useStore } from '../../store';

const RoutineListScreen = () => {
    const {
        RoutineStore: { setSelectedRoutine },
    } = useStore();

    return (
        <SafeAreaView style={styles.container}>
            <RoutineList />
            <View
                style={{
                    right: 0,
                    left: 0,
                    position: 'absolute',
                    bottom: 100,
                    backgroundColor: 'transparent',
                    paddingHorizontal: 14,
                }}
            >
                <Button
                    onButtonPress={() => {
                        setSelectedRoutine(null);

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
        backgroundColor: Colors.dark.background[600],
        height: '100%',
        paddingHorizontal: 14,
    },
});

export default RoutineListScreen;
