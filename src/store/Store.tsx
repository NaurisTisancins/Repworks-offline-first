import { makeAutoObservable } from 'mobx';
import routines from '../../assets/data/routines.json';
import { Routine, TrainingDay } from '../Types';

export class RoutineStore {
  routinesList: Routine[] = routines;
  selectedRoutine: null | Routine = null;
  currentSession: TrainingDay | null = null;

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

  setCurrentSession = (id: string) => {
    if (!this.selectedRoutine) return;
    const currentSessionIdx = this.selectedRoutine.trainingPlan.findIndex(
      (item) => item.id === id
    );
    this.currentSession = this.selectedRoutine.trainingPlan[currentSessionIdx];
    return this.currentSession;
  };
}
