import { StyleSheet } from 'react-native';
import { View, Text } from '../components/Themed';
import RoutineView from './RoutineListItem';
import { useStore } from '../store/index';
import { observer } from 'mobx-react';
import axios from 'axios';
import { useEffect, useState } from 'react';

const RoutineList = () => {
    const { routinesList, selectedRoutine } = useStore();
    const [response, setResponse] = useState(null);

    async function getUsers() {
        if (process.env.EXPO_PUBLIC_API_URL) {
            try {
                const response = await axios.get(
                    process.env.EXPO_PUBLIC_API_URL
                );
                const data = await response.data;
                if (data) {
                    console.log(data);
                    setResponse(data);
                }
            } catch (e) {
                console.error(e);
            }
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.test}>{JSON.stringify(response, null, 2)}</Text>
            {routinesList
                .filter((routine) => {
                    if (selectedRoutine) {
                        return routine.id !== selectedRoutine.id;
                    }
                    return routine;
                })
                .map((item) => {
                    return <RoutineView key={item.id} routine={item} />;
                })}
        </View>
    );
};

const styles = StyleSheet.create({
    test: {
        color: 'red',
    },

    container: {
        backgroundColor: 'black',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
    },
});

export default observer(RoutineList);
