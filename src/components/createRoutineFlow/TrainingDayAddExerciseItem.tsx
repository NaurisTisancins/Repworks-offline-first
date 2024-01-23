import { Exercise, TrainingDay } from '../../store/Types';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useStore } from '../../store';
import React from 'react';
import ButtonPrimary from '../common/ButtonPrimary';
import Icon from '../common/Icon';
import { useDebounce } from '../../utils/use-debounce';
import MiniModal from '../common/MiniModal';
import ExerciseSearchModalContent from '../ExerciseSearchModalContent';
import ExerciseListItem from '../ExerciseListItem';

type AddExercisesProps = {
    trainingDay: TrainingDay;
};

function TrainingDayAddExerciseItem({ trainingDay }: AddExercisesProps) {
    const [modalVisible, setModalVisible] = React.useState(false);
    function openModal() {
        setModalVisible(true);
    }

    function closeModal() {
        setModalVisible(false);
    }
    const [inputValue, setInputValue] = React.useState<string>('');
    const debouncedInputValue = useDebounce(inputValue, 500);
    const [exerciseFormVisible, setExerciseFormVisible] = React.useState(false);

    const {
        isStateLoading,
        searchExercises,
        exerciseList,
        addExerciseToTrainingDay,
        getExercisesByTrainingDayId,
    } = useStore();

    async function searchExerciseList() {
        await searchExercises(debouncedInputValue);
    }

    React.useEffect(() => {
        searchExerciseList();
    }, [debouncedInputValue]);

    React.useEffect(() => {}, []);

    const onSubmitExercise = async (exercise: Exercise) => {
        if (!trainingDay.day_id) {
            console.log('no day id');
            return;
        }
        const exerciseData = await addExerciseToTrainingDay(
            exercise.exercise_id,
            trainingDay.day_id
        );

        console.log(exerciseData.data);

        if (exerciseData.data) {
            let exercises = await getExercisesByTrainingDayId(
                trainingDay.day_id
            );

            console.log(exercises);
        }
    };

    return (
        <View style={styles.container}>
            <Pressable
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    marginBottom: 10,
                }}
                onPress={() => {
                    setExerciseFormVisible(!exerciseFormVisible);
                }}
            >
                <Text style={styles.title}>{trainingDay.day_name}</Text>
                <Text style={styles.title}>{trainingDay.day_id}</Text>
                <View style={{}}>
                    {exerciseFormVisible ? (
                        <Icon name='chevron-up' size={18} color='black' />
                    ) : (
                        <Icon name='chevron-down' size={18} color='black' />
                    )}
                </View>
            </Pressable>
            <View style={styles.separator} />
            {exerciseFormVisible && (
                <View style={styles.exercisesContainer}>
                    <ButtonPrimary
                        style={{ marginBottom: 10 }}
                        title='Add exercise'
                        onButtonPress={() => openModal()}
                    />
                    {/* {exercises.map((exercise) => (
                        <ExerciseListItem exercise={exercise} />
                    ))} */}
                </View>
            )}
            <MiniModal modalVisible={modalVisible}>
                <ExerciseSearchModalContent
                    closeModal={closeModal}
                    addExercise={onSubmitExercise}
                    exerciseList={exerciseList}
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    isLoading={isStateLoading('searching-exercises')}
                />
            </MiniModal>
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
        // textAlign: 'left',
        fontWeight: '600',
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
        height: 50,
        fontSize: 16,
        fontWeight: '600',
    },
});

export default TrainingDayAddExerciseItem;
