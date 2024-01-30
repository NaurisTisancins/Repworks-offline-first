import { Routine } from '../store/Types';
import { StyleSheet, Pressable, StyleProp, ViewStyle } from 'react-native';
import { Text, View } from '../components/Themed';
import { useStore } from '../store/index';
import { router } from 'expo-router';
import Colors from '../constants/Colors';

type RoutineProps = {
    routine: Routine;
};

export default function RoutineListItem({ routine }: Readonly<RoutineProps>) {
    const { setActiveRoutines, setSelectedRoutine } = useStore();
    // const numberOfTrainingDays = routine.length;

    function onSelect(): void {
        setSelectedRoutine(routine);
        router.push(`/routine/${routine.routine_id}`);
    }

    const activeStyle: StyleProp<ViewStyle> = {
        height: 50,
        width: '100%',
        backgroundColor: `${Colors.dark['gray200']}`,
        borderRadius: 20,
        padding: 15,
    };

    return (
        <Pressable onPress={onSelect} style={activeStyle}>
            <View style={styles.header}>
                <Text style={styles.title}>{routine.name}</Text>
                {routine.is_active && (
                    <View style={{ backgroundColor: 'transparent' }}>
                        <Text style={{ color: Colors.dark.text }}>Active</Text>
                    </View>
                )}
                {/* <Text>{numberOfTrainingDays} day split</Text> */}
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {},

    header: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
    },
});
