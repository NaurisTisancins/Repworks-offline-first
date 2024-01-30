import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { clamp } from 'react-native-redash';
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import { Exercise } from '../store/Types';
import {
    StyleSheet,
    Text,
    View,
    ViewStyle,
    Dimensions,
    Pressable,
    ActivityIndicator,
} from 'react-native';
import Icon from './common/Icon';
import Sizing from '../constants/Sizing';
import Colors from '../constants/Colors';
import { useStore } from '../store';

const ITEM_HEIGHT = 80;
const WIDTH_SCREEN = Dimensions.get('window').width;

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
            <Text style={{ color: 'white' }}>{tag}</Text>
        </View>
    ));
};

const ExerciseListItemSelected = ({
    exercise,
    onRemove,
}: ExerciseListItemProps) => {
    const { isStateLoading } = useStore();

    const swipeTranslateX = useSharedValue(0);
    const pressed = useSharedValue(false);
    const itemHeight = useSharedValue(ITEM_HEIGHT);
    const marginVertical = useSharedValue(0);
    const boundX = WIDTH_SCREEN;

    const pan = Gesture.Pan()
        .activateAfterLongPress(180)
        .onBegin(() => {
            pressed.value = true;
        })
        .onChange((event) => {
            swipeTranslateX.value = clamp(event.translationX, -86, 0);
        })
        .onFinalize(() => {
            if (swipeTranslateX.value > -86) {
                swipeTranslateX.value = withSpring(0);
            } else if (swipeTranslateX.value < -86) {
                swipeTranslateX.value = withTiming(-boundX, {
                    duration: 200,
                });
                // runOnJS(onRemoveExerceiseFromDay)(exercise.link_id);
            }

            pressed.value = false;
        });

    const transformStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: swipeTranslateX.value }],
    }));

    const opacityStyle = useAnimatedStyle(() => ({
        opacity: swipeTranslateX.value < -WIDTH_SCREEN * 0.7 ? 0 : 1,
    }));

    const itemHeightStyle = useAnimatedStyle(() => ({
        height: itemHeight.value,
        marginVertical: marginVertical.value,
    }));

    const isLoading = isStateLoading(
        'remove-exercise-from-training-day' ||
            'get-exercises-by-training-day-id'
    );

    return (
        <GestureDetector gesture={pan}>
            <Animated.View style={itemHeightStyle}>
                <Animated.View style={[styles.iconContainer, opacityStyle]}>
                    <Pressable
                        onPress={() => {
                            if (!exercise.link_id) return;
                            onRemove(exercise.link_id);
                        }}
                    >
                        <Icon name='trash' size={20} color='#FF165D' />
                    </Pressable>
                </Animated.View>
                <Animated.View style={[styles.fieldContainer, transformStyle]}>
                    <Text style={styles.title}>{exercise.exercise_name}</Text>
                    <View style={styles.tagSection}>{generateTag(tags)}</View>
                </Animated.View>
            </Animated.View>
        </GestureDetector>
    );
};

const styles = StyleSheet.create({
    container: {},
    title: {
        color: 'white',
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
    tag: {
        color: 'white',
        borderWidth: 1,
        padding: 3,
        borderRadius: 5,
        alignSelf: 'flex-start',
        borderColor: '#d62828',
        backgroundColor: '#d62828',
    },
    fieldContainer: {
        backgroundColor: Colors.dark['black'],
        justifyContent: 'center',
        // width: '100%',
        // haight: '100%',
        // height: 80,
        alignItems: 'flex-start',
        padding: Sizing.spacing['md'],
        borderRadius: Sizing.borderRadius['md'],
    },
    iconContainer: {
        position: 'absolute',
        height: 80,
        width: 80,
        borderRadius: Sizing.borderRadius['md'],
        backgroundColor: 'white',
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ExerciseListItemSelected;
