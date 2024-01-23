import { Routine } from '../store/Types';
import {
    StyleSheet,
    View,
    Text,
    Pressable,
    StyleProp,
    ViewStyle,
} from 'react-native';
import { useStore } from '../store/index';
import { router } from 'expo-router';

type RoutineProps = {
    routine: Routine;
};

export default function RoutineListItem({ routine }: RoutineProps) {
    const { setActiveRoutines, setSelectedRoutine } = useStore();
    // const numberOfTrainingDays = routine.length;

    function onSelect(): void {
        setSelectedRoutine(routine);
        router.push(`/routine/${routine.routine_id}`);
    }

    const activeStyle: StyleProp<ViewStyle> = {
        height: 50,
        width: '100%',
        backgroundColor: `${routine.is_active === true ? 'teal' : 'lightgray'}`,
        borderRadius: 20,
        padding: 15,
    };

    return (
        <Pressable onPress={onSelect} style={activeStyle}>
            <View style={styles.header}>
                <Text style={styles.title}>{routine.name}</Text>
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
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
    },
});
