import { ActivityIndicator, Pressable, StyleSheet } from 'react-native';
import { View, Text } from '../../components/Themed';
import { TextInput } from '../common/TextInput';
import Button from '../common/Button';
import {
    FieldValues,
    FormProvider,
    SubmitErrorHandler,
    SubmitHandler,
    useForm,
} from 'react-hook-form';
import { useStore } from '../../store';
import { FormStep } from '../formStepper/FormStepper';
import React from 'react';
import Colors, { Shadows } from '../../constants/Colors';
import Sizing from '../../constants/Sizing';

export interface FormValues extends FieldValues {
    name: string;
    description: string;
    isActive: boolean;
}

type CreateRoutineFormProps = {
    activeStep: FormStep;
    setActiveStepDone: (step: FormStep) => void;
    next: () => void;
};

const CreateRoutineForm = ({
    setActiveStepDone,
    activeStep,
    next,
}: CreateRoutineFormProps) => {
    const [error, setError] = React.useState<boolean>(false);

    const onError: SubmitErrorHandler<FormValues> = (errors, e) => {
        return console.log({ errors });
    };
    const {
        RoutineStore: {
            selectedRoutine,
            createRoutine,
            getTrainingDaysWithExercises,
            updateRoutine,
            getRoutines,
            isStateLoading,
        },
    } = useStore();

    const { ...methods } = useForm<FormValues>({
        defaultValues: {
            name: selectedRoutine?.name ?? '',
            description: selectedRoutine?.description ?? '',
            isActive: selectedRoutine?.is_active ?? false,
        },
        mode: 'onChange',
    });

    React.useEffect(() => {
        if (selectedRoutine !== null) {
            setActiveStepDone(activeStep);
        }
    }, []);

    const onSubmitRoutine: SubmitHandler<FormValues> = async (
        data: FormValues
    ) => {
        const routineData = {
            name: data.name,
            description: data.description,
            is_active: data.isActive,
        };

        if (selectedRoutine?.routine_id) {
            // Update Routine
            const result = await updateRoutine({
                ...routineData,
                routine_id: selectedRoutine?.routine_id,
            });
            if (result) {
                setActiveStepDone(activeStep);
                getRoutines();
                getTrainingDaysWithExercises(
                    selectedRoutine?.routine_id as string
                );
                next();
            }
        } else {
            const result = await createRoutine({
                ...routineData,
            });
            if (result) {
                setActiveStepDone(activeStep);
                getRoutines();
                getTrainingDaysWithExercises(
                    selectedRoutine?.routine_id as string
                );
                next();
            }
        }
    };

    return (
        <View style={styles.container}>
            <FormProvider {...methods}>
                {error ? (
                    <View>
                        <Text style={{ color: 'red' }}>
                            There was a problem with loading the form. Please
                            try again later.
                        </Text>
                    </View>
                ) : (
                    <>
                        <TextInput
                            name='name'
                            label='Routine name'
                            labelColor={Colors.dark.grayCool[200]}
                            placeholder='Push Pull Legs'
                            keyboardType='default'
                            rules={{
                                required: 'Routine name is Required!',
                                maxLength: 25,
                                minLength: 2,
                            }}
                            setFormError={setError}
                        />
                        <TextInput
                            name='description'
                            label='Description'
                            labelColor={Colors.dark.grayCool[200]}
                            placeholder='Describe your routine'
                            rules={{ maxLength: 1000, minLength: 10 }}
                            multiline
                            setFormError={setError}
                        />

                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginBottom: Sizing.spacing['md'],
                                borderRadius: Sizing.borderRadius['sm'],
                                backgroundColor: Colors.dark.grayWarm[100],
                                padding: 2,
                                ...Shadows.dark.elevation2,
                            }}
                        >
                            <Pressable
                                onPress={() => {
                                    methods.setValue('isActive', true);
                                    console.log(methods.getValues('isActive'));
                                }}
                                style={[
                                    styles.toggleButtonStyle,
                                    methods.watch('isActive')
                                        ? styles.activeBG
                                        : styles.inactiveBG,
                                ]}
                            >
                                <Text>Active</Text>
                            </Pressable>
                            <Pressable
                                onPress={() => {
                                    methods.setValue('isActive', false);
                                    console.log(methods.getValues('isActive'));
                                }}
                                style={[
                                    styles.toggleButtonStyle,
                                    methods.watch('isActive')
                                        ? styles.inactiveBG
                                        : styles.activeBG,
                                ]}
                            >
                                <Text>Inactive</Text>
                            </Pressable>
                        </View>

                        <Button
                            disabled={
                                isStateLoading('create-routine') ||
                                !methods.formState.isValid
                            }
                            onButtonPress={methods.handleSubmit(
                                onSubmitRoutine
                            )}
                        >
                            {isStateLoading('create-routine') ? (
                                <ActivityIndicator size='small' color='white' />
                            ) : (
                                <Text
                                    style={{
                                        color: Colors.dark.grayCool[200],
                                        fontWeight: '600',
                                        fontSize: 16,
                                    }}
                                >
                                    {selectedRoutine?.routine_id
                                        ? 'Submit Changes'
                                        : 'Submit Routine'}
                                </Text>
                            )}
                        </Button>
                    </>
                )}
            </FormProvider>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: Colors.dark.background[600],
        gap: Sizing.spacing['md'],
    },
    formContainer: {
        backgroundColor: 'transparent',
        paddingHorizontal: Sizing.spacing['md'],
        paddingVertical: Sizing.spacing['md'],
    },
    formNavigationButtons: {
        position: 'absolute',
        bottom: 50,
        right: 0,
        left: 0,
        flexDirection: 'row',
    },
    toggleButtonStyle: {
        flex: 1,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizing.borderRadius['xs'],
    },
    activeBG: {
        backgroundColor: Colors.dark.grayWarm[200],
    },
    inactiveBG: {
        backgroundColor: 'transparent',
    },
});

export default CreateRoutineForm;
