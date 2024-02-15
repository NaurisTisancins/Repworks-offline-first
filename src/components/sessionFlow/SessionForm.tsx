import { StyleSheet } from 'react-native';

import { View, Text } from '../Themed';
import { SessionWithExercises } from '../../store/Types';
import Colors from '../../constants/Colors';
import { SetAndRepInputRow } from './SetAndRepInputRow';
import Sizing from '../../constants/Sizing';

type SessionFormProps = {
    session: SessionWithExercises;
};

export const SessionForm = ({ session }: SessionFormProps) => {
    return (
        <View style={styles.formContainer}>
            <View style={styles.headerContainer}>
                <View style={styles.titleChip}>
                    <Text style={styles.title}>{session.day_name}</Text>
                </View>
            </View>
            <View style={{ gap: Sizing.spacing.md }}>
                <SetAndRepInputRow />
                <SetAndRepInputRow />
                <SetAndRepInputRow />
                <SetAndRepInputRow />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    formContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.dark.background[200],
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: 'transparent',
        paddingBottom: Sizing.spacing['md'],
    },
    titleChip: {
        backgroundColor: Colors.dark.grayWarm[300],
        ...Colors.dark.shadows.light.elevation1,
        alignItems: 'flex-start',
        borderRadius: Sizing.borderRadius['sm'],
        paddingHorizontal: Sizing.spacing['sm'],
        paddingVertical: Sizing.spacing['sm'],
        textAlign: 'baseline',
        opacity: 0.7,
    },
    title: {
        fontSize: Sizing.fontSize['md'],
        fontWeight: '600',
        alignContent: 'center',
        color: Colors.dark.grayWarm[900],
    },
});
