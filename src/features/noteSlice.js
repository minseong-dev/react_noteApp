import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const noteSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        initNotes: (state, action) => {
            return action.payload;
        },

        createNote: (state, action) => {
            const newState = [action.payload, ...state];
            localStorage.setItem("notes", JSON.stringify(newState));
            return newState;
        },

        updateNote: (state, action) => {
            const newState = state.map((note) =>
                String(note.id) === String(action.payload.id)
                    ? action.payload
                    : note
            );
            localStorage.setItem("notes", JSON.stringify(newState));
            return newState;
        },

        deleteNote: (state, action) => {
            const newState = state.filter(
                (note) => String(note.id) !== String(action.payload)
            );
            localStorage.setItem("notes", JSON.stringify(newState));
            return newState;
        },
    },
});

export const { initNotes, createNote, updateNote, deleteNote } =
    noteSlice.actions;
export default noteSlice.reducer;
