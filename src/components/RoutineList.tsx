import { StyleSheet, View, Text, ScrollView } from 'react-native';
import RoutineView from './RoutineListItem';
import { useStore } from '../store/index';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import ButtonPrimary from './common/ButtonPrimary';
import { router } from 'expo-router';

const RoutineList = () => {
    const { routinesList, activeRoutine, getRoutines } = useStore();

    const getRoutinesList = async () => {
        await getRoutines();
    };

    useEffect(() => {
        getRoutinesList();
    }, []);

    return (
        <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.container}>
                {routinesList
                    .filter((routine) => {
                        if (routine.is_active) {
                            return !routine.is_active;
                        }
                        return routine;
                    })
                    .map((item) => {
                        return (
                            <RoutineView key={item.routine_id} routine={item} />
                        );
                    })}
            </View>
            <ButtonPrimary
                onButtonPress={() => {
                    router.push('/routine/createRoutine');
                }}
                title='Create a new routine'
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        marginBottom: 20,
    },
});

export default observer(RoutineList);
