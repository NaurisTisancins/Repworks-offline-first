import { StyleSheet } from 'react-native';
import { View } from '../../components/Themed';
import RoutineList from '../../components/RoutineList';
import SelectedRoutineView from '../../components/SelectedRoutineView';
import { observer } from 'mobx-react';

function HomeScreen() {
    return (
        <View style={styles.container}>
            <SelectedRoutineView />
            <View style={styles.separator} />
            <RoutineList />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        marginHorizontal: 14,
        marginVertical: 30,
        gap: 30,
    },
    separator: {
        borderBottomColor: 'lightgray',
        borderBottomWidth: 0.5,
        marginHorizontal: 10,
    },
});

export default observer(HomeScreen);
