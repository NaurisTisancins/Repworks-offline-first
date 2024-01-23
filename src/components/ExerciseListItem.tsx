import { Exercise } from '../store/Types';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';

type ExerciseListItemProps = {
    exercise: Exercise;
};

const tags = ['Upper', 'Lower', 'Push', 'Pull', 'Core'];

const generateTag = (tags: string[]) => {
    const tagColor = (tag: string) => {
        switch (tag) {
            case 'Upper':
                return '#d62828';
            case 'Lower':
                return '#f77f00';
            case 'Push':
                return '#fcbf49';
            case 'Pull':
                return '#eae2b7';
            case 'Core':
                return '#9d0208';
            default:
                return '#d62828';
        }
    };

    const tagStyle = (tag: string): ViewStyle => {
        return {
            borderWidth: 1,
            padding: 3,
            borderRadius: 5,
            alignSelf: 'flex-start',
            borderColor: tagColor(tag),
            backgroundColor: tagColor(tag),
        };
    };

    return tags.map((tag) => (
        <View key={tag} style={tagStyle(tag)}>
            <Text style={{ color: 'white' }}>{tag}</Text>
        </View>
    ));
};

const ExerciseListItem = ({ exercise }: ExerciseListItemProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{exercise.exercise_name}</Text>
            <View style={styles.tagSection}>{generateTag(tags)}</View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        gap: 10,
    },
    title: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
    tagSection: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 10,
    },
    tag: {
        color: 'white',
        borderWidth: 1,
        padding: 3,
        borderRadius: 5,
        alignSelf: 'flex-start',
        borderColor: '#d62828',
        backgroundColor: '#d62828',
    },
});

export default ExerciseListItem;
