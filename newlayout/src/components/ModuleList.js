import { useEffect, useState } from 'react';
import { getModules } from './../services/apiCaller';

function ModuleList(props) {
    const [modules, setModules] = useState([]);
    const [activeFolder] = useState(props.activeFolder);    

    useEffect(() => {
        let mounted = true;
        const fetchAllJsonContents = async () => {
            await fetch(`http://localhost:8000/jsonlist/${activeFolder}`)
                .then(response => response.json())
                .then(items => {
                    if (mounted) {
                        setModules(items.data);
                    }
                });
            }
        fetchAllJsonContents();
        return () => mounted = false;
    }, [activeFolder]);
    return (
        // <div>
        //     < h1 > My Grocery List</h1 >
        //     <ul>
        //         {list.map(item => <li key={item.item}>{item.item}</li>)}
        //     </ul>
        //     {alert && <h2> Submit Successful</h2>}
        //     <form onSubmit={handleSubmit}>
        //         <label>
        //             <p>New Item</p>
        //             <input type="text"
        //                 onChange={event => setItemInput(event.target.value)}
        //                 value={itemInput} />
        //         </label>
        //         <button type="submit">Submit</button>
        //     </form>
        // </div >
        <div className="row mt-15">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th className="text-center">#</th>
                                <th className="text-center">Module</th>
                                <th className="text-center">Last Updated</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                modules.map((module, index) => {
                                    return (
                                        // <ModuleItem
                                        //     key={module.id}
                                        //     module={module}
                                        //     index={index + 1}
                                        // />
                                        <tr>
                                <th className="text-center">{index}</th>
                                <th className="text-center">{module.module}</th>
                                <th className="text-center">Last Updated</th>
                                <th className="text-center">Action</th>
                            </tr>
                                    )
                                })
                            }                        
                        </tbody>
                    </table>
                </div>
            </div>
    )
}

export default ModuleList;