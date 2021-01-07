import { createSlice } from '@reduxjs/toolkit'

export const huntSlice = createSlice({
    name: 'hunt',
    initialState: {
        found: false,
        hunts: [],
        jobApplications: [],
    },
    reducers: {
        storeHunts: (state, action) => {
            state.hunts = action.payload;
            state.found = true;
        },
        storeJobApps: (state, action) => {
            state.jobApplications = action.payload;
            state.found = true;
        },
        addHunt: (state, action) => {
            state.hunts.unshift(action.payload);
        },
    }
})

export const { storeHunts, storeJobApps, addHunt } = huntSlice.actions;

export const getHunts = state => state.hunt.hunts;
export const getJobsInHunt = state => state.hunt.jobApplications;
export const jobsRetrieved = state => state.hunt.found;

export default huntSlice.reducer