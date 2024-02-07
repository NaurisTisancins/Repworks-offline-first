import { Exercise, TrainingDayWithExercises } from '../../store/Types';
import {
    ActivityIndicator,
    Pressable,
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
import { observer } from 'mobx-react';
import { SafeAreaView } from 'react-native-safe-area-context';

type AddExercisesProps = {
    trainingDay: TrainingDayWithExercises;
};

function TrainingDayAddExerciseItem({
    trainingDay,
}: Readonly<AddExercisesProps>) {
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
        RoutineStore: {
            isStateLoading,
            searchExercises,
            exerciseList,
            addExerciseToTrainingDay,
            getExercisesByTrainingDayId,
            removeExerciseFromTrainingDay,
        },
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
            <View>
                <View
                    style={{
                        gap: Sizing.spacing['md'],
                        backgroundColor: 'transparent',
                    }}
                >
                    <View style={styles.titleChip}>
                        <Text style={styles.title}>{trainingDay.day_name}</Text>
                    </View>

                    <ButtonPrimary
                        title='Add exercise'
                        onButtonPress={() => openModal()}
                    />
                </View>

                <Pressable
                    style={{
                        paddingTop: Sizing.spacing['md'],
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onPress={() => {
                        setExerciseFormVisible(!exerciseFormVisible);
                    }}
                >
                    {exerciseFormVisible ? (
                        <Icon name='chevron-up' size={18} color='black' />
                    ) : (
                        <Icon name='chevron-down' size={18} color='black' />
                    )}
                </Pressable>
            </View>

            {exerciseFormVisible && (
                <View style={styles.exercisesContainer}>
                    {trainingDay.exercises &&
                        trainingDay?.exercises.map((exercise: Exercise) => (
                            <ExerciseListItemSelected
                                key={exercise.link_id}
                                exercise={{ ...exercise }}
                                onRemove={onRemoveExerceiseFromDay}
                            />
                        ))}
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
        backgroundColor: Colors.dark['gray200'],
        borderRadius: Sizing.borderRadius['md'],
        paddingHorizontal: Sizing.spacing['md'],
        paddingVertical: Sizing.spacing['lg'],
        height: 'auto',
    },
    titleChip: {
        backgroundColor: Colors.dark.gray600,
        ...Colors.dark.shadowStyle,
        alignSelf: 'flex-start',
        justifyContent: 'center',
        borderRadius: Sizing.borderRadius['sm'],
        paddingHorizontal: Sizing.spacing['sm'],
        paddingVertical: Sizing.spacing['sm'],

        opacity: 0.7,
    },
    title: {
        fontSize: Sizing.fontSize['md'],
        fontWeight: '600',
        alignContent: 'center',
        color: Colors.dark.text,
    },

    exercisesContainer: {
        width: '100%',
        gap: 20,
        paddingTop: Sizing.spacing['md'],
    },
});

export default observer(TrainingDayAddExerciseItem);
