import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions, StyleSheet } from 'react-native';
import { View, Text } from '../../components/Themed';
import Colors, { Shadows } from '../../constants/Colors';
import { useStore } from '../../store';
import Sizing from '../../constants/Sizing';
import Animated from 'react-native-reanimated';
import Button from '../../components/common/Button';
import { router } from 'expo-router';
import { SessionPerformanceForm } from '../../components';
import { Performance } from '../../store/Types';
import Toast from 'react-native-toast-message';
import { useState } from 'react';

const NewSessionView = () => {
    const [windowDimensions, setWindowDimensions] = useState({
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    });
    const {
        RoutineStore: { currentTrainingDay },
        SessionStore: { currentSession, endSession },
    } = useStore();

    async function onClickEndSession(session_id: string) {
        const result = await endSession(session_id);
        if (result) {
            Toast.show({
                text1: 'Session ended successfully',
                type: 'success',
            });
            router.push(`/routine/${currentTrainingDay?.routine_id}`);
        }
    }

    return (
        <View style={[styles.container]}>
            <Text
                style={{
                    color: 'white',
                }}
            >
                {JSON.stringify(currentSession?.performance, null, 2)}
            </Text>
            <Animated.ScrollView
                style={{
                    width: '100%',
                }}
                contentContainerStyle={{
                    gap: Sizing.spacing['md'],
                    paddingBottom: Sizing.spacing['lg'],
                    paddingTop: Sizing.spacing['md'],
                }}
            >
                {currentSession?.performance &&
                    currentSession.performance.map(
                        (performance: Performance) => {
                            return (
                                <View style={styles.cardContainer}>
                                    <SessionPerformanceForm
                                        performance={performance}
                                    />
                                </View>
                            );
                        }
                    )}
                <Button
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
        width: '100%',
        alignItems: 'center',
        flex: 1,
        backgroundColor: Colors.dark.background[600],
        paddingHorizontal: Sizing.spacing['md'],
    },
    cardContainer: {
        width: '100%',
        height: 'auto',
        backgroundColor: Colors.dark.background[200],
        borderRadius: Sizing.borderRadius['md'],
        padding: Sizing.spacing['md'],
        ...Shadows.dark.elevation2,
    },
});

export default NewSessionView;
