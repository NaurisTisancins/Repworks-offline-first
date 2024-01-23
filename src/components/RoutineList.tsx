import { StyleSheet, View, Text, ScrollView } from 'react-native';
import RoutineView from './RoutineListItem';
import { useStore } from '../store/index';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import ButtonPrimary from './common/ButtonPrimary';
import { router } from 'expo-router';

const RoutineList = () => {
    const { routinesList, setSelectedRoutine, activeRoutines, getRoutines } =
        useStore();

    const getRoutinesList = async () => {
        await getRoutines();
    };

    useEffect(() => {
        // setSelectedRoutine(null);
        getRoutinesList();

        return () => {
            setSelectedRoutine(null);
        };
    }, []);

    return (
        <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            style={{
                flex: -1,
                display: 'flex',
                gap: 12,
            }}
        >
            <View style={styles.container}>
                {routinesList.map((item) => {
                    return <RoutineView key={item.routine_id} routine={item} />;
                })}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'red',
        height: '100%',
        gap: 12,
    },
});

export default observer(RoutineList);
