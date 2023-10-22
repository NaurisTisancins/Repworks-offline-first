import { makeAutoObservable } from 'mobx';
import uuid from 'react-native-uuid';

import routines from '../../assets/data/routines.json';
import { RepsAndSets, Routine, Session, TrainingDay } from '../Types';

export class RoutineStore {
  routinesList: Routine[] = routines;
  selectedRoutine: null | Routine = null;
  currentTrainingDay: TrainingDay | null = null;
  currentSession: Session | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setSelectedRoutine = (id: string) => {
    const selectedRoutineIdx = this.routinesList.findIndex(
      (item) => item.id === id
    );
    this.selectedRoutine = this.routinesList[selectedRoutineIdx];
    return this.selectedRoutine;
  };

  setCurrentTrainingDay = (id: string) => {
    if (!this.selectedRoutine) return;
    const currentTrainingDayIdx = this.selectedRoutine.trainingPlan.findIndex(
      (item) => item.id === id
    );
    this.currentTrainingDay =
      this.selectedRoutine.trainingPlan[currentTrainingDayIdx];
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
    if (!this.selectedRoutine) {
      console.log('There no Routines selected in Store');
      return;
    }
    const trainingDayIndex = this.selectedRoutine.trainingPlan.findIndex(
      (item) => {
        if (!this.currentTrainingDay) return;
        return item.id === this.currentTrainingDay.id;
      }
    );
    this.selectedRoutine.trainingPlan[trainingDayIndex] =
      this.currentTrainingDay;
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
}
