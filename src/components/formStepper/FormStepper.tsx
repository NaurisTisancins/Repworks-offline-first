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
        backgroundColor: `${step.done && 'green'}`,
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
            variant={`${active ? 'primary' : 'outlined'}`}
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
                            {index !== steps.length - 1 && <Separator />}
                        </>
                    );
                })}
            </View>
            <View style={styles.description}>
                {steps
                    .filter((step, index) => {
                        return step.value === activeStep.value;
                    })
                    .map((step) => {
                        return (
                            <Text style={styles.stepLable}>
                                {step.description}
                            </Text>
                        );
                    })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    stepperContainer: {
        marginHorizontal: 14,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 'auto',
        marginBottom: 10,
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
        borderRadius: 20,
        gap: 10,
    },
    stepLable: {
        color: 'white',
        fontSize: 24,
        fontWeight: '600',
    },
    stepSeparator: {
        backgroundColor: 'white',
        width: '10%',
        height: 2,
        borderRadius: 2,
        // marginTop: 20,
    },
});

export default FormStepper;
