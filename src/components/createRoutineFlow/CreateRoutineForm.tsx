import { View, Text, StyleSheet } from 'react-native';
import {
    useForm,
    FormProvider,
    SubmitHandler,
    SubmitErrorHandler,
    FieldValues,
} from 'react-hook-form';
import ButtonPrimary from '../common/ButtonPrimary';
import { useState } from 'react';
import { TextInput } from '../common/TextInput';
import { useStore } from '../../store';

interface FormValues extends FieldValues {
    name: string;
    description: string;
}

const CreateRoutineForm = () => {
    const { activeRoutine, createRoutine, getRoutines, isLoading } = useStore();
    const { ...methods } = useForm<FormValues>({ mode: 'onChange' });

    const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
        const result = await createRoutine(data);

        if (result) {
            await getRoutines();
            console.log(activeRoutine, 'active Routine');
        }
    };

    const [formError, setError] = useState<Boolean>(false);

    const onError: SubmitErrorHandler<FormValues> = (errors, e) => {
        return console.log({ errors });
    };

    if (isLoading) return <Text>Loading...</Text>;

    return (
        <View style={styles.container}>
            {formError ? (
                <View>
                    <Text style={{ color: 'red' }}>
                        There was a problem with loading the form. Please try
                        again later.
                    </Text>
                </View>
            ) : (
                <>
                    <FormProvider {...methods}>
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
                    </FormProvider>
                </>
            )}
            <ButtonPrimary
                title='Confirm'
                onButtonPress={methods.handleSubmit(onSubmit, onError)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        height: '100%',
        marginHorizontal: 14,
        marginVertical: 30,
    },
    inputFieldBlock: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 40,
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 40,
    },
    label: {
        color: 'white',
        marginBottom: 4,
    },
    buttonContainer: {
        backgroundColor: 'yellow',
    },
});

export default CreateRoutineForm;
