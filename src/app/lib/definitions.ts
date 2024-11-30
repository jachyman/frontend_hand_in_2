export type User = {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    personalTrainerId: number;
    accountType: "string";
  };

export type WorkoutPlan = {
  exerciseId: number
  groupId: number
  name: string
  description: string
  repetitions: number
  time: string
  workoutProgramId: number
  personalTrainerId: number
}