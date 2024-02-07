import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    FlatList,
    Alert,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const todoList = [
    {
        id: '1',
        text: 'Go to the grocery store',
        completed: false,
    },
    {
        id: '2',
        text: 'Do the laundry',
        completed: false,
    },
    {
        id: '3',
        text: 'Clean the house',
        completed: false,
    },
];
const Separator = () => <View style={styles.itemSeparator} />;

const RightSwipeActions = () => {
    return (
        <TouchableOpacity
            onPress={() => {
                Alert.alert('Delete');
            }}
            style={{
                backgroundColor: '#ff0000',
                justifyContent: 'center',
                alignItems: 'flex-end',
                height: '100%',
            }}
        >
            <Text
                style={{
                    color: '#1b1a17',
                    fontWeight: '600',
                    paddingHorizontal: 30,
                    paddingVertical: 20,
                }}
            >
                Delete
            </Text>
        </TouchableOpacity>
    );
};

const ListItem = ({ text }: { text: string }) => (
    <Swipeable
        renderRightActions={RightSwipeActions}
        leftThreshold={Infinity}
        onSwipeableOpen={(direction) => {
            if (direction === 'right') {
                // Swiped from right
            } else if (direction === 'left') {
                // Swiped from left
            }
        }}
    >
        <View
            style={{
                paddingHorizontal: 30,
                paddingVertical: 20,
                backgroundColor: 'white',
            }}
        >
            <Text style={{ fontSize: 24 }}>{text}</Text>
        </View>
    </Swipeable>
);

const SwipeGesture = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={{ textAlign: 'center', marginVertical: 20 }}>
                Swipe right or left
            </Text>
            <FlatList
                data={todoList}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <ListItem {...item} />}
                ItemSeparatorComponent={() => <Separator />}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemSeparator: {
        flex: 1,
        height: 1,
        backgroundColor: '#444',
    },
});

export default SwipeGesture;
