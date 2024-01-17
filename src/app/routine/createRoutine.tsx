import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import CreateRoutineForm from '../../components/createRoutineFlow/CreateRoutineForm';
import FormStepper, {
    FormStep,
} from '../../components/formStepper/FormStepper';

const steps: FormStep = [
    {
        title: 'Step 1',
        description: 'Create Routine',
    },
    {
        title: 'Step 2',
        description: 'Create Training Days',
    },
    {
        title: 'Step 3',
        description: 'Confirm',
    },
];
const CreateRoutineRoutineScreen = () => {
    return (
        <View style={styles.container}>
            <FormStepper steps={steps} />
            <CreateRoutineForm />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: 'black',
        marginHorizontal: 14,
        marginVertical: 30,
    },
    name: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 10,
        color: 'white',
        backgroundColor: 'black',
    },
});

export default CreateRoutineRoutineScreen;
