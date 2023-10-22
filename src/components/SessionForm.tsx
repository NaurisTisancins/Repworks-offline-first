import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

import uuid from 'react-native-uuid';

import { Exercise, RepsAndSets } from '../Types';
import ButtonPrimary from './common/ButtonPrimary';
import { useStore } from '../store';
import FormFieldArray from './common/FormFieldArray';

type SessionFormProps = {
  exercise: Exercise;
};

function SessionForm({ exercise }: SessionFormProps) {
  const { setExercisePerformance, getCurrentSession } = useStore();
  const [setArray, setSetArray] = useState([
    {
      id: uuid.v4().toString(),
      set: '0',
      weight: '0',
      reps: '0',
    },
  ]);

  function setFieldArrayValue(
    index: number,
    value: string,
    fieldName: 'weight' | 'reps'
  ) {
    const findObject = { ...setArray[index] };

    findObject[`${fieldName}`] = value;
    let copyArr = [...setArray];
    copyArr[index] = findObject;
    setSetArray(copyArr);
  }

  function onAddSet() {
    setSetArray((prev) => [
      ...prev,
      {
        id: uuid.v4().toString(),
        set: String(setArray.length + 1),
        weight: '0',
        reps: '0',
      },
    ]);
  }

  function onRemoveSet(setId: string) {
    setSetArray((prev) => {
      return prev.filter((currentSets) => currentSets.id !== setId);
    });
  }

  function saveValues(values: RepsAndSets[]) {
    setExercisePerformance(exercise.id, values);
  }

  return (
    <View style={styles.exerciseContainer}>
      <Text style={styles.exerciseTitle}>{exercise.name}</Text>
      <Formik
        initialValues={setArray}
        enableReinitialize
        onSubmit={(values) => {
          saveValues(values);
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          setFieldValue,
        }) => (
          <GestureHandlerRootView>
            <View>
              <View>
                {values.length > 0 &&
                  values.map((set, index) => (
                    <FormFieldArray
                      key={set.id}
                      index={index}
                      set={set}
                      values={values}
                      setFieldArrayValue={setFieldArrayValue}
                      onRemoveSet={() => onRemoveSet(set.id)}
                    />
                  ))}
                <View style={styles.buttonContainer}>
                  <ButtonPrimary
                    width={100}
                    title='Save'
                    onButtonPress={handleSubmit}
                  />
                  <ButtonPrimary
                    width={150}
                    title='Add set'
                    onButtonPress={onAddSet}
                  />
                </View>
              </View>
            </View>
          </GestureHandlerRootView>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  exerciseContainer: {
    width: '100%',
    // backgroundColor: 'lightgray',
    borderRadius: 20,
    margin: 10,
  },
  exerciseTitle: {
    color: 'darkgray',
    fontSize: 20,
    fontWeight: '600',
    margin: 10,
  },

  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    width: '100%',
    padding: 10,
  },
});

export default SessionForm;
