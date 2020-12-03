import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class JsonContentForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id : '',
            name : '',
            status : false,
            content: '',
            type: 'sdc'
        };
    }

    componentWillMount() {
        if(this.props.itemEditing && this.props.itemEditing.id !== null){
            this.setState({
                id : this.props.itemEditing.id,
                name : this.props.itemEditing.name,
                status : this.props.itemEditing.status,
                content : this.props.itemEditing.content
            });
        }else{
            this.onClear();
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps && nextProps.itemEditing){
            this.setState({
                id : nextProps.itemEditing.id,
                name : nextProps.itemEditing.name,
                status : nextProps.itemEditing.status,
                content : nextProps.itemEditing.content
            });
        }else{
            this.onClear();
        }
    }

    onHandleChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name] : value
        });
    }

    onSave = (event) => {
        event.preventDefault();
        this.props.onSaveTask(this.state);
        this.onClear();
        this.onExitForm();
    }

    onClear = () => {
        this.setState({
            name : '',
            content: '',
            status : false
        });
    }

    onExitForm = () => {
        this.props.onCloseForm();
    }

    render() {
        if(!this.props.isDisplayForm) return null;
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        { !this.state.id ? 'Add Module' : 'Update Module' }
                        <span
                            className="fa fa-times-circle text-right"
                            onClick={this.onExitForm}
                        ></span>
                    </h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={this.onSave} >
                        <div className="form-group">
                            <label>Module :</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={this.state.name}
                                onChange={ this.onHandleChange }
                            />
                        </div>
                        <div className="form-group">
                            <label>JSON Content :</label>
                            <textarea rows="10"
                                type="text"
                                className="form-control"
                                name="content"
                                value={this.state.content}
                                onChange={ this.onHandleChange }
                            />
                        </div>
                        <label>Status :</label>
                        <select
                            className="form-control"
                            value={this.state.status}
                            onChange={this.onHandleChange}
                            name="status"
                        >
                            <option value={true}>Active</option>
                            <option value={false}>Inactive</option>
                        </select><br/>
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning">
                                <span className="fa fa-plus mr-5"></span>Save
                            </button>&nbsp;
                            <button type="button" onClick={ this.onClear } className="btn btn-danger">
                                <span className="fa fa-close mr-5"></span>Cancel
                            </button>
                        </div>
                    </form>
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
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSaveTask : (module) => {
            dispatch(actions.saveTask(module));
        },
        onCloseForm : () => {
            dispatch(actions.closeForm());
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(JsonContentForm);
