import './App.css';
import { useState } from 'react';
import ModuleList from './components/ModuleList';

function App() {
    const [activeFolder, setActiveFolder] = useState('sdc');

    return (
        <div className="container">
            <div className="text-center">
                <h1>Json Generator</h1><hr />
            </div>

            <div className="panel panel-primary">
                <div className="panel-heading">
                    <h4>List function</h4>
                </div>
                <div className="panel-body">
                    <button type="button" className="btn btn-primary button-folder"
                        onClick={() => setActiveFolder('sdc')}>
                        SDC
                    </button>
                    <button type="button" className="btn btn-primary button-folder"
                        onClick={() => setActiveFolder('c-sbc')}>
                        C-SBC
                    </button>
                    <button type="button" className="btn btn-primary"
                        onClick={() => setActiveFolder('sbc-smoke')}>
                        SBC-Smoke
                    </button>
                </div>
            </div>

            <div className="panel">
                <div className="panel-body">
                    <div className="row">
                        <div className='col-8'>
                            <h3>{activeFolder}</h3>
                            <button type="button" className="btn btn-primary" >
                                <span className="fa fa-plus mr-5"></span>
                                    Add Module
                                </button>
                            {/* <ModuleGroupControl /> */}
                            <ModuleList activeFolder={activeFolder} />
                        </div>
                        <div className='col-12'>
                            {/* <JsonContentForm activeFolder={this.state.activeFolder} /> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
