import { View, Text } from '../Themed';
import { StyleSheet } from 'react-native';
import { TextInput } from '../common/TextInput';
import {
    FieldValues,
    FormProvider,
    SubmitHandler,
    useForm,
} from 'react-hook-form';
import React from 'react';
import Colors from '../../constants/Colors';
import Sizing from '../../constants/Sizing';
import CheckBox from '../common/CheckBox';
import { SetPerformance } from '../../store/Types';

type SetAndRepInputRowProps = {
    setPerformance?: SetPerformance;
};

export interface FormValues extends FieldValues {
    set_index: number;
    weight: number;
    reps: number;
}

export const SetAndRepInputRow = ({
    setPerformance,
}: SetAndRepInputRowProps) => {
    const [error, setError] = React.useState<boolean>(false);
    const [done, setDone] = React.useState<boolean>(false);

    function setSetDone() {
        setDone(!done);
    }

    const { ...methods } = useForm<FormValues>({
        defaultValues: {
            set_index: setPerformance?.set_number ?? 0,
            weight: setPerformance?.weight ?? 0,
            reps: setPerformance?.reps ?? 0,
            rir: setPerformance?.rir ?? 0,
        },
        mode: 'onChange',
    });

    const submitPerformance: SubmitHandler<FormValues> = (data: FormValues) => {
        console.log('submitPerformance', data);
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
                            height={32}
                            inputMode='numeric'
                            placeholder='0'
                            keyboardType='numeric'
                            setFormError={setError}
                        />
                        <View
                            style={{
                                height: 32,
                                alignContent: 'center',
                                justifyContent: 'flex-end',
                            }}
                        >
                            <Text
                                style={{
                                    color: Colors.dark.grayCool[800],
                                    fontSize: Sizing.fontSize.md,
                                    paddingHorizontal: Sizing.spacing.xs,
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
                            height={32}
                            inputMode='numeric'
                            placeholder='0'
                            keyboardType='numeric'
                            setFormError={setError}
                        />
                        <View
                            style={{
                                height: 32,
                                alignContent: 'center',
                                justifyContent: 'flex-end',
                            }}
                        >
                            <Text
                                style={{
                                    color: Colors.dark.grayCool[800],
                                    fontSize: Sizing.fontSize.md,
                                    paddingHorizontal: Sizing.spacing.xs,
                                    fontWeight: Sizing.fontWeight.lg,
                                    fontStyle: 'italic',
                                }}
                            >
                                REPS
                            </Text>
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            name='rir'
                            height={32}
                            inputMode='numeric'
                            placeholder='0'
                            keyboardType='numeric'
                            setFormError={setError}
                        />
                        <View
                            style={{
                                height: 32,
                                alignContent: 'center',
                                justifyContent: 'flex-end',
                            }}
                        >
                            <Text
                                style={{
                                    color: Colors.dark.grayCool[800],
                                    fontSize: Sizing.fontSize.md,
                                    paddingHorizontal: Sizing.spacing.xs,
                                    fontWeight: Sizing.fontWeight.lg,
                                    fontStyle: 'italic',
                                }}
                            >
                                RIR
                            </Text>
                        </View>
                    </View>
                    <CheckBox
                        label='✓'
                        width={32}
                        height={32}
                        checked={done}
                        onChecked={() => setSetDone()}
                    />
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
        height: 32,
    },
});
