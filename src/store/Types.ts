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
};

export interface TrainingDay {
    day_id: string;
    day_name: string;
    // exercises: Exercise[];
    // history: Session[];
}

export interface Exercise {
    exercise_id: string;
    name: string;
}

export interface Session {
    id: string;
    date: Date;
    performedExercises: PerformedExercise[];
}

export interface PerformedExercise {
    id: string;
    exerciseId: string;
    exercise: Exercise;
    repsAndSets: RepsAndSets[] | [];
}

export interface RepsAndSets {
    id: string;
    weight: string;
    reps: string;
}

// responses
export type BaseResponseType<T = {}> = {
    error?: any;
    data: T;
};

export type RoutinesResponse = Routine[];

export type RoutineResponse = Routine;

export type TrainingDaysResponse = TrainingDay[];
