import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

export interface UserState {
    token:string;
    userId:string,
    username:string;
    avatar:string;
}



const initialState:UserState = {
    token:'',
    username:'',
    userId:'',
    avatar:''
}



export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
            SET_USER_INFO:(state,action:PayloadAction<UserState>) => {
                state.username = action.payload.username;
                state.avatar = action.payload.avatar;
                state.userId = action.payload.userId;
                state.token = action.payload.token;
                return state;
            }
    },
    selectors:{
        selectUser: (state) => state
    }
})

export const {SET_USER_INFO} = userSlice.actions;
export const userReducer = userSlice.reducer;