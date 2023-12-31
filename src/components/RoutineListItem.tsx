import { Routine } from '../Types';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useStore } from '../store/index';

type RoutineProps = {
  routine: Routine;
};

export default function RoutineListItem({ routine }: RoutineProps) {
  const { setSelectedRoutine } = useStore();
  const numberOfTrainingDays = routine.trainingPlan.length;

  function onSelect(): void {
    setSelectedRoutine(routine.id);
  }

  return (
    <Pressable onPress={onSelect} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{routine.name}</Text>
        <Text>{numberOfTrainingDays} day split</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: '100%',
    backgroundColor: 'lightgray',
    borderRadius: 20,
    padding: 15,
  },

  header: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
});
