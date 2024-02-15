import { makeAutoObservable } from 'mobx';
import { SessionWithExercises, TrainingDayWithExercises } from './Types';
import { get, mainClient, post, put, routeConfig } from '../services/api';

type LoadingState =
    | 'create-session'
    | 'end-session'
    | 'update-session'
    | 'get-sessions'
    | 'check-active-session';

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

    setCurrentSession = (session: SessionWithExercises | null) => {
        this.currentSession = session;
    };

    createSession = async (day_id: string) => {
        this.addLoadingState('create-session');
        const data = await post<SessionWithExercises>({
            client: mainClient,
            url: routeConfig.createSession(day_id),
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

    endSession = async (session_id: string) => {
        this.addLoadingState('end-session');
        const data = await put<string>({
            client: mainClient,
            url: routeConfig.endSession(session_id),
            onError: (error) => {
                console.log('error', error);
            },
            onResponse: (response) => {
                if (response.data) {
                    this.setCurrentSession(null);
                    return response.data;
                }
            },
        });
        this.removeLoadingState('end-session');
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
