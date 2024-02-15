import { View, Text } from '../Themed';
import { StyleSheet } from 'react-native';
import { TextInput } from '../common/TextInput';
import {
    FieldValues,
    Form,
    FormProvider,
    SubmitHandler,
    useForm,
} from 'react-hook-form';
import React from 'react';
import Colors from '../../constants/Colors';
import Sizing from '../../constants/Sizing';
import ButtonPrimary from '../common/ButtonPrimary';

type SetAndRepInputRowProps = {
    performance?: {
        weight: number;
        reps: number;
    };
};

export interface FormValues extends FieldValues {
    weight: number;
    reps: number;
}

export const SetAndRepInputRow = ({ performance }: SetAndRepInputRowProps) => {
    const [error, setError] = React.useState<boolean>(false);

    const { ...methods } = useForm<FormValues>({
        defaultValues: {
            weight: performance?.weight ?? 0,
            reps: performance?.reps ?? 0,
        },
        mode: 'onChange',
    });

    const submitPerformance: SubmitHandler<FormValues> = (data: FormValues) => {
        console.log('submitPerformance');
    };

    return (
        <View style={styles.rowContainer}>
            <FormProvider {...methods}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',

                        width: '100%',
                        gap: Sizing.spacing.sm,
                        backgroundColor: Colors.dark.transparent,
                    }}
                >
                    <View style={styles.inputContainer}>
                        <TextInput
                            name='weight'
                            placeholder='Weight'
                            keyboardType='numeric'
                            setFormError={setError}
                        />
                        <View
                            style={{
                                height: 40,
                                alignContent: 'center',
                                justifyContent: 'flex-end',
                            }}
                        >
                            <Text
                                style={{
                                    color: Colors.dark.grayCool[800],
                                    fontSize: Sizing.fontSize.md,
                                    paddingHorizontal: Sizing.spacing.md,
                                    fontWeight: Sizing.fontWeight.lg,
                                    fontStyle: 'italic',
                                }}
                            >
                                KG
                            </Text>
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            name='reps'
                            placeholder='Reps'
                            keyboardType='numeric'
                            setFormError={setError}
                        />
                        <View
                            style={{
                                height: 40,
                                alignContent: 'center',
                                justifyContent: 'flex-end',
                            }}
                        >
                            <Text
                                style={{
                                    color: Colors.dark.grayCool[800],
                                    fontSize: Sizing.fontSize.md,
                                    paddingHorizontal: Sizing.spacing.md,
                                    fontWeight: Sizing.fontWeight.lg,
                                    fontStyle: 'italic',
                                }}
                            >
                                REPS
                            </Text>
                        </View>
                    </View>
                    <View style={{}}>
                        <ButtonPrimary
                            title='✓'
                            variant='success'
                            width={40}
                            height={40}
                            titleStyles={{
                                fontSize: Sizing.fontSize.md,
                                fontWeight: 'bold',
                                color: Colors.dark.green[800],
                            }}
                            onButtonPress={methods.handleSubmit(
                                submitPerformance
                            )}
                        />
                    </View>
                </View>
            </FormProvider>
        </View>
    );
};

const styles = StyleSheet.create({
    rowContainer: {
        backgroundColor: Colors.dark.background[200],
        width: '100%',
        justifyContent: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        height: 40,
    },
});
