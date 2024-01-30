import {
    Exercise,
    TrainingDay,
    TrainingDayWithExercises,
} from '../../store/Types';
import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useStore } from '../../store';
import React from 'react';
import ButtonPrimary from '../common/ButtonPrimary';
import Icon from '../common/Icon';
import { useDebounce } from '../../utils/use-debounce';
import MiniModal from '../common/MiniModal';
import ExerciseSearchModalContent from '../ExerciseSearchModalContent';
import ExerciseListItemSelected from '../ExerciseListItemSelected';
import Colors from '../../constants/Colors';
import Sizing from '../../constants/Sizing';
import { toJS } from 'mobx';
import { set } from 'react-hook-form';
import { observer } from 'mobx-react';

type AddExercisesProps = {
    trainingDay: TrainingDayWithExercises;
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
        removeExerciseFromTrainingDay,
    } = useStore();

    async function searchExerciseList() {
        await searchExercises(debouncedInputValue);
    }

    React.useEffect(() => {
        searchExerciseList();
    }, [debouncedInputValue]);

    async function getExercises() {
        if (!trainingDay.day_id) return;
        const exercises = await getExercisesByTrainingDayId(
            trainingDay?.day_id
        );
    }

    React.useEffect(() => {
        getExercises();
    }, []);

    const onSubmitExercise = async (exercise: Exercise) => {
        if (!trainingDay.day_id) {
            console.log('no day id');
            return;
        }
        const exerciseData = await addExerciseToTrainingDay(
            exercise.exercise_id,
            trainingDay.day_id
        );

        if (exerciseData.data) {
            await getExercisesByTrainingDayId(trainingDay.day_id);
        }
    };

    async function onRemoveExerceiseFromDay(linkId: string) {
        await removeExerciseFromTrainingDay(linkId);
        if (!trainingDay.day_id) return;
        await getExercisesByTrainingDayId(trainingDay.day_id);
    }

    return (
        <View style={styles.container}>
            <Pressable
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                }}
                onPress={() => {
                    setExerciseFormVisible(!exerciseFormVisible);
                }}
            >
                <View style={styles.titleChip}>
                    <Text style={styles.title}>{trainingDay.day_name}</Text>
                </View>

                <View style={{}}>
                    {exerciseFormVisible ? (
                        <Icon name='chevron-up' size={18} color='black' />
                    ) : (
                        <Icon name='chevron-down' size={18} color='black' />
                    )}
                </View>
            </Pressable>

            {!isStateLoading(
                'add-exercise-to-training-day' ||
                    'get-exercises-by-training-day-id'
            ) &&
                exerciseFormVisible && (
                    <View style={styles.exercisesContainer}>
                        <ButtonPrimary
                            style={{ marginVertical: Sizing.spacing['lg'] }}
                            title='Add exercise'
                            onButtonPress={() => openModal()}
                        />
                        <View style={{ gap: 20 }}>
                            {trainingDay.exercises &&
                                trainingDay?.exercises.map(
                                    (exercise: Exercise) => (
                                        <ExerciseListItemSelected
                                            key={exercise.link_id}
                                            exercise={{ ...exercise }}
                                            onRemove={onRemoveExerceiseFromDay}
                                            isLoading={isStateLoading(
                                                'remove-exercise-from-training-day' ||
                                                    'get-exercises-by-training-day-id'
                                            )}
                                        />
                                    )
                                )}
                        </View>
                    </View>
                )}
            {isStateLoading(
                'add-exercise-to-training-day' ||
                    'get-exercises-by-training-day-id'
            ) && <ActivityIndicator size='large' color='black' />}
            <MiniModal modalVisible={modalVisible}>
                <ExerciseSearchModalContent
                    closeModal={closeModal}
                    addExercise={onSubmitExercise}
                    exerciseList={toJS(exerciseList)}
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
        justifyContent: 'flex-start',
        width: '100%',
        backgroundColor: Colors.dark['gray200'],
        borderRadius: Sizing.borderRadius['md'],
        paddingHorizontal: Sizing.spacing['md'],
        paddingVertical: Sizing.spacing['md'],
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

    exercisesContainer: {
        width: '100%',
    },
});

export default observer(TrainingDayAddExerciseItem);
