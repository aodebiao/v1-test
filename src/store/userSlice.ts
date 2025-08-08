import {createSlice} from "@reduxjs/toolkit";

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

    }
})