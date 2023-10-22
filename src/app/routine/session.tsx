import { View, StyleSheet, ScrollView } from 'react-native';
import { useStore } from '../../store';
import { router } from 'expo-router';

import ButtonPrimary from '../../components/common/ButtonPrimary';
import SessionForm from '../../components/SessionForm';

function SessionScreen() {
  const { currentTrainingDay, saveSession } = useStore();

  function saveSessionToStore() {
    saveSession();
    router.replace('/');
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        {currentTrainingDay?.exercises.map((item) => {
          return <SessionForm key={item.id} exercise={item} />;
        })}
        <View style={{ marginTop: 20 }} />
        <ButtonPrimary
          title='Save session'
          width='100%'
          onButtonPress={saveSessionToStore}
        />
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
