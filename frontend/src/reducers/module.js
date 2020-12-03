import * as types from './../constants/ActionTypes';

var initialState = 'sdc';
var myReducer = (state = initialState, action) =>{
    switch(action.type){
        case types.SELECT_FOLDER:
            return state;
        default: return state;
    }
};

export default myReducer;