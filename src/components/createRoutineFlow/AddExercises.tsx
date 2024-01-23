import { View, StyleSheet, ScrollView } from 'react-native';
import { useStore } from '../../store';
import TrainingDayAddExerciseItem from './TrainingDayAddExerciseItem';

const AddExercises = () => {
    const { trainingDays } = useStore();
    return (
        <ScrollView>
            <View style={styles.container}>
                {trainingDays.map((day) => (
                    <TrainingDayAddExerciseItem
                        key={day.day_id}
                        trainingDay={day}
                    />
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        gap: 20,
    },
});

export default AddExercises;
