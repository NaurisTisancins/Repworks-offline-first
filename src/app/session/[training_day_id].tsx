import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { View, Text } from '../../components/Themed';
import Colors from '../../constants/Colors';
import { useStore } from '../../store';
import Sizing from '../../constants/Sizing';
import Animated from 'react-native-reanimated';
import ButtonPrimary from '../../components/common/ButtonPrimary';
import { useNavigation } from 'expo-router';
import { useEffect } from 'react';

const NewSessionView = () => {
    const {
        RoutineStore: { currentTrainingDay },
        SessionStore: { currentSession },
    } = useStore();

    return (
        <SafeAreaView style={styles.container}>
            <Text>{JSON.stringify(currentTrainingDay?.day_id, null, 2)}</Text>
            <Animated.ScrollView>
                <View style={styles.cardContainer}>
                    <Text
                        style={{
                            color: Colors.dark['black'],
                        }}
                    >
                        {JSON.stringify(currentSession, null, 2)}
                    </Text>
                </View>
                <ButtonPrimary
                    title='END SESSION'
                    variant='outlined'
                    onButtonPress={() => console.log('END SESSION')}
                />
            </Animated.ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.dark['background'],
        paddingHorizontal: Sizing.spacing['md'],
    },
    cardContainer: {
        backgroundColor: Colors.dark['gray200'],
        borderRadius: Sizing.borderRadius['md'],
        padding: Sizing.spacing['md'],
        marginVertical: Sizing.spacing['md'],
    },
});

export default NewSessionView;
