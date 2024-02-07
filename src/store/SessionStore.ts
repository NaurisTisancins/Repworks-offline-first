import { makeAutoObservable } from 'mobx';

type LoadingState =
    | 'create-session'
    | 'delete-session'
    | 'update-session'
    | 'get-sessions';

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
    sessions: Session[] = [];

    constructor() {
        makeAutoObservable(this);
    }
}
