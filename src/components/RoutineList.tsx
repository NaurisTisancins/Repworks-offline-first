import { StyleSheet } from 'react-native';
import { View } from '../components/Themed';
import RoutineView from './RoutineListItem';
import { useStore } from '../store/index';
import { observer } from 'mobx-react';

const RoutineList = () => {
  const { routinesList } = useStore();
  return (
    <View style={styles.container}>
      {routinesList.map((item) => {
        return <RoutineView key={item.id} routine={item} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
});

export default RoutineList;