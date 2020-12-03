import * as types from './../constants/ActionTypes';
import * as Config from './../constants/Config';

var s4 = () => {
    return  Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

var randomID = () => {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

var findIndex = (modules, id) => {
    var result = -1;
    modules.forEach((module, index) => {
        if(module.id === id){
            result = index;
        }
    });
    return result;
}

//Get data
function fetchModules(folder){
    fetch(`${Config.API_URL}/jsonlist/${folder}`)
        .then(res => res.json())
        .then(
            (result) => {
                return result.data;
            }
        )
    return [];
}

var data = JSON.parse(localStorage.getItem('modules'));
//var initialState = fetchModules('sdc');
var initialState = data ? data : [];
console.log(initialState);

var myReducer = (state = initialState, action) =>{
    var id = '';
    var index = -1;
    switch(action.type){
        case types.SELECT_FOLDER:
            return module;

        case types.FETCH_MODULES:
            return state;

        case types.LIST_ALL:
            return state;

        case types.SAVE_TASK:
            var module = {
                id : action.module.id,
                name : action.module.name,
                content : action.module.content,
                status : (action.module.status === 'true' || action.module.status === true) ? true : false
            };
            if(!module.id){
                module.id = randomID();
                state.push(module);
            }else{
                index = findIndex(state, module.id);
                state[index] = module;
            }

            localStorage.setItem('modules', JSON.stringify(state));

            return [...state];
        case types.UPDATE_STATUS_TASK:
            id = action.id;
            index = findIndex(state, id);
            state[index] = {
                ...state[index],
                status : !state[index].status
            };

            localStorage.setItem('modules', JSON.stringify(state));

            return [...state];

        case types.DELETE_TASK:
            id = action.id;
            index = findIndex(state, id);
            state.splice(index, 1);

            localStorage.setItem('modules', JSON.stringify(state));

            return [...state];
        default:
            return state;
    }
};

export default myReducer;