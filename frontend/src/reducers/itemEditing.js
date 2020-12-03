import * as types from './../constants/ActionTypes';

var initialState = {
    id : '',
    name : '',
    content : '',
    status : false
};
var myReducer = (state = initialState, action) =>{
    switch(action.type){
        case types.EDIT_TASK:
            return action.module;
        default:
            return state;
    }
};

export default myReducer;