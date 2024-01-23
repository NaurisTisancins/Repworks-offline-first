import { ActivityIndicator, Pressable, ScrollView, View } from 'react-native';
import SearchInput from './common/SearchInput';
import Icon from './common/Icon';
import { Exercise } from '../store/Types';
import ExerciseListItem from './ExerciseListItem';

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
    return (
        <>
            <View
                style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    width: '100%',
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
                        console.log(e.nativeEvent.text);
                    }}
                    rules={{
                        required: 'Training day name is Required!',
                        maxLength: 25,
                        minLength: 2,
                    }}
                    // setFormError={setError}
                    value={inputValue}
                />

                <ScrollView
                    contentContainerStyle={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        width: '100%',
                        height: '100%',
                        // backgroundColor: 'lightgray',
                        // borderRadius: 20,
                        paddingHorizontal: 10,
                        paddingVertical: 20,
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
                                    <ExerciseListItem exercise={item} />
                                </Pressable>
                            );
                        })}
                </ScrollView>
            </View>
        </>
    );
};

export default ExerciseSearchModalContent;
