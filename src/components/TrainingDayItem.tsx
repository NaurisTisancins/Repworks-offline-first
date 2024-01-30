import Colors from '../constants/Colors';
import Sizing from '../constants/Sizing';
import {
    Exercise,
    TrainingDay,
    TrainingDayWithExercises,
} from '../store/Types';
import MiniModal from '../components/common/MiniModal';
import { Pressable, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { useEffect, useState } from 'react';
import ButtonPrimary from './common/ButtonPrimary';
import { observer } from 'mobx-react';
import { useStore } from '../store';

type WorkoutViewProps = {
    trainingDay: TrainingDayWithExercises;
    modalContent: JSX.Element;
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
};

function TrainingDayItem({
    trainingDay,
    modalContent,
    modalVisible,
    setModalVisible,
}: WorkoutViewProps) {
    const { getExercisesByTrainingDayId } = useStore();

    async function getExercises() {
        if (!trainingDay.exercises && trainingDay.day_id) {
            await getExercisesByTrainingDayId(trainingDay.day_id);
        }
    }

    useEffect(() => {
        getExercises();
    }, []);

    return (
        <>
            <Pressable
                style={styles.container}
                onLongPress={() => setModalVisible(true)}
            >
                <View style={styles.headerContainer}>
                    <View style={styles.titleChip}>
                        <Text style={styles.title}>{trainingDay.day_name}</Text>
                    </View>
                    <Text style={styles.exerciseCount}>{`${
                        trainingDay.exercises?.length ?? 0
                    } exercises`}</Text>
                </View>

                <View style={styles.exercisesContainer}>
                    {trainingDay.exercises &&
                        trainingDay.exercises.map((exercise: Exercise) => {
                            return (
                                <Text
                                    style={styles.exerciseName}
                                    key={exercise.link_id}
                                >
                                    {exercise.exercise_name}
                                </Text>
                            );
                        })}
                </View>
            </Pressable>
            <MiniModal modalVisible={modalVisible}>
                {modalContent && modalContent}
            </MiniModal>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: Colors.dark['gray200'],
        borderRadius: Sizing.borderRadius['md'],
        paddingHorizontal: Sizing.spacing['md'],
        paddingVertical: Sizing.spacing['md'],
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: 'transparent',
        paddingBottom: Sizing.spacing['md'],
    },
    titleChip: {
        backgroundColor: Colors.dark.primary,
        ...Colors.dark.shadowStyle,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizing.borderRadius['md'],
        paddingHorizontal: Sizing.spacing['md'],
        paddingVertical: Sizing.spacing['sm'],
        opacity: 0.7,
    },
    title: {
        fontSize: Sizing.fontSize['lg'],
        fontWeight: '600',
        alignContent: 'center',
        color: Colors.dark.text,
    },
    exerciseCount: {
        fontSize: Sizing.fontSize['md'],
        textAlign: 'left',
        fontWeight: '600',
        paddingBottom: Sizing.spacing['md'],
        color: Colors.dark.accent2,
    },
    exercisesContainer: {
        width: '100%',
        backgroundColor: 'transparent',
    },
    exerciseName: {
        paddingBottom: Sizing.spacing['md'],
        fontSize: 16,
        fontWeight: '600',
    },

    textStyle: {
        color: Colors.dark['gray600'],
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 20,
    },
});

export default observer(TrainingDayItem);
