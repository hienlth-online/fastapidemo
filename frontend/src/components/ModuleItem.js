import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';
import DownloadLink from "react-download-link";

class ModuleItem extends Component {

    showStatusElement(){
        return (
            <span
                className={ this.props.module.status ? 'label label-danger' : 'label label-info' }
                onClick={ this.onUpdateStatus }
            >{ this.props.module.status === true ? 'Active' : 'Inactive' }</span>
        );
    }

    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.module.id);
    }

    onEditTask = () => {
        this.props.onOpenForm();
        this.props.onEditTask(this.props.module);
    }

    getDataFromURL = (url) => new Promise((resolve, reject) => {
        setTimeout(() => {
            fetch(url)
            .then(response => response.text())
            .then(data => {
                resolve(data)
            });
        });
    }, 2000);

    render() {
        return (
            <tr>
                <td>{ this.props.index }</td>
                <td>{ this.props.module.name.split(".json")[0] }</td>
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
                    <DownloadLink
                        label="Download"
                        className="btn btn-primary button-download"
                        filename={ this.props.module.name}
                        exportFile={() => this.props.module.content }
                    />
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
        onCloseForm : () => {
            dispatch(actions.closeForm());
        },
        onOpenForm : () => {
            dispatch(actions.openForm());
        },
        onEditTask : (module) => {
            dispatch(actions.editTask(module));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModuleItem);
