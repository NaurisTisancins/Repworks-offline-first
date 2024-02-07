import { Routine } from '../store/Types';
import { StyleSheet, Pressable, StyleProp, ViewStyle } from 'react-native';
import { Text, View } from '../components/Themed';
import { useStore } from '../store/index';
import { router } from 'expo-router';
import Colors from '../constants/Colors';
import Sizing from '../constants/Sizing';
import { useEffect } from 'react';

type RoutineProps = {
    routine: Routine;
};

export default function RoutineListItem({ routine }: Readonly<RoutineProps>) {
    const {
        RoutineStore: {
            setSelectedRoutine,
            getTrainingDaysWithExercises,
            getTrainingDays,
            trainingDays,
        },
    } = useStore();

    useEffect(() => {
        getTrainingDays(routine.routine_id);
    }, []);

    function onSelect(): void {
        setSelectedRoutine(routine);
        getTrainingDaysWithExercises(routine.routine_id);
        router.push(`/routine/${routine.routine_id}`);
    }

    const activeStyle: StyleProp<ViewStyle> = {
        height: 50,
        width: '100%',
        backgroundColor: `${Colors.dark['gray200']}`,
        borderRadius: 20,
        padding: 15,
    };

    return (
        <Pressable onPress={onSelect} style={activeStyle}>
            <View style={styles.header}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{routine.name}</Text>
                    {routine.is_active && (
                        <Text
                            style={{
                                color: Colors.dark.gray600,
                                backgroundColor: 'transparent',
                                fontSize: Sizing.fontSize['xs'],
                                verticalAlign: 'top',
                            }}
                        >
                            Active
                        </Text>
                    )}
                </View>
                {trainingDays.length > 0 && (
                    <Text>{trainingDays.length} day split</Text>
                )}
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    titleContainer: {
        flexDirection: 'row',
        gap: Sizing.spacing['xs'],
        backgroundColor: 'transparent',
    },
    title: {
        color: Colors.dark.gray600,
        fontSize: Sizing.fontSize['md'],
        fontWeight: '600',
    },
});
