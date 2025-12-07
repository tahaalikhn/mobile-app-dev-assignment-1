import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ImageSourcePropType } from "react-native";

export interface Exercise {
  id: string;
  name: string;
  desc: string;
  image?: ImageSourcePropType | string | null;
}

interface ExerciseState {
  items: Exercise[];
}

const initialExercises: Exercise[] = [
  {
    id: "1",
    name: "Lat Pulldown",
    desc: "A back-focused compound movement targeting the latissimus dorsi. Pull the bar down towards your chest while keeping your back straight and shoulders down.",
    image: require("../../assets/lat_pulldown.jpeg"),
  },
  {
    id: "2",
    name: "Tricep Pushdown",
    desc: "An isolation exercise targeting the triceps. Using a cable machine, push the bar down while keeping your elbows close to your body.",
    image: require("../../assets/tricep_pushdown.jpeg"),
  },
  {
    id: "3",
    name: "Lateral Raise",
    desc: "An isolation exercise targeting the lateral deltoids. Lift dumbbells out to the sides until shoulder level, keeping a slight bend in the elbows.",
    image: require("../../assets/lateral_raise.jpeg"),
  },
  {
    id: "4",
    name: "Leg Press",
    desc: "A lower body compound movement targeting quads, hamstrings, and glutes. Push the platform away with your feet while keeping your back against the seat.",
    image: require("../../assets/leg_press.jpeg"),
  },
];


// --- Initial State ---
const initialState: ExerciseState = {
  items: initialExercises,
};

// --- Slice ---
const exerciseSlice = createSlice({
  name: "exercises",
  initialState,
  reducers: {
    addExercise: (state, action: PayloadAction<Exercise>) => {
      state.items.push(action.payload);
    },
    updateExercise: (state, action: PayloadAction<Exercise>) => {
      const index = state.items.findIndex(e => e.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    removeExercise: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(e => e.id !== action.payload);
    },
    resetExercises: (state) => {
      state.items = [...initialExercises];
    },
  },
});

// --- Exports ---
export const { addExercise, updateExercise, removeExercise, resetExercises } = exerciseSlice.actions;
export default exerciseSlice.reducer;
