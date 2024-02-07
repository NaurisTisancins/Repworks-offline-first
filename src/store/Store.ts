import { configurePersistable } from 'mobx-persist-store';
import { RoutineStore } from './RoutineStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

configurePersistable({
    storage: AsyncStorage,
    stringify: true,
    debugMode: false,
});

export default class Store {
    RoutineStore: RoutineStore;

    constructor() {
        this.RoutineStore = new RoutineStore();
    }
}
