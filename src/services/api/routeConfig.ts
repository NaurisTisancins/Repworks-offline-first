export const routeConfig = {
    getAllRoutines: '/routines',
    getActiveRoutine: '/routines/active',
    createRoutine: '/routines',
    deleteRoutineById: (routineId: string) => `/routines/${routineId}`,

    getTrainingDaysByRoutineId: (routineId: string) =>
        `/training_days/${routineId}`,
    createTrainingDay: '/training_days',

    getAllExercises: '/exercises',
    createExercise: '/exercises',
};
