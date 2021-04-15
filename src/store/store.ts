import { combineReducers, configureStore, createSlice, createStore, PayloadAction } from "@reduxjs/toolkit";

let initialState: number[] = [];

const volumeSlice = createSlice({
    name: 'volumesList',
    initialState: initialState,
    reducers: {
        volumeAdded: (state, action: PayloadAction<number>) => {
            return [...state, action.payload];
        },
    }
});

const selectedVolumeSlice = createSlice({
    name: 'selectedVolume',
    initialState: 0,
    reducers: {
        volumeSelected: (state, action: PayloadAction<number>) => {
            return action.payload;
        }
    }
})

export const { volumeAdded } = volumeSlice.actions;
export const { volumeSelected } = selectedVolumeSlice.actions;

export const store = createStore(
    combineReducers(
        {
            volumeList: volumeSlice.reducer, selectedVolume: selectedVolumeSlice.reducer
        }))