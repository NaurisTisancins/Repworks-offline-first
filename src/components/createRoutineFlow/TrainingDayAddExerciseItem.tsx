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
import Button from '../common/Button';
import Icon from '../common/Icon';
import { useDebounce } from '../../utils/use-debounce';
import MiniModal from '../common/MiniModal';
import ExerciseSearchModalContent from '../ExerciseSearchModalContent';
import ExerciseListItemSelected from '../ExerciseListItemSelected';
import Colors, { Shadows } from '../../constants/Colors';
import Sizing from '../../constants/Sizing';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';

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
        if (ExerciseListItemSelected.length === 0) getExercises();
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
            <View
                style={{
                    gap: Sizing.spacing['xs'],
                    backgroundColor: 'transparent',
                }}
            >
                <View style={styles.headerContainer}>
                    <View style={styles.titleChip}>
                        <Text style={styles.title}>{trainingDay.day_name}</Text>
                    </View>
                    <View style={styles.exerciseCountChip}>
                        <Text style={styles.exerciseCount}>{`${
                            trainingDay.exercises?.length ?? 0
                        } exercises`}</Text>
                    </View>
                </View>

                <Button
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
                    if (exerciseList.length === 0) {
                        console.log('no exercises');
                        getExercises();
                    }
                    setExerciseFormVisible(!exerciseFormVisible);
                }}
            ></Pressable>

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
        backgroundColor: Colors.dark.grayCool[200],
        borderRadius: Sizing.borderRadius['md'],
        paddingHorizontal: Sizing.spacing['md'],
        paddingVertical: Sizing.spacing['lg'],
        height: 'auto',
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: 'transparent',
        paddingBottom: Sizing.spacing['md'],
    },
    exerciseCountChip: {
        borderRadius: Sizing.borderRadius['sm'],
        backgroundColor: Colors.dark.green[200],
        paddingHorizontal: Sizing.spacing['sm'],
    },
    exerciseCount: {
        fontSize: Sizing.fontSize['sm'],
        fontWeight: '600',
        paddingVertical: Sizing.spacing['sm'],
        color: Colors.dark.green[800],
    },
    titleChip: {
        backgroundColor: Colors.dark.grayWarm[300],
        ...Shadows.dark.elevation2,
        alignSelf: 'flex-start',
        justifyContent: 'center',
        borderRadius: Sizing.borderRadius['sm'],
        paddingHorizontal: Sizing.spacing['md'],
        paddingVertical: Sizing.spacing['sm'],
        opacity: 0.7,
    },
    title: {
        fontSize: Sizing.fontSize['md'],
        fontWeight: '600',
        alignContent: 'center',
        color: Colors.dark.grayWarm[900],
    },

    exercisesContainer: {
        width: '100%',
        gap: Sizing.spacing['md'],
    },
});

export default observer(TrainingDayAddExerciseItem);
