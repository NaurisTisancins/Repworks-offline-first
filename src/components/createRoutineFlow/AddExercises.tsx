import { StyleSheet, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import { View, Text } from '../../components/Themed';
import { useStore } from '../../store';
import TrainingDayAddExerciseItem from './TrainingDayAddExerciseItem';
import Colors from '../../constants/Colors';
import { useState } from 'react';
import Sizing from '../../constants/Sizing';

const AddExercises = () => {
    const [windowDimensions, setWindowDimensions] = useState({
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    });
    const {
        RoutineStore: { trainingDays },
    } = useStore();
    return (
        <View
            style={{
                height: windowDimensions.height - 210,
                backgroundColor: 'transparent',
            }}
        >
            <ScrollView
                style={{
                    backgroundColor: Colors.dark['background'],
                    height: '100%',
                }}
            >
                <View style={styles.container}>
                    {trainingDays.map((day) => (
                        <TrainingDayAddExerciseItem
                            key={day.day_id}
                            trainingDay={day}
                        />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.dark['background'],
        gap: 20,
    },
});

export default AddExercises;
