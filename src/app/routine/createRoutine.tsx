import { View, StyleSheet, SafeAreaView, Text } from 'react-native';
import CreateRoutineForm from '../../components/createRoutineFlow/CreateRoutineForm';
import AddTrainingDays from '../../components/createRoutineFlow/AddTrainingDays';
import AddExercises from '../../components/createRoutineFlow/AddExercises';
import FormStepper, {
    FormStep,
} from '../../components/formStepper/FormStepper';
import React from 'react';
import ButtonPrimary from '../../components/common/ButtonPrimary';
import { useStore } from '../../store';

const formSteps: FormStep[] = [
    {
        title: 'Step 1',
        description: 'Create Routine',
        value: 1,
        done: false,
    },
    {
        title: 'Step 2',
        description: 'Add Training Days',
        value: 2,
        done: false,
    },
    {
        title: 'Step 3',
        description: 'Add Exercises',
        value: 3,
        done: false,
    },
    {
        title: 'Step 4',
        description: 'Confirm',
        value: 4,
        done: false,
    },
];

const CreateRoutineRoutineScreen = () => {
    const [steps, setSteps] = React.useState<FormStep[]>(formSteps);
    const [activeStep, setActiveStep] = React.useState<FormStep>(steps[0]);
    const { selectedRoutine, deleteRoutineById } = useStore();

    function setActiveStepDone(step: FormStep) {
        const updatedSteps = steps.map((step) => {
            if (step.value === activeStep.value) {
                return { ...step, done: true };
            }
            return step;
        });
        setSteps(updatedSteps);
        setActiveStep(
            updatedSteps.find((step) => step.value === activeStep.value)!
        );
    }

    function setActive(step: FormStep) {
        setActiveStep(step);
    }

    function nextStep() {
        if (activeStep.value === steps.length) return;
        const next = steps.find((step) => step.value === activeStep.value + 1);
        if (next) {
            setActiveStep(next);
        }
    }

    function prevStep() {
        if (activeStep.value === 1) return;
        const prev = steps.find((step) => step.value === activeStep.value - 1);
        if (prev) {
            setActiveStep(prev);
        }
    }

    function switchFormView() {
        switch (activeStep.value) {
            case 1:
                return (
                    <CreateRoutineForm
                        activeStep={activeStep}
                        setActiveStepDone={setActiveStepDone}
                    />
                );
            case 2:
                return (
                    <AddTrainingDays
                        activeStep={activeStep}
                        setActiveStepDone={setActiveStepDone}
                    />
                );
            case 3:
                return <AddExercises />;
            case 4:
                return (
                    <ButtonPrimary
                        title='Confirm'
                        onButtonPress={() => console.log('confirm')}
                    />
                );
        }
    }

    const isFirstStep = activeStep.value === 1;
    const isLastStep = activeStep.value === steps.length;

    return (
        <SafeAreaView style={styles.container}>
            <FormStepper
                steps={steps}
                setActiveStep={setActive}
                activeStep={activeStep}
            />

            <View style={styles.formContainer}>{switchFormView()}</View>

            <View style={styles.formNavigationButtons}>
                {!isFirstStep ? (
                    <ButtonPrimary
                        width={100}
                        variant='outlined'
                        title='Back'
                        onButtonPress={() => {
                            prevStep();
                        }}
                    />
                ) : (
                    <View style={{ flex: 1 }} />
                )}
                {!isLastStep ? (
                    <>
                        <ButtonPrimary
                            width={100}
                            disabled={!activeStep.done}
                            variant='outlined'
                            title='Next'
                            onButtonPress={() => {
                                nextStep();
                            }}
                        />
                    </>
                ) : (
                    <View style={{ flex: 1 }} />
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: 'black',
        marginHorizontal: 14,
        marginVertical: 30,
        gap: 10,
    },
    formContainer: {
        backgroundColor: 'black',
        marginHorizontal: 14,
        marginVertical: 10,
    },
    formNavigationButtons: {
        position: 'absolute',
        bottom: 100,
        right: 0,
        left: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 'auto',
        marginHorizontal: 14,
        marginVertical: 10,
    },
});

export default CreateRoutineRoutineScreen;
