import { StyleSheet, View, Text, ScrollView } from 'react-native';
import RoutineView from './RoutineListItem';
import { useStore } from '../store/index';
import { observer } from 'mobx-react';
import { useEffect } from 'react';

import Colors from '../constants/Colors';

const RoutineList = () => {
    const {
        RoutineStore: { routinesList, getRoutines },
    } = useStore();

    const getRoutinesList = async () => {
        await getRoutines();
    };

    useEffect(() => {
        getRoutinesList();
    }, []);

    return (
        <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            style={{
                flex: -1,
                display: 'flex',
                gap: 12,
            }}
        >
            <View style={styles.container}>
                {routinesList.map((item) => {
                    return <RoutineView key={item.routine_id} routine={item} />;
                })}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.dark['background'],
        height: '100%',
        gap: 12,
    },
});

export default observer(RoutineList);
