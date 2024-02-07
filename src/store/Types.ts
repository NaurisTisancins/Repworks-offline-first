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
    day_name: string;
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

export type ExercisesResponse = Exercise[];

export type TrainingDayExercisesResponse = Exercise[];
