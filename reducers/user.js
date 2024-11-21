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
        }
    }
})

export const {signup} = userSlice.actions;
export default userSlice.reducer;