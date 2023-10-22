import { View, StyleSheet, Dimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import FormField from './FormField';
import { RepsAndSets } from '../../Types';
import { FontAwesome5 } from '@expo/vector-icons';

// const WIDTH_CARD = Dimensions.get('window').width - 20;
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

type FormFieldArrayProps = {
  set: RepsAndSets;
  values: RepsAndSets[];
  index: number;
  setFieldArrayValue: (
    index: number,
    value: string,
    fieldName: 'weight' | 'reps'
  ) => void;
  onRemoveSet: (id: string) => void;
};

function FormFieldArray({
  set,
  values,
  index,
  setFieldArrayValue,
  onRemoveSet,
}: FormFieldArrayProps) {
  const swipeTranslateX = useSharedValue(0);
  const pressed = useSharedValue(false);
  const itemHeight = useSharedValue(ITEM_HEIGHT);
  const marginVertical = useSharedValue(20);

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
            if (isDone) {
              runOnJS(onRemoveSet)(set.id);
            }
          }
        );
      } else {
        swipeTranslateX.value = withSpring(0);
      }
      pressed.value = false;
    });

  const transformStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: swipeTranslateX.value },
      { scale: withTiming(pressed.value ? 1.15 : 1) },
    ],
  }));

  const opacityStyle = useAnimatedStyle(() => ({
    opacity: swipeTranslateX.value < -WIDTH_SCREEN * 0.7 ? 0 : 1,
  }));

  const itemHeightStyle = useAnimatedStyle(() => ({
    height: itemHeight.value,
    marginVertical: marginVertical.value,
  }));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={itemHeightStyle}>
        <Animated.View style={[styles.iconContainer, opacityStyle]}>
          <FontAwesome5 name='trash' size={20} color='#FF165D' />
        </Animated.View>
        <Animated.View style={[styles.fieldContainer, transformStyle]}>
          <View key={set.id} style={styles.inputContainer}>
            <FormField
              fieldName={`values[$index].weight`}
              label='Weight'
              onChangeText={(e) => setFieldArrayValue(index, e, 'weight')}
              value={values[index].weight}
            />
            <FormField
              fieldName={`values[$index].reps`}
              label='Reps'
              onChangeText={(e) => setFieldArrayValue(index, e, 'reps')}
              value={values[index].reps}
            />
          </View>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 10,
    gap: 10,
  },
  fieldContainer: {
    justifyContent: 'center',
    width: '100%',
    height: 40,
    alignItems: 'center',
  },
  iconContainer: {
    position: 'absolute',
    height: 40,
    right: '10%',
    justifyContent: 'center',
  },
});

export default FormFieldArray;
