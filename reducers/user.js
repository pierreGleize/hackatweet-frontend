import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value : {token : null}
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers : {
        signup: (state, action) =>{
            state.value.token = action.payload.token;
        },
        signin: (state, action) => {
            state.value.token = action.payload.token;
        },
        logout: (state) => {
            state.value.token = null
        }
    }
})

export const {signup, signin, logout} = userSlice.actions;
export default userSlice.reducer;