import { StyleSheet, ScrollView, Pressable } from 'react-native';
import { Text, View } from '../../components/Themed';
import { useStore } from '../../store';
import TrainingPlanItem from '../../components/TrainingPlanItem';
import MiniModal from '../../components/common/MiniModal';
import { useState } from 'react';
import { TrainingDay } from '../../Types';
import { router } from 'expo-router';

function RoutineScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState<TrainingDay | null>();
  const { selectedRoutine, setCurrentSession } = useStore();

  function openModal(trainingDay: TrainingDay) {
    setModalVisible(true);
    setSelectedDay(trainingDay);
  }

  function closeModal() {
    setModalVisible(false);
  }

  function startSession() {
    if (!selectedDay) return;
    setCurrentSession(selectedDay.id);
    router.push('/routine/session');
    closeModal();
  }

  if (!selectedRoutine)
    return (
      <Text style={{ color: 'wite' }}>There are no selected routines</Text>
    );

  return (
    <ScrollView style={styles.container}>
      <MiniModal
        modalVisible={modalVisible}
        closeModal={() => closeModal()}
        confirmAction={() => startSession()}
      />
      <View>
        <Text style={styles.name}>{selectedRoutine.name}</Text>
        <View style={styles.trainingDayContainer}>
          {selectedRoutine.trainingPlan.map((item) => {
            return (
              <Pressable onPress={() => openModal(item)} key={item.id}>
                <TrainingPlanItem trainingDay={item} />
              </Pressable>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 14,
    marginVertical: 30,
  },
  name: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
  },
  trainingDayContainer: {
    gap: 20,
  },
});

export default RoutineScreen;
