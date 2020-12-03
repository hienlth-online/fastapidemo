import React, { Component, useState } from 'react';
import './App.css';
import ModuleList from './components/ModuleList';
import JsonContentForm from './components/JsonContentForm';
import ModuleGroupControl from './components/ModuleGroupControl';
import FunctionGroup from './components/FunctionGroup';

import { connect } from 'react-redux';
import * as actions from './actions/index';

function useModule(initialModule = 'sdc') {
  const [module, setModule] = useState('sdc');
  const setmod = (v) => setModule(v);
  const reset = () => setModule(initialModule);
  return [module, setmod, reset];
}

class App extends Component {
    //const [moduleT, setModule] = useState('sdc');

    // toggle redux
    onToggleForm = () => {
        var { itemEditing } = this.props;
        if(itemEditing && itemEditing.id !== ''){
            this.props.onOpenForm();
        }else{
            this.props.onToggleForm();
        }
        this.props.onClearTask({
            id : '',
            name : '',
            content : '',
            status : false
        });
    }

    render() {
        const { module, setmod, reset } = this.props
        return (
            <div className="container">
                <div className="text-center">
                    <h1>Json Generator</h1><hr/>
                </div>

                <div className="row">
                    <FunctionGroup />
                    <div className="row">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                    <button type="button" className="btn btn-primary w-100" onClick={() => setmod('sdc')}>
                        SDC
                    </button>
                    </div>
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                    <button type="button" className="btn btn-primary w-100" onClick={() => setmod('c-sbc')}>
                        C-SBC
                    </button>
                    </div>
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                    <button type="button" className="btn btn-primary w-100" onClick={() => setmod('sbc-smoke')}>
                        SBC-Smoke
                    </button>
                    </div>
                    </div>
                    <hr/>
                </div>

                <div className="row">
                    <div className='col-8'>
                        <h3>{module}</h3>
                        <button type="button" className="btn btn-primary" onClick={this.onToggleForm} >
                            <span className="fa fa-plus mr-5"></span>
                            Add Module
                        </button>
                        <ModuleGroupControl />
                        <ModuleList />
                    </div>
                    <div className='col-12'>
                        <JsonContentForm />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isDisplayForm : state.isDisplayForm,
        itemEditing : state.itemEditing
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onToggleForm : () => {
            dispatch(actions.toggleForm());
        },
        onClearTask : (task) => {
            dispatch(actions.editTask(task));
        },
        onOpenForm : () => {
            dispatch(actions.openForm());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
