import { StyleSheet, ScrollView, Pressable, Text, View } from 'react-native';
import { useStore } from '../../store';
import TrainingPlanItem from '../../components/TrainingPlanItem';
import MiniModal from '../../components/common/MiniModal';
import { useEffect, useState } from 'react';
import { Routine, TrainingDay } from '../../store/Types';
import { router, useLocalSearchParams } from 'expo-router';
import ButtonPrimary from '../../components/common/ButtonPrimary';

function RoutineScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDay, setSelectedDay] = useState<TrainingDay | null>();
    const { routine_id } = useLocalSearchParams();
    const {
        // activeRoutine,
        routinesList,
        setCurrentTrainingDay,
        createSession,
        trainingDays,
        getTrainingDays,
    } = useStore();

    const [selectedRoutine, setSelectedRoutine] = useState<Routine | undefined>(
        routinesList.find((routine) => routine.routine_id === routine_id)
    );

    const getTrainingDaysList = async () => {
        if (!selectedRoutine) {
            return;
        }
        await getTrainingDays(routine_id as string);
    };

    useEffect(() => {
        if (!routine_id) return;
        setSelectedRoutine(
            routinesList.find((routine) => routine.routine_id === routine_id)
        );
        getTrainingDaysList();
    }, [routine_id]);

    function openModal(trainingDay: TrainingDay) {
        setModalVisible(true);
        setSelectedDay(trainingDay);
    }

    function closeModal() {
        setModalVisible(false);
    }

    function startSession() {
        if (!selectedDay) return;
        setCurrentTrainingDay(selectedDay.day_id);
        createSession();
        router.push('/routine/session');
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
            {/* <Text style={{ color: 'white' }}>
                {JSON.stringify(selectedRoutine, null, 2)}
            </Text>
            <Text style={{ color: 'white' }}>
                {JSON.stringify(routine_id, null, 2)}
            </Text> */}
            <MiniModal
                modalVisible={modalVisible}
                closeModal={() => closeModal()}
                confirmAction={() => startSession()}
            />
            <View style={{ backgroundColor: 'black' }}>
                <Text style={styles.name}>{selectedRoutine.name}</Text>
                <View style={styles.trainingDayContainer}>
                    {trainingDays && trainingDays.length > 0 ? (
                        trainingDays.map((item: TrainingDay) => {
                            return (
                                <Pressable
                                    onPress={() => openModal(item)}
                                    key={item.day_id}
                                >
                                    <TrainingPlanItem trainingDay={item} />
                                </Pressable>
                            );
                        })
                    ) : (
                        <Text style={{ color: 'white' }}>
                            There Are No training days
                        </Text>
                    )}
                </View>
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
        backgroundColor: 'black',
        marginHorizontal: 14,
        marginVertical: 30,
    },
    name: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 10,
        color: 'white',
        backgroundColor: 'black',
    },
    trainingDayContainer: {
        gap: 20,
        backgroundColor: 'black',
        marginBottom: 20,
    },
});

export default RoutineScreen;
