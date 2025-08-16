import type {FC} from "react";
import {useAppSelector} from "@store/index";

export const Test:FC = () => {
    const userState = useAppSelector(state => state.user)
    return  <div>dddd - {userState.username}</div>
}