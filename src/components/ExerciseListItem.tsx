import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import { Exercise } from '../store/Types';
import { StyleSheet, Text, View, ViewStyle, Dimensions } from 'react-native';

const ITEM_HEIGHT = 30;
const WIDTH_SCREEN = Dimensions.get('window').width;

const SHADOW = {
    shadowColor: 'black',
    shadowOffset: {
        width: 0,
        height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
};

type ExerciseListItemProps = {
    exercise: Exercise;
    onRemove?: (id: string) => void;
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

const ExerciseListItem = ({ exercise, onRemove }: ExerciseListItemProps) => {
    const swipeTranslateX = useSharedValue(0);
    const pressed = useSharedValue(false);
    const itemHeight = useSharedValue(ITEM_HEIGHT);
    const marginVertical = useSharedValue(20);

    function onRemoveExerceise(exerciseId: string) {
        // console.log(exerciseId);
    }

    const pan = Gesture.Pan()
        .onBegin(() => {
            pressed.value = true;
        })
        .onChange((event) => {
            if (event.translationX < 0) {
                swipeTranslateX.value = event.translationX;
            }
        })
        .onFinalize(() => {
            const isShouldDismiss = swipeTranslateX.value < -WIDTH_SCREEN * 0.3;
            if (isShouldDismiss) {
                itemHeight.value = withTiming(0);
                marginVertical.value = withTiming(0);
                swipeTranslateX.value = withTiming(
                    -WIDTH_SCREEN,
                    undefined,
                    (isDone) => {
                        if (isDone && exercise.link_id) {
                            runOnJS(onRemoveExerceise)(exercise.exercise_id);
                        }
                    }
                );
            } else {
                swipeTranslateX.value = withSpring(0);
            }
            pressed.value = false;
        });
    return (
        <GestureDetector gesture={pan}>
            <View style={styles.container}>
                <Text style={styles.title}>{exercise.exercise_name}</Text>
                <View style={styles.tagSection}>{generateTag(tags)}</View>
            </View>
        </GestureDetector>
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
