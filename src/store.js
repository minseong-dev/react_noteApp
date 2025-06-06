import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "./features/noteSlice";

export const store = configureStore({
    reducer: {
        notes: noteReducer,
    },
});
