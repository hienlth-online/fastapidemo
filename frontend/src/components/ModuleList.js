import React, { Component } from 'react';
import ModuleItem from './ModuleItem';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class ModuleList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filterName : '',
            filterStatus : -1,
            moduleType: 'sdc'
        };
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        var filter = {
            name : name === 'filterName' ? value : this.state.filterName,
            status : name === 'filterStatus' ? value : this.state.filterStatus
        };
        this.props.onFilterTable(filter);
        this.setState({
            [name] : value
        });
    }

    render() {
        var { modules, filterTable, keyword, sort } = this.props;
        // filter on table
        if(filterTable.name){
            modules = modules.filter((module) => {
                return module.name.toLowerCase().indexOf(filterTable.name.toLowerCase()) !== -1
            });
        }

        modules = modules.filter((module) => {
            if(filterTable.status === -1){
                return module;
            }else{
                return module.status
                === (filterTable.status === 1 ? true : false);
            }
        });

        // search
        modules = modules.filter((module) => {
            return module.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
        });

        // sort
        if(sort.by === 'name'){
            modules.sort((a, b) => {
                if(a.name > b.name) return sort.value;
                else if(a.name < b.name) return -sort.value;
                else return 0;
            });
        }else{
            modules.sort((a, b) => {
                if(a.status > b.status) return -sort.value;
                else if(a.status < b.status) return sort.value;
                else return 0;
            });
        }

        var elmTasks = modules.map((module, index) => {
            return (
                <ModuleItem
                    key={module.id}
                    module={module}
                    index={index + 1}
                />
            )
        });

        return (
            <div className="row mt-15">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th className="text-center">#</th>
                                <th className="text-center">Module</th>
                                <th className="text-center">Status</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="filterName"
                                        onChange={ this.onChange }
                                        value={ this.state.filerName }
                                    />
                                </td>
                                <td>
                                    <select
                                        className="form-control"
                                        name="filterStatus"
                                        onChange={ this.onChange }
                                        value={ this.state.filterStatus }
                                    >
                                        <option value={-1}>All</option>
                                        <option value={0}>Active</option>
                                        <option value={1}>Inactive</option>
                                    </select>
                                </td>
                                <td></td>
                            </tr>
                            { elmTasks }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        modules : state.modules,
        filterTable : state.filterTable,
        keyword : state.search,
        sort : state.sort
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onFilterTable : (filter) => {
            dispatch(actions.filterTask(filter));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModuleList);
