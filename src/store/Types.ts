// data types
export interface Routine {
    routine_id: string;
    name: string;
    description: string;
    is_active: boolean;
    // trainingPlan: TrainingDay[];
}

export type CreateRoutinePayload = {
    name: string;
    description: string;
    is_active: boolean;
};

export interface TrainingDay {
    day_id?: string;
    routine_id: string;
    day_name: string;
    created_at: string;
    updated_at: string;
}

export type TrainingDayWithExercises = TrainingDay & {
    exercises: Exercise[] | [];
};

export type CreateTrainingDaysPayload = {
    routine_id: string;
    day_name: string;
};

export type CreateTrainingDayPayload = {
    day_name: string;
};

export interface Exercise {
    link_id?: string;
    exercise_id: string;
    exercise_name: string;
}

export interface Session {
    session_id: string;
    day_id: string;
    in_progress: boolean;
    created_at: string;
    updated_at: string;
}

export type SessionWithExercises = {
    session_id: string;
    day_id: string;
    day_name: string;
    in_progress: boolean;
    exercises: Exercise[];
    created_at: string;
    updated_at: string;
};

export type SessionWithPerformance = {
    session_id: string;
    day_id: string;
    day_name: string;
    in_progress: boolean;
    exercises: Exercise[];
    performance: Performance[];
    created_at: string;
    updated_at: string;
};

export type Performance = {
    session_id: string;
    exercise_id: string;
    exercise_name: string;
    sets: SetPerformance[] | [];
    created_at: string;
    updated_at: string;
};

export type SetPerformance = {
    performance_id?: string;
    weight: number;
    reps: number;
    set_number: number;
    rir: number;
    created_at?: string | null;
    updated_at?: string | null;
};

export type SetPerformancePayload = {
    set_number: number;
    weight: number;
    reps: number;
    rir: number;
};

// responses
export type BaseResponseType<T = {}> = {
    error?: any;
    data: T;
};

export type RoutinesResponse = Routine[];

export type RoutineResponse = Routine;

export type TrainingDaysResponse = TrainingDay[];

export type ExercisesResponse = Exercise[];

export type TrainingDayExercisesResponse = Exercise[];
