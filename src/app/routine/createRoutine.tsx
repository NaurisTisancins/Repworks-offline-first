import {
    StyleSheet,
    SafeAreaView,
    Dimensions,
    ViewProps,
    ViewStyle,
} from 'react-native';
import { View, Text } from '../../components/Themed';
import CreateRoutineForm from '../../components/createRoutineFlow/CreateRoutineForm';
import AddTrainingDays from '../../components/createRoutineFlow/AddTrainingDays';
import AddExercises from '../../components/createRoutineFlow/AddExercises';
import { FormStep } from '../../components/formStepper/FormStepper';
import React, { useState } from 'react';
import ButtonPrimary from '../../components/common/ButtonPrimary';
import { useStore } from '../../store';
import { useRouter } from 'expo-router';
import Colors from '../../constants/Colors';
import Sizing from '../../constants/Sizing';

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
        done: true,
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
    const {
        RoutineStore: { selectedRoutine },
    } = useStore();
    const router = useRouter();
    const [windowDimensions, setWindowDimensions] = useState({
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    });

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
                        next={nextStep}
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
                        onButtonPress={() =>
                            router.push(
                                `/routine/${selectedRoutine?.routine_id}`
                            )
                        }
                    />
                );
        }
    }

    const isFirstStep = activeStep.value === 1;
    const isLastStep = activeStep.value === steps.length;

    const container: ViewStyle = {
        height: windowDimensions.height,
        backgroundColor: Colors.dark.background[600],
    };

    return (
        <SafeAreaView style={container}>
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
                    <ButtonPrimary
                        width={100}
                        disabled={!activeStep.done}
                        variant='outlined'
                        title='Next'
                        onButtonPress={() => {
                            nextStep();
                        }}
                    />
                ) : (
                    <View style={{ flex: 1 }} />
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    formContainer: {
        backgroundColor: 'transparent',
        paddingHorizontal: Sizing.spacing['md'],
        paddingTop: Sizing.spacing.xxxxl,
    },
    formNavigationButtons: {
        position: 'absolute',
        bottom: 90,
        right: 0,
        left: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 100,
        paddingHorizontal: Sizing.spacing['md'],
        paddingVertical: Sizing.spacing['md'],
        backgroundColor: Colors.dark.background[600],
    },
});

export default CreateRoutineRoutineScreen;
