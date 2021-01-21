import {SET_MODAL_SHOW_UNSHOW_STATE, SET_DELETE_MODAL_SHOW_UNSHOW_STATE,SET_MARK_AS_UPDATE_SHOW_UNSHOW_STATE,FETCH_DATA} from './actions-constants';
export const setData=(data)=>{
    return {
        type: FETCH_DATA,
        data: data
    }
}
export const setShowState=(showState)=>{
    return {
        type:SET_MODAL_SHOW_UNSHOW_STATE,
        payload: showState
    }
}
export const setDeleteShowState=(showState,id)=>{
    return {
        type:SET_DELETE_MODAL_SHOW_UNSHOW_STATE,
        id:id,
        showState: showState
    }
}
export const setMarkAsUpdateState=(showState,id)=>{
    return {
        type:SET_MARK_AS_UPDATE_SHOW_UNSHOW_STATE,
        showState: showState,
        id:id
     }
}
