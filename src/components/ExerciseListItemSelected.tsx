import { Swipeable } from 'react-native-gesture-handler';
import { Exercise } from '../store/Types';
import {
    StyleSheet,
    Text,
    View,
    ViewStyle,
    Pressable,
    ActivityIndicator,
} from 'react-native';
import Icon from './common/Icon';
import Sizing from '../constants/Sizing';
import Colors from '../constants/Colors';
import { useStore } from '../store';

type ExerciseListItemProps = {
    exercise: Exercise;
    onRemove: (id: string) => void;
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
            <Text style={{ color: Colors.dark.grayCool[200] }}>{tag}</Text>
        </View>
    ));
};

const RightSwipeActions = ({
    exercise,
    onRemove,
    isLoading,
}: {
    exercise: Exercise;
    onRemove: (id: string) => void;
    isLoading: boolean;
}) => {
    return (
        <Pressable
            onPress={() => {
                if (!exercise.link_id) return;
                onRemove(exercise.link_id);
            }}
        >
            <View style={[styles.iconContainer]}>
                {isLoading ? (
                    <ActivityIndicator />
                ) : (
                    <Icon name='trash' size={20} color='#FF165D' />
                )}
            </View>
        </Pressable>
    );
};

const ExerciseListItemSelected = ({
    exercise,
    onRemove,
}: ExerciseListItemProps) => {
    const {
        RoutineStore: { isStateLoading },
    } = useStore();

    const isLoading = isStateLoading(
        'remove-exercise-from-training-day' ||
            'get-exercises-by-training-day-id'
    );

    return (
        <Swipeable
            renderRightActions={() => {
                return (
                    <RightSwipeActions
                        exercise={exercise}
                        onRemove={onRemove}
                        isLoading={isLoading}
                    />
                );
            }}
            leftThreshold={Infinity}
            onSwipeableOpen={(direction) => {
                if (direction === 'right') {
                    // Swiped from right
                } else if (direction === 'left') {
                    // Swiped from left
                }
            }}
        >
            <View style={[styles.fieldContainer]}>
                <Text style={styles.title}>{exercise.exercise_name}</Text>
                <View style={styles.tagSection}>{generateTag(tags)}</View>
            </View>
        </Swipeable>
    );
};

const styles = StyleSheet.create({
    title: {
        color: Colors.dark.grayCool[200],
        fontSize: Sizing.fontSize['md'],
        fontWeight: '600',
        paddingBottom: Sizing.spacing['sm'],
    },
    tagSection: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 10,
    },
    fieldContainer: {
        backgroundColor: Colors.dark['black'],
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: Sizing.spacing['md'],
        borderRadius: Sizing.borderRadius['md'],
    },
    iconContainer: {
        borderRadius: Sizing.borderRadius['md'],
        backgroundColor: 'white',
        width: 80,
        height: 80,
        marginLeft: Sizing.spacing['md'],
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ExerciseListItemSelected;
