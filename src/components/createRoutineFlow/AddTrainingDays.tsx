import {
    FieldValues,
    FormProvider,
    SubmitErrorHandler,
    SubmitHandler,
    useFieldArray,
    useForm,
} from 'react-hook-form';
import { ActivityIndicator, Text, View } from 'react-native';
import { TextInput } from '../common/TextInput';
import ButtonPrimary from '../common/ButtonPrimary';
import {
    CreateTrainingDayPayload,
    CreateTrainingDaysPayload,
} from '../../store/Types';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useStore } from '../../store';
import { FormStep } from '../formStepper/FormStepper';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';

const validationSchema = z.object({
    day_name: z.string().min(2).max(25),
});

type FormValues = z.infer<typeof validationSchema>;

type AddTrainingDaysProps = {
    activeStep: FormStep;
    setActiveStepDone: (step: FormStep) => void;
};

const AddTrainingDays = ({
    activeStep,
    setActiveStepDone,
}: AddTrainingDaysProps) => {
    const [formError, setError] = React.useState<boolean>(false);

    const onError: SubmitErrorHandler<FormValues> = (errors, e) => {
        return console.log({ errors });
    };
    const {
        selectedRoutine,
        createTrainingDay,
        getTrainingDays,
        trainingDays,
        isStateLoading,
    } = useStore();

    const { ...methods } = useForm<FormValues>({
        defaultValues: {
            day_name: '',
        },
        resolver: zodResolver(validationSchema),
        mode: 'onChange',
    });

    React.useEffect(() => {
        if (trainingDays.length > 0) {
            setActiveStepDone(activeStep);
        }
    }, []);

    const onSubmitTrainingDay: SubmitHandler<FormValues> = async (
        data: FormValues
    ) => {
        if (!selectedRoutine?.routine_id) {
            setError(true);
            return;
        }
        const result = await createTrainingDay(
            selectedRoutine.routine_id,
            data.day_name
        );
        if (result) {
            methods.reset();
            setActiveStepDone(activeStep);
            getTrainingDays(selectedRoutine.routine_id);
        }
    };
    return (
        <View style={{ height: '100%' }}>
            <FormProvider {...methods}>
                {formError && (
                    <View>
                        <Text style={{ color: 'red' }}>
                            There was a problem with loading the form. Please
                            try again later.
                        </Text>
                    </View>
                )}

                <View style={{ marginBottom: 30 }}>
                    <View>
                        <TextInput
                            name={'day_name'}
                            label='Training day name'
                            placeholder='Push day...'
                            keyboardType='default'
                            rules={{
                                required: 'Training day name is Required!',
                                maxLength: 25,
                                minLength: 2,
                            }}
                            setFormError={setError}
                        />
                        {selectedRoutine && selectedRoutine.routine_id && (
                            <ButtonPrimary
                                disabled={
                                    isStateLoading('create-training-days') ||
                                    !selectedRoutine
                                }
                                onButtonPress={methods.handleSubmit(
                                    onSubmitTrainingDay
                                )}
                            >
                                {isStateLoading('create-training-days') ? (
                                    <ActivityIndicator
                                        size='small'
                                        color='white'
                                    />
                                ) : (
                                    <Text
                                        style={{
                                            color: 'white',
                                            fontWeight: '600',
                                            fontSize: 16,
                                        }}
                                    >
                                        Submit
                                    </Text>
                                )}
                            </ButtonPrimary>
                        )}
                    </View>

                    <ScrollView>
                        {trainingDays.map((day) => {
                            return (
                                <View
                                    key={day.day_id}
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text style={{ color: 'white' }}>
                                        {day.day_name}
                                    </Text>
                                    <ButtonPrimary
                                        title='Remove'
                                        variant='outlined'
                                        onButtonPress={() => {
                                            if (day.day_id) {
                                                console.log(day.day_id);
                                            }
                                        }}
                                    />
                                </View>
                            );
                        })}
                    </ScrollView>

                    {!selectedRoutine && (
                        <Text
                            style={{
                                color: 'red',
                                marginTop: 10,
                                textAlign: 'center',
                            }}
                        >
                            Please create a routine before adding training days
                        </Text>
                    )}
                </View>
            </FormProvider>
        </View>
    );
};

export default AddTrainingDays;
