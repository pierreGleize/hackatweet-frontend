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
        logout: (state) => {
            state.value.username = null;
            state.value.firstName = null;
            state.value.token = null
        }
    }
})

export const {signup, signin, logout} = userSlice.actions;
export default userSlice.reducer;