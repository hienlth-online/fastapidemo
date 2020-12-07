import * as types from './../constants/ActionTypes';
import * as Config from './../constants/Config';

var s4 = () => {
    return  Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

var randomID = () => {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

var saveData = (function () {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function (data, fileName) {
        var json = JSON.stringify(data),
            blob = new Blob([json], {type: "octet/stream"}),
            url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    };
}());

var findIndex = (tasks, id) => {
    var result = -1;
    tasks.forEach((task, index) => {
        if(task.id === id){
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

var data = JSON.parse(localStorage.getItem('tasks'));
//var initialState = fetchModules('sdc');
var initialState = data ? data : [];
console.log(initialState);

var myReducer = (state = initialState, action) =>{
    var id = '';
    var index = -1;
    switch(action.type){
        case types.DOWNLOAD_JSON:
            saveData(JSON.parse(action.task.content), action.task.name);
            return state;

        case types.SELECT_FOLDER:
            return module;

        case types.FETCH_MODULES:
            return state;

        case types.LIST_ALL:
            return state;

        case types.SAVE_TASK:
            var task = {
                id : action.task.id,
                name : action.task.name,
                content : action.task.content,
                status : (action.task.status === 'true' || action.task.status === true) ? true : false
            };
            if(!task.id){
                task.id = randomID();
                state.push(task);
            }else{
                index = findIndex(state, task.id);
                state[index] = task;
            }

            localStorage.setItem('tasks', JSON.stringify(state));

            return [...state];
        case types.UPDATE_STATUS_TASK:
            id = action.id;
            index = findIndex(state, id);
            state[index] = {
                ...state[index],
                status : !state[index].status
            };

            localStorage.setItem('tasks', JSON.stringify(state));

            return [...state];

        case types.DELETE_TASK:
            id = action.id;
            index = findIndex(state, id);
            state.splice(index, 1);

            localStorage.setItem('tasks', JSON.stringify(state));

            return [...state];
        default:
            return state;
    }
};

export default myReducer;