import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    StyleProp,
    ViewStyle,
    TextStyle,
} from 'react-native';
import ButtonPrimary from '../common/ButtonPrimary';
import Sizing from '../../constants/Sizing';
import Colors from '../../constants/Colors';

type StepProps = {
    step: FormStep;
    done?: boolean;
    active?: boolean;
    setActive: (step: FormStep) => void;
};

const Step = ({ step, active = false, setActive }: StepProps) => {
    const activeStyle: StyleProp<ViewStyle> = {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: `${step.done && Colors.dark.success}`,
        borderWidth: Number(`${active ? 5 : 0}`),
        borderColor: `${active ? Colors.dark.primary : 'transparent'}`,
        width: 40,
        height: 40,
        borderRadius: 20,
    };

    const activeTextStyle: StyleProp<TextStyle> = {
        color: 'white',
        fontSize: 20,
        fontWeight: '600',
    };

    return (
        <ButtonPrimary
            variant={`${'primary'}`}
            style={styles.stepContainer}
            onButtonPress={() => setActive(step)}
        >
            <View style={activeStyle}>
                <Text style={activeTextStyle}>{step.value}</Text>
            </View>
        </ButtonPrimary>
    );
};

const Separator = () => {
    return <View style={styles.stepSeparator}></View>;
};

export type FormStep = {
    title: string;
    description: string;
    value: number;
    done: boolean;
};

type FormStepperProps = {
    steps: FormStep[];
    activeStep: FormStep;
    setActiveStep: (step: FormStep) => void;
};

const FormStepper = ({
    steps,
    activeStep,
    setActiveStep,
}: FormStepperProps) => {
    return (
        <View>
            <View style={styles.stepperContainer}>
                {steps.map((step: FormStep, index) => {
                    return (
                        <>
                            <Step
                                key={step.value}
                                step={step}
                                setActive={setActiveStep}
                                active={activeStep.value === step.value}
                            />
                            {index !== steps.length - 1 && (
                                <Separator key={step.value + step.title} />
                            )}
                        </>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    stepperContainer: {
        paddingHorizontal: Sizing.spacing['md'],
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 100,
        paddingTop: Sizing.spacing['lg'],
        paddingBottom: Sizing.spacing['md'],
    },
    description: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'auto',
    },
    stepContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderRadius: Sizing.borderRadius['lg'],
        gap: 10,
    },
    stepLable: {
        color: Colors.dark.text,
        fontSize: Sizing.fontSize['lg'],
        fontWeight: '600',
    },
    stepSeparator: {
        backgroundColor: Colors.dark['gray450'],
        width: '10%',
        height: 2,
        borderRadius: 10,
        opacity: 0.5,
        // marginTop: 20,
    },
});

export default FormStepper;
