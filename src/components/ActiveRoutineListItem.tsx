import { Routine } from '../store/Types';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useStore } from '../store';
import Colors from '../constants/Colors';
import { useEffect } from 'react';

type RoutineProps = {
    routine: Routine;
};

export default function ActiveRoutineListItem({ routine }: RoutineProps) {
    const {
        RoutineStore: {
            setSelectedRoutine,
            getTrainingDaysWithExercises,
            trainingDays,
        },
    } = useStore();
    // const numberOfTrainingDays = routine.length;

    useEffect(() => {
        getTrainingDaysWithExercises(routine.routine_id);
    }, []);

    function onSelect(): void {
        if (routine && routine.routine_id) {
            setSelectedRoutine(routine);
            getTrainingDaysWithExercises(routine?.routine_id);
            router.push(`/routine/${routine.routine_id}`);
        }
    }
    return (
        <Pressable onPress={onSelect} style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{routine.name}</Text>
                <Text style={{ color: Colors.dark.accent6 }}>
                    {trainingDays.length} day split
                </Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        minHeight: 50,
        width: '100%',
        backgroundColor: Colors.dark.accent2,
        borderRadius: 20,
        padding: 15,
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.dark.white,
        ...Colors.dark.shadowStyle,
    },
});
