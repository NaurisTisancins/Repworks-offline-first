import { makeAutoObservable } from 'mobx';
import {
    makePersistable,
    stopPersisting,
    clearPersistedStore,
} from 'mobx-persist-store';
import uuid from 'react-native-uuid';
import {
    get,
    mainClient,
    post,
    routeConfig,
    remove,
    put,
} from '../services/api/index';
import {
    Routine,
    RoutinesResponse,
    CreateRoutinePayload,
    CreateTrainingDaysPayload,
    Exercise,
    ExercisesResponse,
    TrainingDayWithExercises,
    RoutineResponse,
} from './Types';
import { AxiosError } from 'axios';

type LoadingState =
    | 'create-routine'
    | 'activate-routine'
    | 'update-routine'
    | 'get-routines'
    | 'delete-routine'
    | 'get-active-routines'
    | 'get-training-days'
    | 'create-training-days'
    | 'create-training-day'
    | 'searching-exercises'
    | 'add-exercise-to-training-day'
    | 'get-exercises-by-training-day-id'
    | 'remove-exercise-from-training-day';

export class RoutineStore {
    loadingState: LoadingState[] = [];

    routinesList: Routine[] = [];

    activeRoutines: Routine[] = [];
    selectedRoutine: null | Routine = null;

    exerciseList: Exercise[] = [];

    trainingDays: TrainingDayWithExercises[] = [];

    currentTrainingDay: TrainingDayWithExercises | null = null;

    constructor() {
        makeAutoObservable(this);
        // makePersistable(this, {
        //     name: 'routine-store',
        //     properties: [
        //         'routinesList',
        //         'activeRoutines',
        //         'selectedRoutine',
        //         'exerciseList',
        //         'trainingDays',
        //         'currentTrainingDay',
        //         'currentSession',
        //     ],
        // });
    }

    async stopPersistingStore() {
        stopPersisting('routine-store');
    }

    async clearStoredData() {
        await clearPersistedStore(this);
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

    setCurrentTrainingDay = (day_id: string) => {
        if (!this.selectedRoutine) return;
        const currentTrainingDayIdx = this.trainingDays.findIndex(
            (item) => item.day_id === day_id
        );
        this.currentTrainingDay = this.trainingDays[currentTrainingDayIdx];
        return this.currentTrainingDay;
    };

    setRoutinesList = (routines: Routine[]) => {
        this.routinesList = routines;
    };
    // API Calls
    getRoutines = async () => {
        this.addLoadingState('get-routines');
        await get<RoutinesResponse>({
            client: mainClient,
            url: routeConfig.getAllRoutines,
            onError: (error) => {
                console.log('Error', error);
            },
            onResponse: (response) => {
                if (response?.data) {
                    this.setRoutinesList(response.data);
                }
            },
        });
        this.removeLoadingState('get-routines');
    };

    getActiveRoutines = async () => {
        this.setActiveRoutines([]);
        this.addLoadingState('get-active-routines');
        await get<RoutinesResponse>({
            client: mainClient,
            url: routeConfig.getActiveRoutines,
            onError: (error) => {
                console.log('Error', error);
                console.log('Error', error.config);
            },
            onResponse: (response) => {
                if (response?.data) {
                    this.setActiveRoutines(response.data);
                }
            },
        });
        this.removeLoadingState('get-active-routines');
    };

    setSelectedRoutine = (routine: Routine | null) => {
        this.selectedRoutine = routine;
        this.trainingDays = [];
    };

    setSelectedRoutineById = async (routine_id: string) => {
        if (!this.routinesList) await this.getRoutines();
        const routine = this.routinesList.find(
            (item) => item.routine_id === routine_id
        );
        if (routine) {
            this.setSelectedRoutine(routine);
        }
        this.selectedRoutine &&
            this.selectedRoutine.routine_id &&
            (await this.getTrainingDaysWithExercises(
                this.selectedRoutine.routine_id
            ));
    };

    createRoutine = async (payload: CreateRoutinePayload) => {
        this.addLoadingState('create-routine');
        const data = await post<RoutineResponse>({
            client: mainClient,
            url: routeConfig.createRoutine,
            data: payload,
            onError: (error) => {
                console.log('Error', error);
                return null;
            },
            onResponse: (response) => {
                if (response?.data) {
                    this.setSelectedRoutine(response.data);
                }
                return response?.data;
            },
        });
        this.removeLoadingState('create-routine');
        return data;
    };

    // deleteRoutineById = async (routine_id: string) => {
    //     this.addLoadingState('delete-routine');
    //     const deletedRoutineId = await post<BaseResponseType<string>>({
    //         client: mainClient,
    //         url: routeConfig.deleteRoutineById(routine_id),
    //         onError: (error) => {
    //             console.log('Error', error);
    //         },
    //         onResponse: (response) => {
    //             if (response?.data) {
    //                 // @ts-ignore
    //                 this.setSelectedRoutine(null);
    //             }
    //         },
    //     });
    //     this.removeLoadingState('delete-routine');
    //     return deletedRoutineId;
    // };

    updateRoutine = async (payload: Routine) => {
        this.addLoadingState('update-routine');
        const data = await put<RoutineResponse>({
            client: mainClient,
            url: routeConfig.updateRoutine,
            data: payload,
            onError: (error) => {
                console.log('Error', error);
            },
            onResponse: (response) => {
                if (response?.data) {
                    this.setSelectedRoutine(response.data);
                }
                return response?.data;
            },
        });
        this.removeLoadingState('update-routine');
        return data;
    };

    setTrainingDays = (trainingDays: TrainingDayWithExercises[]) => {
        this.trainingDays = trainingDays;
    };

    // getTrainingDays = async (routine_id: string) => {
    //     if (!this.selectedRoutine) return;
    //     this.addLoadingState('get-training-days');

    //     await get<TrainingDayWithExercises[]>({
    //         client: mainClient,
    //         url: routeConfig.getTrainingDaysByRoutineId(routine_id),
    //         onError: (error) => {
    //             console.log('Error', error);
    //         },
    //         onResponse: (response) => {
    //             if (response?.data) {
    //                 this.setTrainingDays(response.data);
    //             }
    //         },
    //     });

    //     this.removeLoadingState('get-training-days');
    // };

    getTrainingDaysWithExercises = async (routine_id: string) => {
        this.addLoadingState('get-training-days');
        const data = await get<TrainingDayWithExercises[]>({
            client: mainClient,
            url: routeConfig.getTrainingDaysWithExercisesByRoutineId(
                routine_id
            ),
            onError: (error) => {
                console.log('Error', error);
            },
            onResponse: (response) => {
                if (response?.data) {
                    this.setTrainingDays(response.data);
                }
            },
        });
        this.removeLoadingState('get-training-days');
        return data;
    };

    createTrainingDays = async (payload: CreateTrainingDaysPayload[]) => {
        this.addLoadingState('create-training-days');
        const data = await post<TrainingDayWithExercises[]>({
            client: mainClient,
            url: routeConfig.createTrainingDays,
            data: payload,
            onError: (error) => {
                console.log('Error', error);
            },
            onResponse: (response) => {
                if (response?.data) {
                    this.setTrainingDays(response.data);
                }
            },
        });
        this.removeLoadingState('create-training-days');
        return data;
    };

    appendTrainingDay = (trainingDay: TrainingDayWithExercises) => {
        this.trainingDays = [...this.trainingDays, trainingDay];
    };

    createTrainingDay = async (routine_id: string, payload: string) => {
        this.addLoadingState('create-training-day');
        const data = await post<TrainingDayWithExercises>({
            client: mainClient,
            url: routeConfig.createTrainingDay(routine_id),
            data: {
                routine_id,
                day_name: payload,
            },
            onError: (error) => {
                console.log('Error', error);
            },
            onResponse: (response) => {
                if (response?.data) {
                    this.appendTrainingDay(response.data);
                }
            },
        });
        this.removeLoadingState('create-training-day');
        return data;
    };

    setActiveRoutines = (routines: Routine[]) => {
        this.activeRoutines = [...routines];
    };

    // activateRoutine TODO: Implement this

    getExercises = async () => {
        await get({
            client: mainClient,
            url: routeConfig.getAllExercises,
            onError: (error) => {
                console.log('Error', error);
            },
            onResponse: (response) => {
                // console.log(response);
            },
        });
    };

    setExerciseList = (exercises: Exercise[]) => {
        this.exerciseList = exercises;
    };

    searchExercises = async (searchTerm: string) => {
        this.addLoadingState('searching-exercises');

        const exercises = await get<ExercisesResponse>({
            client: mainClient,
            url: routeConfig.searchExercises(searchTerm),
            onError: (error) => {
                console.log('Error', error);
            },
            onResponse: (response) => {
                if (response?.data) {
                    this.setExerciseList(response.data);
                }
            },
        });

        this.removeLoadingState('searching-exercises');
        return exercises;
    };

    addExerciseToTrainingDay = async (
        exercise_id: string,
        training_day_id: string
    ) => {
        this.addLoadingState('add-exercise-to-training-day');
        const data = await post<Exercise>({
            client: mainClient,
            url: routeConfig.addExerciseToTrainingDay(
                exercise_id,
                training_day_id
            ),
            onError: (error) => {
                if (error instanceof AxiosError) {
                    console.log(error.cause);
                }
                console.log('Error', error);
            },
            onResponse: (response) => {
                if (response?.data) {
                    return response.data;
                }
            },
        });
        this.removeLoadingState('add-exercise-to-training-day');
        return data;
    };

    saveExercisesToTrainingDay = (exercises: Exercise[], day_id: string) => {
        const trainingDayIndex = this.trainingDays.findIndex(
            (item) => item.day_id === day_id
        );
        this.trainingDays[trainingDayIndex].exercises = exercises;
    };

    getExercisesByTrainingDayId = async (training_day_id: string) => {
        this.addLoadingState('get-exercises-by-training-day-id');
        const data = await get<Exercise[]>({
            client: mainClient,
            url: routeConfig.getExercisesByTrainingDayId(training_day_id),
            onError: (error) => {
                console.log('Error', error);
            },
            onResponse: (response) => {
                if (response?.data) {
                    this.saveExercisesToTrainingDay(
                        response.data,
                        training_day_id
                    );
                    return response;
                }
            },
        });

        this.removeLoadingState('get-exercises-by-training-day-id');
        return data;
    };

    removeExerciseFromTrainingDay = async (link_id: string) => {
        this.addLoadingState('remove-exercise-from-training-day');
        const data = await remove<Exercise>({
            client: mainClient,
            url: routeConfig.removeExerciseFromTrainingDay(link_id),
            onError: (error) => {
                if (error instanceof AxiosError) {
                    console.log(error.cause);
                }
                console.log('Error', error);
            },
            onResponse: (response) => {
                if (response?.data) {
                    return response.data;
                }
            },
        });
        this.removeLoadingState('remove-exercise-from-training-day');
        return data;
    };
}
