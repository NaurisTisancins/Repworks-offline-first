import { View, Text, StyleSheet, TextInput } from 'react-native';
import ButtonPrimary from './common/ButtonPrimary';
import { Formik, FormikErrors, FieldArray } from 'formik';
import { Exercise, RepsAndSets } from '../Types';
import { useState } from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import uuid from 'react-native-uuid';

type FormFieldProps = {
  label: string;
  value: string;
  fieldName: string;
  onChangeText: ((text: string) => void) | undefined;
};

const FormField = ({
  label,
  value,
  fieldName,
  onChangeText,
}: FormFieldProps) => {
  return (
    <View style={styles.inputFieldContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        data-set={fieldName}
        style={styles.inputField}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
};

type SessionFormProps = {
  exercise: Exercise;
};

function SessionForm({ exercise }: SessionFormProps) {
  const [setArray, setSetArray] = useState([
    {
      id: uuid.v4().toString(),
      set: '0',
      weight: '0',
      reps: '0',
    },
  ]);

  function setFieldArrayValue(index, value, fieldName: 'weight' | 'reps') {
    const findObject = { ...setArray[index] };
    findObject[`${fieldName}`] = value;
    const copyArr = [...setArray];
    copyArr[index] = findObject;
    setSetArray(copyArr);
    console.log(copyArr);
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
    console.log(setArray.length);
  }

  // const renderSetFields = (
  //   values: RepsAndSets[],
  //   handleChange: {
  //     (e: React.ChangeEvent<any>): void;
  //     <T = string | React.ChangeEvent<any>>(
  //       field: T
  //     ): T extends React.ChangeEvent<any>
  //       ? void
  //       : (e: string | React.ChangeEvent<any>) => void;
  //   }
  // ) => {
  //   return values.map((sesh, index) => (
  //     <View key={sesh.id} style={styles.inputContainer}>
  //       <FormField
  //         label='Weight'
  //         onChangeText={handleChange(`values.[${index}].weight`)}
  //         value={values[index].weight}
  //       />
  //       <FormField
  //         label='Reps'
  //         onChangeText={handleChange(`values.[${index}].reps`)}
  //         value={values[index].reps}
  //       />
  //     </View>
  //   ));
  // };

  return (
    <View style={styles.exerciseContainer}>
      <Text style={styles.exerciseTitle}>{exercise.name}</Text>
      <Formik
        initialValues={setArray}
        enableReinitialize
        onSubmit={(values) => {
          onAddSet();
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          setFieldValue,
        }) => (
          <View>
            {values.length > 0 &&
              values.map((sesh, index) => (
                <View key={sesh.id} style={styles.inputContainer}>
                  <FormField
                    fieldName={`values[$index].weight`}
                    label='Weight'
                    onChangeText={(e) => setFieldArrayValue(index, e, 'weight')}
                    value={values[index].weight}
                  />
                  <FormField
                    fieldName={`values[$index].reps`}
                    label='Reps'
                    onChangeText={(e) => setFieldArrayValue(index, e, 'reps')}
                    value={values[index].reps}
                  />
                </View>
              ))}
            <View style={styles.buttonContainer}>
              <ButtonPrimary title='Add set' onButtonPress={handleSubmit} />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  exerciseContainer: {
    width: '100%',
    backgroundColor: 'lightgray',
    borderRadius: 20,
    margin: 10,
  },
  exerciseTitle: {
    color: 'black',
    fontSize: 20,
    fontWeight: '600',
    margin: 10,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 10,
    gap: 10,
  },
  inputFieldContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',

    marginBottom: 10,
  },
  inputLabel: {
    width: '100%',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 3,
  },
  inputField: {
    height: 40,
    width: '100%',
    borderColor: 'darkgray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    fontSize: 16,
    backgroundColor: 'whitesmoke',
  },
  buttonContainer: { margin: 10 },
});

export default SessionForm;
