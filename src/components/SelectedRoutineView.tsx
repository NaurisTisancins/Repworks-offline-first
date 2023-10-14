import { View, Text, StyleSheet } from 'react-native';
import { useStore } from '../store/index';
import { observer } from 'mobx-react';
import SelectedRoutineListItem from './SelectedRoutineListItem';
import ButtonPrimary from './common/ButtonPrimary';

function SelectedRoutineView() {
  const { selectedRoutine } = useStore();

  function editRoutine() {
    console.log('Edit Routine');
  }

  function addRoutine() {
    console.log('Add Routine');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Current Routine</Text>
      {selectedRoutine ? (
        <SelectedRoutineListItem routine={selectedRoutine} />
      ) : (
        <Text style={styles.noRoutines}>You have no active routines</Text>
      )}
      <View style={styles.buttonContainer}>
        {selectedRoutine ? (
          <ButtonPrimary title='Edit routine' onButtonPress={editRoutine} />
        ) : (
          <ButtonPrimary title={'Add routine'} onButtonPress={addRoutine} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 'auto',
    width: '100%',
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
  },
  noRoutines: {
    color: 'white',
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default observer(SelectedRoutineView);
