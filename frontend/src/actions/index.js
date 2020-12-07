import * as types from './../constants/ActionTypes';
import callApi from './../utils/apiCaller';

export const listAll = () => {
    return {
        type : types.LIST_ALL
    }
};

export const actFetchModulesRequest = () => {
    return (dispatch) => {
        return callApi('/jsonlist', 'GET', null).then(res => {
            dispatch(actFetchModules(res.data));
        });
    }
}

export const actFetchModules = (modules) => {
    return {
        type: types.FETCH_MODULES,
        modules
    }
}

export const saveTask = (module) => {
    console.log(module);
    return {
        type : types.SAVE_TASK,
        module // module : module
    }
};

export const toggleForm = () => {
    return {
        type : types.TOGGLE_FORM
    }
}

export const openForm = () => {
    return {
        type : types.OPEN_FORM
    }
}

export const closeForm = () => {
    return {
        type : types.CLOSE_FORM
    }
}

export const updateStatus = (id) => {
    return {
        type : types.UPDATE_STATUS_TASK,
        id // id : id
    }
}

export const editTask = (module) => {
    return {
        type : types.EDIT_TASK,
        module // module : module
    }
}

export const filterTask = (filter) => {
    return {
        type : types.FILTER_TABLE,
        filter // filter : filter -> filterName, filterStatus
    }
}

export const searchTask = (keyword) => {
    return {
        type : types.SEARCH,
        keyword // keyword : keyword
    }
}

export const sortTask = (sort) => {
    return {
        type : types.SORT,
        sort // sort : sort -> sort.by sort.value
    }
}

export const changeFolder = (module) => {
    return {
        type : types.SELECT_FOLDER,
        module
    }
}
