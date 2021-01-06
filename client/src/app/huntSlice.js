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
    }
})

export const { storeHunts, storeJobApps } = huntSlice.actions;

export const getHunts = state => state.hunt.hunts;
export const getJobsInHunt = hunt => state => {
    let id = hunt._id;
    let jobs = state.hunt.jobApplications.filter(job => job.inHuntGroup === id );
    return jobs;
};

export default huntSlice.reducer