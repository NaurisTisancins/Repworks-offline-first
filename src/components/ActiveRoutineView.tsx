import { View, Text, StyleSheet } from 'react-native';
import { useStore } from '../store/index';
import { observer } from 'mobx-react';
import ActiveRoutineListItem from './ActiveRoutineListItem';
import ButtonPrimary from './common/ButtonPrimary';
import { router } from 'expo-router';

function ActiveRoutineView() {
    const {
        RoutineStore: { activeRoutines },
    } = useStore();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Current Routine</Text>
            {activeRoutines.length > 0 ? (
                <View>
                    {activeRoutines.map((routine) => (
                        <ActiveRoutineListItem
                            routine={routine}
                            key={routine.routine_id}
                        />
                    ))}
                </View>
            ) : (
                <View>
                    <Text style={styles.noRoutines}>
                        You have no active routines
                    </Text>
                    <ButtonPrimary
                        title={'Add routine'}
                        onButtonPress={() =>
                            router.push('/routine/createRoutine')
                        }
                    />
                    <Text style={styles.separatorText}>Or</Text>
                    <ButtonPrimary
                        title={'Browse routines'}
                        onButtonPress={() => router.push('/routine/routines')}
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 'auto',
        width: '100%',
    },
    title: {
        color: 'white',
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 10,
    },
    noRoutines: {
        color: 'white',
        marginBottom: 10,
    },

    separatorText: {
        color: 'white',
        display: 'flex',
        textAlign: 'center',
        width: '100%',
        padding: 10,
        fontSize: 16,
        fontWeight: '800',
    },
    buttonContainer: {
        marginTop: 20,
    },
});

export default observer(ActiveRoutineView);
