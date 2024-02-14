import { StyleSheet, ScrollView } from 'react-native';
import { View, Text } from '../../components/Themed';
import { useStore } from '../../store';
import TrainingDayItem from '../../components/TrainingDayItem';
import { useEffect, useState } from 'react';
import { TrainingDay, TrainingDayWithExercises } from '../../store/Types';
import { router, useLocalSearchParams } from 'expo-router';
import ButtonPrimary from '../../components/common/ButtonPrimary';
import Colors from '../../constants/Colors';
import Sizing from '../../constants/Sizing';
import { observer } from 'mobx-react';
import Toast from 'react-native-toast-message';

function RoutineScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDay, setSelectedDay] =
        useState<TrainingDayWithExercises | null>();
    const { routine_id } = useLocalSearchParams();
    const {
        selectedRoutine,
        setSelectedRoutineById,
        setCurrentTrainingDay,
        trainingDays,
        currentTrainingDay,
        getTrainingDaysWithExercises,
    } = useStore().RoutineStore;
    const { createSession, currentSession, checkIfSessionInProgress } =
        useStore().SessionStore;

    const getTrainingDaysList = async () => {
        if (selectedRoutine) {
            await getTrainingDaysWithExercises(
                selectedRoutine.routine_id as string
            );
        }
    };

    useEffect(() => {
        setSelectedRoutineById(routine_id as string);
        getTrainingDaysList();
    }, [routine_id]);

    function openModal(trainingDay: TrainingDayWithExercises) {
        setModalVisible(true);
        setSelectedDay(trainingDay);
    }

    function closeModal() {
        setModalVisible(false);
    }

    async function startSession() {
        if (!selectedDay) return;
        if (selectedDay.exercises.length === 0) {
            Toast.show({
                type: 'error',
                text1: 'No exercises',
                text2: 'Please add exercises to start session',
            });
            closeModal();
            return;
        }
        selectedDay.day_id && setCurrentTrainingDay(selectedDay.day_id);

        if (currentTrainingDay?.day_id) {
            const isSessionInProgress = await checkIfSessionInProgress(
                selectedRoutine?.routine_id as string
            );

            if (isSessionInProgress.data) {
                Toast.show({
                    type: 'info',
                    text1: `Session in progress ${isSessionInProgress.data.day_name}`,
                    text2: 'Showing the previously started session.',
                });
                setCurrentTrainingDay(isSessionInProgress.data.day_id);
                router.push(`/session/${isSessionInProgress.data.day_id}`);
            } else {
                const result = await createSession(currentTrainingDay);
                if (result) router.push(`/session/${selectedDay.day_id}`);
                router.push(`/session/${selectedDay.day_id}`);
            }
        }

        closeModal();
    }

    if (!selectedRoutine)
        return (
            <Text style={{ color: 'white' }}>
                There are no selected routines
            </Text>
        );

    return (
        <ScrollView style={styles.container}>
            <View style={styles.trainingDayContainer}>
                <Text style={styles.name}>{selectedRoutine.name}</Text>
                <Text
                    style={{
                        textAlign: 'left',
                        fontSize: Sizing.fontSize['sm'],
                        fontWeight: '600',
                        marginBottom: Sizing.spacing['md'],
                        color: Colors.dark['text'],
                        backgroundColor: Colors.dark['background'],
                    }}
                >
                    {JSON.stringify(currentSession, null, 2)}
                </Text>

                {trainingDays && trainingDays.length > 0 ? (
                    trainingDays.map((item: TrainingDayWithExercises) => {
                        return (
                            <TrainingDayItem
                                key={item.day_id}
                                trainingDay={item}
                                modalVisible={modalVisible}
                                setModalVisible={openModal}
                                modalContent={
                                    <>
                                        <Text style={styles.textStyle}>
                                            Start Session?
                                        </Text>
                                        <View style={styles.buttonsContainer}>
                                            <ButtonPrimary
                                                title='Start'
                                                onButtonPress={() =>
                                                    startSession()
                                                }
                                                width={80}
                                            />
                                            <ButtonPrimary
                                                title='Cancel'
                                                onButtonPress={() =>
                                                    closeModal()
                                                }
                                                width={80}
                                            />
                                        </View>
                                    </>
                                }
                            />
                        );
                    })
                ) : (
                    <Text style={{ color: 'white' }}>
                        There Are No training days
                    </Text>
                )}

                <ButtonPrimary
                    title='Edit routine'
                    onButtonPress={() => router.push('/routine/createRoutine')}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.dark['background'],
        paddingHorizontal: Sizing.spacing['md'],
        paddingVertical: Sizing.spacing['md'],
    },
    name: {
        textAlign: 'center',
        fontSize: Sizing.fontSize['lg'],
        fontWeight: '600',
        marginBottom: Sizing.spacing['md'],
        color: Colors.dark['text'],
        backgroundColor: Colors.dark['background'],
    },
    trainingDayContainer: {
        gap: 20,
        backgroundColor: Colors.dark['background'],
        marginBottom: Sizing.spacing['md'],
    },

    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        width: '100%',
        gap: 20,
    },
    textStyle: {
        color: Colors.dark['gray600'],
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 20,
    },
});

export default observer(RoutineScreen);
