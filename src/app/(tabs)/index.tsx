import { StyleSheet } from 'react-native';
import { View } from '../../components/Themed';
import ActiveRoutineView from '../../components/ActiveRoutineView';
import { observer } from 'mobx-react';

const HomeScreen = () => {
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
