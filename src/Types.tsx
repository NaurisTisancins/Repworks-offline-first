export interface Routine {
  id: string;
  name: string;
  trainingPlan: TrainingDay[];
}

export interface TrainingDay {
  id: string;
  name: string;
  exercises: Exercise[];
  history: Session[];
}

export interface Exercise {
  id: string;
  name: string;
}

export interface Session {
  id: string;
  date: string;
  performedExercises: PerformedExercise[];
}

export interface PerformedExercise {
  id: string;
  exercise: Exercise;
  repsAndSets: RepsAndSets[];
}

export interface RepsAndSets {
  id: string;
  set: string;
  weight: string;
  reps: string;
}
