import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class ModuleItem extends Component {

    showStatusElement(){
        return (
            <span
                className={ this.props.task.status ? 'label label-danger' : 'label label-info' }
                onClick={ this.onUpdateStatus }
            >{ this.props.task.status === true ? 'Active' : 'Inactive' }</span>
        );
    }

    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.id);
    }

    onEditTask = () => {
        this.props.onOpenForm();
        this.props.onEditTask(this.props.task);
    }

    render() {
        return (
            <tr>
                <td>{ this.props.index }</td>
                <td>{ this.props.task.name }</td>
                <td className="text-center">
                    { this.showStatusElement() }
                </td>
                <td className="text-center">
                    <button
                        type="button"
                        className="btn btn-warning"
                        onClick={ this.onEditTask }>
                        <span className="fa fa-pencil mr-5"></span>Edit
                    </button>
                </td>
            </tr>
        );
    }
}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onUpdateStatus : (id) => {
            dispatch(actions.updateStatus(id));
        },
        onDeleteTask : (id) => {
            dispatch(actions.deleteTask(id))
        },
        onCloseForm : () => {
            dispatch(actions.closeForm());
        },
        onOpenForm : () => {
            dispatch(actions.openForm());
        },
        onEditTask : (task) => {
            dispatch(actions.editTask(task));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModuleItem);