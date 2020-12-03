import { combineReducers } from 'redux';
import modules from './modules';
import isDisplayForm from './isDisplayForm';
import itemEditing from './itemEditing';
import filterTable from './filterTable';
import module from './module';
import search from './search';
import sort from './sort';

const myReducer = combineReducers({
    module,
    modules, // modules : modules,
    isDisplayForm, // isDisplayForm : isDisplayForm
    itemEditing, // itemEditing : itemEditing
    filterTable,
    search,
    sort // sort : sort
});

export default myReducer;