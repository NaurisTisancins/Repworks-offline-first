import { StyleSheet, Text, View } from 'react-native';
import ActiveRoutineView from '../../components/ActiveRoutineView';
import { observer } from 'mobx-react';
import { useStore } from '../../store';
import { useEffect } from 'react';

const HomeScreen = () => {
    const { getActiveRoutines } = useStore();

    useEffect(() => {
        getActiveRoutines();
    }, []);

    return (
        <View style={styles.container}>
            <ActiveRoutineView />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        marginHorizontal: 14,
        marginVertical: 30,
        gap: 20,
    },
    separator: {
        borderBottomColor: 'lightgray',
        borderBottomWidth: 0.5,
        marginHorizontal: 10,
    },
});

export default observer(HomeScreen);
