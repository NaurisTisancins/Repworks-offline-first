export const routeConfig = {
    getAllRoutines: '/routines',
    getActiveRoutines: '/routines/active',
    createRoutine: '/routines',
    updateRoutine: '/routines',
    deleteRoutineById: (routineId: string) => `/routines/${routineId}`,

    getTrainingDaysByRoutineId: (routineId: string) =>
        `/training_days/${routineId}`,
    getTrainingDaysWithExercisesByRoutineId: (routineId: string) =>
        `/training_days/with_exercises/${routineId}`,
    createTrainingDays: `/training_days`,
    createTrainingDay: (routineId: string) => `/training_days/${routineId}`,

    getAllExercises: '/exercises',
    createExercise: '/exercises',
    searchExercises: (searchTerm: string) =>
        `/exercises/search?name=${encodeURIComponent(searchTerm)}`,
    addExerciseToTrainingDay: (excerciseId: string, trainingDayId: string) =>
        `/exercises/${excerciseId}/${trainingDayId}`,
    getExercisesByTrainingDayId: (trainingDayId: string) =>
        `/exercises/${trainingDayId}`,
    removeExerciseFromTrainingDay: (link_id: string) => `/exercises/${link_id}`,

    createSession: `/session`,
    checkSessionInProgress: (routine_id: string) =>
        `/session/in_progress/${routine_id}`,
};
