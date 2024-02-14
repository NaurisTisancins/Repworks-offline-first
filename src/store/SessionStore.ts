import { makeAutoObservable } from 'mobx';
import {
    BaseResponseType,
    SessionWithExercises,
    TrainingDayWithExercises,
} from './Types';
import { get, mainClient, post, routeConfig } from '../services/api';

type LoadingState =
    | 'create-session'
    | 'delete-session'
    | 'update-session'
    | 'get-sessions'
    | 'check-active-session';

type Session = {
    session_id: string;
    day_id: string;
    start_time: string;
    end_time: string;
    notes: string;
    exercises: SessionExercise[];
};

type Set = {
    set_id: string;
    exercise_id: string;
    reps: number;
    weight: number;
    notes: string;
};

type SessionExercise = {
    session_id: string;
    exercise_id: string;
    sets: Set[];
    weight: number;
    notes: string;
};

export class SessionStore {
    loadingState: LoadingState[] = [];
    sessions: SessionWithExercises[] = [];
    currentSession: SessionWithExercises | null = null;

    constructor() {
        makeAutoObservable(this);
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

    setSessions = (sessions: SessionWithExercises[]) => {
        this.sessions = sessions;
    };

    setCurrentSession = (session: SessionWithExercises) => {
        this.currentSession = session;
    };

    createSession = async (trainingDay: TrainingDayWithExercises) => {
        this.addLoadingState('create-session');
        const data = await post<SessionWithExercises>({
            client: mainClient,
            url: routeConfig.createSession,
            data: {
                day_id: trainingDay.day_id,
                day_name: trainingDay.day_name,
            },
            onError: (error) => {
                console.log('error', error);
            },
            onResponse: (response) => {
                if (response.data) {
                    this.setCurrentSession(response.data);
                }
            },
        });
        this.removeLoadingState('create-session');
        return data;
    };

    checkIfSessionInProgress = async (routine_id: string) => {
        this.addLoadingState('check-active-session');
        const data = await get<SessionWithExercises>({
            client: mainClient,
            url: routeConfig.checkSessionInProgress(routine_id),
            onError: (error) => {
                console.log('error', error);
            },
            onResponse: (response) => {
                if (response.data === null) {
                    return;
                }
                if (response.data) {
                    this.setCurrentSession(response.data);
                }
            },
        });

        this.removeLoadingState('check-active-session');
        return data;
    };
}
