import React, { Component } from 'react';
import './App.css';
import ModuleList from './components/ModuleList';
import JsonContentForm from './components/JsonContentForm';
import ModuleGroupControl from './components/ModuleGroupControl';

import { connect } from 'react-redux';
import * as actions from './actions/index';
import * as Config from './constants/Config';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            module: 'sdc'
        };
    }

    componentDidMount() {
        fetch(`${Config.API_URL}/jsonlist/${this.state.type}`)
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({ items: []});
                this.setState({
                    isLoaded: true,
                    items: result.data
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }

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

    clickShowFunction = typeData => () => {
        this.setState({ module: typeData});
    }

    render() {

        return (
            <div className="container">
                <div className="text-center">
                    <h1>Json Generator</h1><hr/>
                </div>

                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <h4>List function</h4>
                    </div>
                    <div className="panel-body">
                        <button type="button" className="btn btn-primary button-folder" onClick={this.clickShowFunction('sdc')}>
                            SDC
                        </button>
                        <button type="button" className="btn btn-primary button-folder" onClick={this.clickShowFunction('c-sbc')}>
                            C-SBC
                        </button>
                        <button type="button" className="btn btn-primary" onClick={this.clickShowFunction('sbc-smoke')}>
                            SBC-Smoke
                        </button>
                    </div>
                </div>

                <div className="panel">
                    <div className="panel-body">
                        <div className="row">
                            <div className='col-8'>
                                <h3>{this.state.module}</h3>
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
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isDisplayForm : state.isDisplayForm,
        itemEditing : state.itemEditing,
        type : state.type
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onToggleForm : () => {
            dispatch(actions.toggleForm());
        },
        onClearTask : (module) => {
            dispatch(actions.editTask(module));
        },
        onOpenForm : () => {
            dispatch(actions.openForm());
        },
        onChangeFolder : (folder) => {
            dispatch(actions.changeFolder(folder));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
