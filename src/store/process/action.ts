import api from "../../services/api"
import { FETCH_FAILURE, FETCH_REQUEST, FETCH_SUCCESS } from "./actionType"
import { Dispatch } from "redux"

const fetchProcessRequest = () => {
    return {
        type: FETCH_REQUEST
    }
}

const fetchProcessSuccess = (data: []) => {
    return {
        type: FETCH_SUCCESS,
        payload: data
    }
}

const fetchProcessFailure = (err: Error) => {
    return {
        type: FETCH_FAILURE,
        payload: err
    }
}

export const fetchProcessList = () => {
    return (dispatch: Dispatch)=>{
        dispatch(fetchProcessRequest());
            api.get('processes').then(res=>{
            const processList = res.data
            dispatch(fetchProcessSuccess(processList))
        }).catch(err=>{
            dispatch(fetchProcessFailure(err.message))
        })
    }
}

