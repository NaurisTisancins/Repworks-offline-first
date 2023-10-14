import { View, StyleSheet, ScrollView } from 'react-native';
import { useStore } from '../../store';

import { RepsAndSets } from '../../Types';
import ButtonPrimary from '../../components/common/ButtonPrimary';
import SessionForm from '../../components/SessionForm';

type InitialValuesType = {
  values: RepsAndSets[];
};

function SessionScreen() {
  const { currentSession } = useStore();

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        {currentSession?.exercises.map((item) => {
          return <SessionForm key={item.id} exercise={item} />;
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    margin: 20,
  },
  scrollView: {
    // height: '20%',
    width: '100%',
    alignSelf: 'center',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',

    paddingBottom: 50,
  },
});

export default SessionScreen;
