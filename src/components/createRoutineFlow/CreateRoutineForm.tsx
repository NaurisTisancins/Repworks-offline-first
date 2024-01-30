import { ActivityIndicator, StyleSheet } from 'react-native';
import { View, Text } from '../../components/Themed';
import { TextInput } from '../common/TextInput';
import Checkbox from 'expo-checkbox';
import ButtonPrimary from '../common/ButtonPrimary';
import {
    FieldValues,
    FormProvider,
    SubmitErrorHandler,
    SubmitHandler,
    set,
    useForm,
} from 'react-hook-form';
import { useStore } from '../../store';
import { FormStep } from '../formStepper/FormStepper';
import React from 'react';
import Colors from '../../constants/Colors';
import Sizing from '../../constants/Sizing';

export interface FormValues extends FieldValues {
    name: string;
    description: string;
    isActive: boolean;
}

type CreateRoutineFormProps = {
    activeStep: FormStep;
    setActiveStepDone: (step: FormStep) => void;
};

const CreateRoutineForm = ({
    setActiveStepDone,
    activeStep,
}: CreateRoutineFormProps) => {
    const [formError, setError] = React.useState<boolean>(false);

    const onError: SubmitErrorHandler<FormValues> = (errors, e) => {
        return console.log({ errors });
    };
    const { selectedRoutine, createRoutine, getRoutines, isStateLoading } =
        useStore();

    const { ...methods } = useForm<FormValues>({
        defaultValues: {
            name: selectedRoutine?.name || '',
            description: selectedRoutine?.description || '',
            isActive: selectedRoutine?.is_active || false,
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

        const result = await createRoutine(routineData);
        if (result) {
            setActiveStepDone(activeStep);
            getRoutines();
        }
    };

    return (
        <View style={styles.container}>
            <FormProvider {...methods}>
                {formError ? (
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
                            placeholder='Describe your routine'
                            rules={{ maxLength: 1000, minLength: 10 }}
                            multiline
                            setFormError={setError}
                        />
                        <View
                            style={{
                                flex: -1,
                                flexDirection: 'row',
                                backgroundColor: 'transparent',
                                marginBottom: Sizing.spacing['md'],
                                gap: 10,
                            }}
                        >
                            <Checkbox
                                value={methods.watch('isActive')}
                                onValueChange={() =>
                                    methods.setValue(
                                        'isActive',
                                        !methods.watch('isActive')
                                    )
                                }
                            />
                            <Text
                                style={{
                                    color: 'white',
                                    marginBottom: 10,
                                    marginLeft: 0,
                                }}
                            >
                                Set as Active Routine?
                            </Text>
                        </View>

                        <ButtonPrimary
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
                                        color: 'white',
                                        fontWeight: '600',
                                        fontSize: 16,
                                    }}
                                >
                                    Submit Routine
                                </Text>
                            )}
                        </ButtonPrimary>
                    </>
                )}
            </FormProvider>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: Colors.dark['background'],
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
});

export default CreateRoutineForm;
