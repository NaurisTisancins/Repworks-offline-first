import { StyleSheet } from 'react-native';

import { Text, View } from '../../components/Themed';
import { useStore } from '../../store';

export default function TabTwoScreen() {
  const { selectedRoutine } = useStore();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {selectedRoutine
          ? selectedRoutine.name
          : 'There are no Routines Selected'}
      </Text>
      <View>
        {selectedRoutine?.trainingPlan.map((trainingDay) => {
          return (
            <View>
              <Text>{trainingDay.name}</Text>
              {trainingDay.history.map((session) => {
                return session.performedExercises.map((item, idx) => {
                  return (
                    <View key={idx}>
                      <Text>{item.exercise.name}</Text>
                    </View>
                  );
                });
              })}
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
