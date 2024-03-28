import { StyleSheet } from 'react-native';
import { View, Text } from '../Themed';
import { SetPerformance, Performance } from '../../store/Types';
import Colors, { Shadows } from '../../constants/Colors';
import { SetAndRepInputRow } from './SetAndRepInputRow';
import Sizing from '../../constants/Sizing';
import { useState } from 'react';
import Button from '../common/Button';
import Icon from '../common/Icon';
import { useStore } from '../../store';
import Toast from 'react-native-toast-message';
import { observer } from 'mobx-react';

type SessionFormProps = {
    performance: Performance;
};

export const SessionPerformanceForm = observer(
    ({ performance }: SessionFormProps) => {
        const { deleteSetPerformance, currentSession } =
            useStore().SessionStore;
        const [sets, setSets] = useState<SetPerformance[] | []>(
            performance.sets || []
        );

        function addSet() {
            setSets([
                ...sets,
                {
                    set_number: sets.length + 1,
                    reps: 0,
                    weight: 0,
                    rir: 0,
                },
            ]);
        }

        async function removeSet() {
            const setToRemove = sets[sets.length - 1];
            if (setToRemove.performance_id) {
                const result = await deleteSetPerformance(
                    setToRemove.performance_id
                );
                if (result) {
                    setSets(sets.slice(0, -1));
                }

                return;
            } else {
                setSets(sets.slice(0, -1));
            }
            Toast.show({
                text1: 'Set removed successfully',
                type: 'success',
            });
        }

        return (
            <View style={styles.formContainer}>
                <View style={styles.headerContainer}>
                    <View style={styles.titleChip}>
                        <Text style={styles.title}>
                            {performance.exercise_name}
                        </Text>
                        <Text style={styles.title}>
                            {JSON.stringify(performance.sets, null, 2)}
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        gap: Sizing.spacing.md,
                        paddingBottom: Sizing.spacing.md,
                    }}
                >
                    {sets.map((set: SetPerformance) => {
                        return (
                            <SetAndRepInputRow
                                key={set.set_number}
                                setPerformance={set}
                                performanceData={performance}
                                setSets={setSets}
                                sets={sets}
                            />
                        );
                    })}
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        gap: Sizing.spacing.sm,
                    }}
                >
                    {sets.length > 0 && (
                        <View
                            style={{
                                flex: 1,
                            }}
                        >
                            <Button
                                title='-'
                                variant='passive'
                                height={32}
                                width={'100%'}
                                titleStyles={{
                                    fontSize: Sizing.fontSize.md,
                                    fontWeight: 'bold',
                                    color: Colors.dark.grayWarm[200],
                                }}
                                onButtonPress={() => removeSet()}
                            >
                                <Icon
                                    name='minus'
                                    color={Colors.dark.grayWarm[200]}
                                    size={16}
                                />
                            </Button>
                        </View>
                    )}
                    <View
                        style={{
                            flex: 1,
                        }}
                    >
                        <Button
                            title='+'
                            variant='primary'
                            height={32}
                            width={'100%'}
                            titleStyles={{
                                fontSize: Sizing.fontSize.md,
                                fontWeight: 'bold',
                                color: Colors.dark.grayWarm[200],
                            }}
                            onButtonPress={() => addSet()}
                        >
                            <Icon
                                name='plus'
                                color={Colors.dark.grayWarm[200]}
                                size={16}
                            />
                        </Button>
                    </View>
                </View>
            </View>
        );
    }
);

const styles = StyleSheet.create({
    formContainer: {
        width: '100%',
        backgroundColor: Colors.dark.background[200],
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: 'transparent',
        paddingBottom: Sizing.spacing['md'],
    },
    titleChip: {
        backgroundColor: Colors.dark.grayWarm[300],
        ...Shadows.light.elevation1,
        alignItems: 'flex-start',
        borderRadius: Sizing.borderRadius['sm'],
        paddingHorizontal: Sizing.spacing['sm'],
        paddingVertical: Sizing.spacing['sm'],
        textAlign: 'baseline',
        opacity: 0.7,
    },
    title: {
        fontSize: Sizing.fontSize['md'],
        fontWeight: '600',
        alignContent: 'center',
        color: Colors.dark.grayWarm[900],
    },
});
