import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    Dimensions,
} from 'react-native';
import { View, Text } from '../components/Themed';
import SearchInput from './common/SearchInput';
import Icon from './common/Icon';
import { Exercise } from '../store/Types';
import ExerciseListItem from './ExerciseListItemSelected';
import Sizing from '../constants/Sizing';
import { useState } from 'react';
import Animated from 'react-native-reanimated';

type ExerciseSearchProps = {
    closeModal: () => void;
    addExercise: (exercise: Exercise) => void;
    setInputValue: (value: string) => void;
    inputValue: string;
    isLoading: boolean;
    exerciseList: Exercise[];
};

const ExerciseSearchModalContent = ({
    closeModal,
    addExercise,
    setInputValue,
    inputValue,
    isLoading,
    exerciseList,
}: ExerciseSearchProps) => {
    const [windowDimensions, setWindowDimensions] = useState({
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    });
    return (
        <>
            <View
                style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    width: '100%',
                    backgroundColor: 'transparent',
                }}
            >
                <Icon
                    name='close'
                    size={18}
                    onPress={closeModal}
                    color='black'
                />
            </View>

            <View
                style={{
                    backgroundColor: 'transparent',
                    width: '100%',
                    height: '100%',
                }}
            >
                <SearchInput
                    name={'exercise_name'}
                    label='Search for exercise'
                    placeholder='Bench press'
                    keyboardType='default'
                    onChange={(e) => {
                        setInputValue(e.nativeEvent.text);
                    }}
                    rules={{
                        required: 'Training day name is Required!',
                        maxLength: 25,
                        minLength: 2,
                    }}
                    // setFormError={setError}
                    value={inputValue}
                />
                <View
                    style={{
                        width: '100%',
                        height: windowDimensions.height * 0.78,
                        backgroundColor: 'transparent',
                        paddingVertical: Sizing.spacing['md'],
                    }}
                >
                    <Animated.ScrollView
                        contentContainerStyle={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                            paddingVertical: Sizing.spacing['md'],
                            gap: Sizing.spacing['md'],
                        }}
                    >
                        {isLoading && (
                            <ActivityIndicator size='large' color='black' />
                        )}
                        {!isLoading &&
                            exerciseList.length > 0 &&
                            exerciseList.map((item: Exercise) => {
                                return (
                                    <Pressable
                                        key={item.exercise_id}
                                        style={{
                                            width: '100%',
                                        }}
                                        onPress={() => {
                                            addExercise(item);
                                            closeModal();
                                        }}
                                    >
                                        <ExerciseListItem
                                            exercise={item}
                                            onRemove={() =>
                                                console.log('remove')
                                            }
                                        />
                                    </Pressable>
                                );
                            })}
                    </Animated.ScrollView>
                </View>
            </View>
        </>
    );
};

export default ExerciseSearchModalContent;
