import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Pressable,
    StyleProp,
    ViewStyle,
} from 'react-native';

type StepProps = {
    lable: string;
    description?: string;
    step: number;
    done?: boolean;
    active?: boolean;
    setActive: (step: number) => void;
};

const Step = ({
    lable,
    description,
    step,
    done = false,
    active = false,
    setActive,
}: StepProps) => {
    const activeStyle: StyleProp<ViewStyle> = active
        ? {
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'teal',
              width: 40,
              height: 40,
              borderRadius: 20,
          }
        : {
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'lightgray',
              width: 40,
              height: 40,
              borderRadius: 20,
          };
    return (
        <Pressable style={styles.stepContainer} onPress={() => setActive(step)}>
            <View style={activeStyle}>
                <Text style={styles.stepNumber}>{step}</Text>
            </View>
        </Pressable>
    );
};

const Separator = () => {
    return <View style={styles.stepSeparator}></View>;
};

export type FormStep = {
    title: string;
    description: string;
};

type FormStepperProps = {
    steps: FormStep[];
};

const FormStepper = ({ steps }: FormStepperProps) => {
    const [activeStep, setActiveStep] = React.useState(0);

    function setActive(step: number) {
        setActiveStep(step);
    }
    return (
        <>
            <View style={styles.stepperContainer}>
                {steps.map((step: FormStep, index) => {
                    return (
                        <>
                            <Step
                                lable={step.title}
                                description={step.description}
                                step={index + 1}
                                setActive={setActive}
                                active={index + 1 === activeStep}
                            />
                            {index !== steps.length - 1 && <Separator />}
                        </>
                    );
                })}
            </View>
            <View style={styles.description}>
                {steps
                    .filter((step, index) => {
                        return index + 1 === activeStep;
                    })
                    .map((step) => {
                        return (
                            <Text style={styles.stepLable}>
                                {step.description}
                            </Text>
                        );
                    })}
            </View>
        </>
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
        gap: 10,
    },

    stepNumber: {
        color: 'black',
        fontSize: 20,
    },
    stepLable: {
        color: 'white',
    },
    stepSeparator: {
        backgroundColor: 'blue',
        width: 80,
        height: 2,
        // marginTop: 20,
    },
});

export default FormStepper;
