import React, { Component } from 'react';
import ModuleSearchControl from './ModuleSearchControl';
import ModuleSortControl from './ModuleSortControl';

class ModuleGroupControl extends Component {
    render() {
        return (
            <div className="row mt-15">
                <ModuleSearchControl />
                <ModuleSortControl />
            </div>
        );
    }
}

export default ModuleGroupControl;
