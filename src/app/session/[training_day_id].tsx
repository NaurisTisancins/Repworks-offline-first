import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { View, Text } from '../../components/Themed';
import Colors from '../../constants/Colors';
import { useStore } from '../../store';
import Sizing from '../../constants/Sizing';
import Animated from 'react-native-reanimated';
import ButtonPrimary from '../../components/common/ButtonPrimary';
import { router } from 'expo-router';
import { SessionForm } from '../../components';
import { SessionWithExercises } from '../../store/Types';

const NewSessionView = () => {
    const {
        RoutineStore: { currentTrainingDay },
        SessionStore: { currentSession, endSession },
    } = useStore();

    async function onClickEndSession(session_id: string) {
        const result = await endSession(session_id);
        if (result) {
            router.push(`/routine/${currentTrainingDay?.routine_id}`);
        }
    }

    return (
        <View style={styles.container}>
            <Animated.ScrollView
                style={{
                    width: '100%',
                }}
            >
                <View style={styles.cardContainer}>
                    <SessionForm
                        session={currentSession as SessionWithExercises}
                    />
                </View>
                <ButtonPrimary
                    title='END SESSION'
                    variant='outlined'
                    onButtonPress={() => {
                        console.log(
                            'currentSession_id',
                            currentSession?.session_id
                        );
                        onClickEndSession(currentSession?.session_id as string);
                    }}
                />
            </Animated.ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        backgroundColor: Colors.dark.background[600],
        paddingHorizontal: Sizing.spacing['md'],
    },
    cardContainer: {
        width: '100%',
        backgroundColor: Colors.dark.background[200],
        borderRadius: Sizing.borderRadius['md'],
        padding: Sizing.spacing['md'],
        marginVertical: Sizing.spacing['md'],
        ...Colors.dark.shadows.dark.elevation2,
    },
});

export default NewSessionView;
