import { Exercise, TrainingDay } from '../store/Types';
import { StyleSheet, Text, View } from 'react-native';

type WorkoutViewProps = {
    trainingDay: TrainingDay;
};

function TrainingDayItem({ trainingDay }: WorkoutViewProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{trainingDay.day_name}</Text>
            <View style={styles.separator} />
            <View style={styles.exercisesContainer}>
                {/* {trainingDay.exercises.map((exercise: Exercise) => {
                    return (
                        <Text style={styles.exerciseName} key={exercise.id}>
                            {exercise.name}
                        </Text>
                    );
                })} */}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: 'lightgray',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    title: {
        fontSize: 20,
        width: '100%',
        textAlign: 'left',
        fontWeight: '600',
        paddingBottom: 15,
    },
    separator: {
        backgroundColor: 'black',
        height: 0.5,
        width: '100%',
        marginBottom: 10,
        marginHorizontal: 10,
    },
    exercisesContainer: {
        width: '100%',
        backgroundColor: 'lightgray',
    },
    exerciseName: {
        paddingBottom: 10,
        fontSize: 16,
        fontWeight: '600',
    },
});

export default TrainingDayItem;
