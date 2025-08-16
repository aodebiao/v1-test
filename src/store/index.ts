import {configureStore} from "@reduxjs/toolkit";
import {userReducer} from "@store/userSlice";
import {type TypedUseSelectorHook, useDispatch, useSelector, useStore} from "react-redux";


const store = configureStore({
    reducer:{
        user:userReducer,
    },
});
export type AppStore = typeof store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// 老写法
export const useAppDispatch1: () => AppDispatch = useDispatch
export const useAppSelector1: TypedUseSelectorHook<RootState> = useSelector
export const useAppStore1: () => AppStore = useStore




// 新写法
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()
export default store;




