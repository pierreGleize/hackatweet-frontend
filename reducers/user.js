import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value : {token : null, username: null , firstName: null}
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers : {
        signup: (state, action) =>{
            state.value.token = action.payload.token;
            state.value.username = action.payload.username;
            state.value.firstName = action.payload.firstName;
        },
        signin: (state, action) => {
            state.value.username = action.payload.username;
            state.value.token = action.payload.token;
        },
    }
})

export const {signup, signin} = userSlice.actions;
export default userSlice.reducer;