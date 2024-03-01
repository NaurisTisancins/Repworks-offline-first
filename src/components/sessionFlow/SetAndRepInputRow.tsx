import { View, Text } from '../Themed';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { TextInput } from '../common/TextInput';
import {
    FieldValues,
    FormProvider,
    SubmitHandler,
    set,
    useForm,
} from 'react-hook-form';
import React from 'react';
import Colors from '../../constants/Colors';
import Sizing from '../../constants/Sizing';
import CheckBox from '../common/CheckBox';
import { SetPerformance, Performance } from '../../store/Types';
import { useStore } from '../../store';
import Toast from 'react-native-toast-message';

type SetAndRepInputRowProps = {
    setPerformance?: SetPerformance;
    performanceData?: Performance;
};

export interface FormValues extends FieldValues {
    set_number: number;
    weight: number;
    reps: number;
}

export const SetAndRepInputRow = ({
    setPerformance,
    performanceData,
}: SetAndRepInputRowProps) => {
    const { saveOrUpdatePerformance } = useStore().SessionStore;
    const [error, setError] = React.useState<boolean>(false);
    const [done, setDone] = React.useState<boolean>(
        setPerformance?.created_at ? true : false
    );

    function setSetDone() {
        setDone(!done);
    }

    const { ...methods } = useForm<FormValues>({
        defaultValues: {
            set_number: setPerformance?.set_number ?? 0,
            weight: setPerformance?.weight ?? 0,
            reps: setPerformance?.reps ?? 0,
            rir: setPerformance?.rir ?? 0,
        },
        mode: 'onChange',
    });

    const labelStyle: TextStyle = {
        color: Colors.dark.grayCool[800],
        fontSize: Sizing.fontSize.xs,
        paddingHorizontal: Sizing.spacing.xs,
        fontWeight: Sizing.fontWeight.lg as 'bold',
        fontStyle: 'italic',
    };

    const labelContainerStyle: ViewStyle = {
        height: 32,
        alignContent: 'center',
        justifyContent: 'flex-end',
        paddingVertical: Sizing.spacing.sm,
    };

    const doneInputBackground = !done
        ? Colors.dark.background[300]
        : Colors.dark.background[200];

    const submitPerformance: SubmitHandler<FormValues> = async (
        data: FormValues
    ) => {
        if (!performanceData || !setPerformance) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Performance data is missing',
            });
            return;
        }
        console.log(data);
        await saveOrUpdatePerformance(
            performanceData.session_id,
            performanceData.exercise_id,

            {
                set_number: Number(data.set_number),
                weight: Number(data.weight),
                reps: Number(data.reps),
                rir: Number(data.rir),
            }
        );

        setSetDone();
    };

    return (
        <FormProvider {...methods}>
            <View style={styles.rowContainer}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%',
                        gap: Sizing.spacing.sm,
                        backgroundColor: Colors.dark.transparent,
                        // backgroundColor: 'yellow',
                    }}
                >
                    <View style={[styles.inputContainer, { width: '30%' }]}>
                        <TextInput
                            name='weight'
                            height={32}
                            paddngHorizontal={Sizing.spacing.sm}
                            backgroundColor={doneInputBackground}
                            inputMode='numeric'
                            editable={!done}
                            keyboardType='numeric'
                            setFormError={setError}
                        />
                        <View style={labelContainerStyle}>
                            <Text style={labelStyle}>KG</Text>
                        </View>
                    </View>
                    <View style={[styles.inputContainer, { width: '30%' }]}>
                        <TextInput
                            name='reps'
                            height={32}
                            paddngHorizontal={Sizing.spacing.sm}
                            backgroundColor={doneInputBackground}
                            inputMode='numeric'
                            editable={!done}
                            placeholder={'0'}
                            keyboardType='numeric'
                            setFormError={setError}
                        />
                        <View style={labelContainerStyle}>
                            <Text style={labelStyle}>REPS</Text>
                        </View>
                    </View>
                    <View style={[styles.inputContainer, { width: '15%' }]}>
                        <TextInput
                            name='rir'
                            height={32}
                            paddngHorizontal={Sizing.spacing.sm}
                            backgroundColor={doneInputBackground}
                            inputMode='numeric'
                            editable={!done}
                            placeholder={'0'}
                            keyboardType='numeric'
                            setFormError={setError}
                        />
                        <View style={labelContainerStyle}>
                            <Text style={labelStyle}>RIR</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            width: 'auto',
                        }}
                    >
                        <CheckBox
                            label='✓'
                            width={32}
                            height={32}
                            checked={done}
                            onChecked={() =>
                                methods.handleSubmit(submitPerformance)()
                            }
                        />
                    </View>
                </View>
            </View>
        </FormProvider>
    );
};

const styles = StyleSheet.create({
    rowContainer: {
        backgroundColor: Colors.dark.background[200],
        width: '100%',
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: Sizing.spacing.sm,
        height: 32,
    },
});
