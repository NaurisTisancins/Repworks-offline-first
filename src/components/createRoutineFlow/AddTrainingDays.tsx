import {
    FormProvider,
    SubmitErrorHandler,
    SubmitHandler,
    useForm,
} from 'react-hook-form';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { View, Text } from '../Themed';
import { TextInput } from '../common/TextInput';
import ButtonPrimary from '../common/ButtonPrimary';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useStore } from '../../store';
import { FormStep } from '../formStepper/FormStepper';
import React, { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '../../constants/Colors';
import TrainingDayItem from '../TrainingDayItem';
import Sizing from '../../constants/Sizing';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { TrainingDay } from '../../store/Types';

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
    const [modalVisible, setModalVisible] = useState(false);
    const [formError, setError] = React.useState<boolean>(false);
    function closeModal() {
        setModalVisible(false);
    }

    const onError: SubmitErrorHandler<FormValues> = (errors, e) => {
        return console.log({ errors });
    };
    const {
        RoutineStore: {
            selectedRoutine,
            createTrainingDay,
            getTrainingDaysWithExercises,
            trainingDays,
            isStateLoading,
        },
    } = useStore();

    const { ...methods } = useForm<FormValues>({
        defaultValues: {
            day_name: '',
        },
        resolver: zodResolver(validationSchema),
        mode: 'onChange',
    });

    function openModal() {
        setModalVisible(true);
        //   setSelectedDay(trainingDay);
    }

    React.useEffect(() => {
        getTrainingDaysWithExercises(selectedRoutine?.routine_id as string);
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
            getTrainingDaysWithExercises(selectedRoutine.routine_id);
        }
    };
    return (
        <View
            style={{
                height: '100%',
                backgroundColor: Colors.dark.background,
            }}
        >
            <FormProvider {...methods}>
                {formError && (
                    <View>
                        <Text style={{ color: 'red' }}>
                            There was a problem with loading the form. Please
                            try again later.
                        </Text>
                    </View>
                )}

                <View
                    style={{
                        backgroundColor: Colors.dark.background,
                    }}
                >
                    <View
                        style={{
                            backgroundColor: 'transparent',
                            paddingBottom: Sizing.spacing['md'],
                        }}
                    >
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
                                style={{}}
                                disabled={
                                    isStateLoading('create-training-days') ||
                                    !selectedRoutine
                                }
                                onButtonPress={methods.handleSubmit(
                                    onSubmitTrainingDay
                                )}
                            >
                                {isStateLoading(
                                    'create-training-days' ||
                                        'get-training-days'
                                ) ? (
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
                                        Add training day
                                    </Text>
                                )}
                            </ButtonPrimary>
                        )}
                    </View>

                    <ScrollView
                        contentContainerStyle={{
                            backgroundColor: Colors.dark.background,
                            gap: Sizing.spacing['md'],
                            paddingVertical: Sizing.spacing['md'],
                        }}
                    >
                        {trainingDays.map((day) => {
                            return (
                                <TrainingDayItem
                                    key={day.day_id}
                                    trainingDay={day}
                                    modalVisible={modalVisible}
                                    setModalVisible={openModal}
                                    modalContent={
                                        <>
                                            <Text style={styles.textStyle}>
                                                Delete Training Day?
                                            </Text>
                                            <View
                                                style={styles.buttonsContainer}
                                            >
                                                <ButtonPrimary
                                                    title='Delete'
                                                    variant='danger'
                                                    onButtonPress={() =>
                                                        console.log('delete')
                                                    }
                                                    width={80}
                                                />
                                                <ButtonPrimary
                                                    title='Cancel'
                                                    variant='passive'
                                                    onButtonPress={() =>
                                                        closeModal()
                                                    }
                                                    width={80}
                                                />
                                            </View>
                                        </>
                                    }
                                />
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

const styles = StyleSheet.create({
    textStyle: {
        color: Colors.dark['gray600'],
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 20,
    },
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        width: '100%',
        gap: 20,
    },
});

export default AddTrainingDays;
