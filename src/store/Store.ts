import { configurePersistable } from 'mobx-persist-store';
import { RoutineStore } from './RoutineStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SessionStore } from './SessionStore';

configurePersistable({
    storage: AsyncStorage,
    stringify: true,
    debugMode: false,
});

export default class Store {
    RoutineStore: RoutineStore;
    SessionStore: SessionStore;

    constructor() {
        this.RoutineStore = new RoutineStore();
        this.SessionStore = new SessionStore();
    }
}
