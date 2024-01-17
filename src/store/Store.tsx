import { makeAutoObservable } from 'mobx';
import { makePersistable, configurePersistable } from 'mobx-persist-store';
import uuid from 'react-native-uuid';
import { get, mainClient, post, routeConfig } from '../services/api/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

configurePersistable({
    storage: AsyncStorage,
    stringify: true,
    debugMode: false,
});

type LoadingState =
    | 'create-routine'
    | 'activate-routine'
    | 'get-routines'
    | 'delete-routine'
    | 'get-active-routine'
    | 'get-training-days';

// import routines from '../../assets/data/routines.json';
import {
    RepsAndSets,
    Routine,
    Session,
    TrainingDay,
    BaseResponseType,
    RoutinesResponse,
    TrainingDaysResponse,
    CreateRoutinePayload,
} from './Types';

export class RoutineStore {
    loadingState: LoadingState[] = [];
    routinesList: Routine[] = [];
    activeRoutine: null | Routine = null;
    trainingDays: TrainingDay[] = [];
    currentTrainingDay: TrainingDay | null = null;
    currentSession: Session | null = null;

    constructor() {
        makeAutoObservable(this);
        makePersistable(this, {
            name: 'routine-store',
            properties: [
                'routinesList',
                'activeRoutine',
                'trainingDays',
                'currentTrainingDay',
                'currentSession',
            ],
        });
    }

    get isLoading() {
        return this.loadingState.length > 0;
    }

    isStateLoading = (state: LoadingState) => {
        return this.loadingState.includes(state);
    };

    setLoadingState = (state: LoadingState[]) => {
        this.loadingState = state;
    };

    addLoadingState = (state: LoadingState) => {
        if (!this.isStateLoading(state)) {
            this.setLoadingState([...this.loadingState, state]);
        }
    };

    removeLoadingState = (state: LoadingState) => {
        this.setLoadingState([...this.loadingState.filter((f) => f !== state)]);
    };

    setCurrentTrainingDay = (id: string) => {
        if (!this.activeRoutine) return;
        const currentTrainingDayIdx = this.trainingDays.findIndex(
            (item) => item.day_id === id
        );
        this.currentTrainingDay = this.trainingDays[currentTrainingDayIdx];
        return this.currentTrainingDay;
    };

    setExercisePerformance = (exerciseId: string, values: RepsAndSets[]) => {
        if (!this.currentTrainingDay) return;

        if (this.currentSession === null) this.createSession();

        const exerciseById = this.currentTrainingDay?.exercises.find(
            (item) => item.id === exerciseId
        );

        if (!exerciseById) {
            return console.log('Store Error::Exercise Not Found');
        }

        const performedExerciseIndex =
            this.currentSession?.performedExercises.findIndex(
                (item) => item.exerciseId === exerciseId
            );

        if (performedExerciseIndex !== -1) {
            if (!this.currentSession || performedExerciseIndex === -1) return;

            const currentPerformedExercises =
                this.currentSession.performedExercises[performedExerciseIndex];

            currentPerformedExercises.repsAndSets = values;
        } else {
            const performedExercise = {
                id: uuid.v4().toString(),
                exerciseId: exerciseById.id,
                exercise: exerciseById,
                repsAndSets: [...values],
            };

            this.currentSession?.performedExercises.push(performedExercise);
        }
    };

    saveSession = () => {
        if (!this.currentSession) {
            console.log('There is no session in Store');
            return;
        }
        this.currentTrainingDay?.history.push(this.currentSession);
        this.saveTraningDay();
    };

    saveTraningDay = () => {
        if (!this.currentTrainingDay) {
            console.log('There are no training days selected in Store');
            return;
        }
        if (!this.activeRoutine) {
            console.log('There no Routines selected in Store');
            return;
        }
        const trainingDayIndex = this.trainingPlan.findIndex((item) => {
            if (!this.currentTrainingDay) return;
            return item.id === this.currentTrainingDay.id;
        });
        this.trainingPlan[trainingDayIndex] = this.currentTrainingDay;
    };

    createSession = () => {
        const newSession = {
            id: uuid.v4().toString(),
            date: new Date(),
            performedExercises: [],
        };
        this.currentSession = newSession;
    };

    getCurrentSession = () => {
        return this.currentSession;
    };

    setRoutinesList = (routines: Routine[]) => {
        this.routinesList = routines;
    };
    // API Calls
    getRoutines = async () => {
        this.addLoadingState('get-routines');
        await get<BaseResponseType<RoutinesResponse>>({
            client: mainClient,
            url: routeConfig.getAllRoutines,
            onError: (error) => {
                console.log('Error', error);
            },
            onResponse: (response) => {
                if (response?.data) {
                    // @ts-ignore
                    this.setRoutinesList(response.data);
                }
            },
        });
        this.removeLoadingState('get-routines');
    };

    createRoutine = async (payload: CreateRoutinePayload) => {
        this.addLoadingState('create-routine');
        const data = await post<BaseResponseType<RoutinesResponse>>({
            client: mainClient,
            url: routeConfig.createRoutine,
            data: payload,
            onError: (error) => {
                console.log('Error', error);
                return null;
            },
            onResponse: (response) => {
                if (response?.data) {
                    // @ts-ignore
                    this.setactiveRoutine(response.data);
                }
                return response?.data;
            },
        });
        this.removeLoadingState('create-routine');
        return data;
    };

    setTrainingDays = (trainingDays: TrainingDay[]) => {
        this.trainingDays = trainingDays;
    };

    getTrainingDays = async (routine_id: string) => {
        if (!this.routinesList) return;
        this.addLoadingState('get-training-days');

        await get<BaseResponseType<TrainingDaysResponse>>({
            client: mainClient,
            url: routeConfig.getTrainingDaysByRoutineId(routine_id),
            onError: (error) => {
                console.log('Error', error);
            },
            onResponse: (response) => {
                if (response?.data) {
                    // @ts-ignore
                    this.setTrainingDays(response.data);
                }
            },
        });
        this.removeLoadingState('get-training-days');
    };

    setActiveRoutine = (routine: Routine) => {
        this.activeRoutine = routine;
    };

    // activateRoutine TODO: Implement this

    getActiveRoutine = () => {};
}
