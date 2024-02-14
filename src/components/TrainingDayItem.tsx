import Colors from '../constants/Colors';
import Sizing from '../constants/Sizing';
import { Exercise, TrainingDayWithExercises } from '../store/Types';
import MiniModal from '../components/common/MiniModal';
import { Pressable, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { observer } from 'mobx-react';

type WorkoutViewProps = {
    trainingDay: TrainingDayWithExercises;
    modalContent: JSX.Element;
    modalVisible: boolean;
    setModalVisible: (trianingDay: TrainingDayWithExercises) => void;
};

function TrainingDayItem({
    trainingDay,
    modalContent,
    modalVisible,
    setModalVisible,
}: Readonly<WorkoutViewProps>) {
    return (
        <>
            <Pressable
                style={styles.container}
                onLongPress={() =>
                    trainingDay.day_id && setModalVisible(trainingDay)
                }
            >
                <View style={styles.headerContainer}>
                    <View style={styles.titleChip}>
                        <Text style={styles.title}>{trainingDay.day_name}</Text>
                    </View>
                    <Text style={styles.exerciseCount}>{`${
                        trainingDay.exercises?.length ?? 0
                    } exercises`}</Text>
                </View>
                {/* <Text>{JSON.stringify(trainingDay, null, 2)}</Text> */}
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
        paddingVertical: Sizing.spacing['sm'],
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
        backgroundColor: Colors.dark.gray600,
        ...Colors.dark.shadowStyle,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizing.borderRadius['sm'],
        paddingHorizontal: Sizing.spacing['sm'],
        paddingVertical: Sizing.spacing['sm'],
        textAlign: 'baseline',
        opacity: 0.7,
    },
    title: {
        fontSize: Sizing.fontSize['md'],
        fontWeight: '600',
        alignContent: 'center',
        color: Colors.dark.text,
    },
    exerciseCount: {
        fontSize: Sizing.fontSize['md'],
        fontWeight: '600',
        paddingVertical: Sizing.spacing['sm'],
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
