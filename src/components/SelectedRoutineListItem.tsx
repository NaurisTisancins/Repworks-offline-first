import { Routine } from '../Types';
import { StyleSheet, View, Text } from 'react-native';
import { Link } from 'expo-router';

type RoutineProps = {
  routine: Routine;
};

export default function RoutineView({ routine }: RoutineProps) {
  const numberOfTrainingDays = routine.trainingPlan.length;

  return (
    <Link href='/routine'>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{routine.name}</Text>
          <Text>{numberOfTrainingDays} day split</Text>
        </View>
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: '100%',
    backgroundColor: 'lightgreen',
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
