import React, { useState, useEffect } from "react";

export default function DataLoader(props) {
    const [data, setData] = useState([]);
    const [folder, setFolder] = useState('sdc');

    useEffect(() => {
        setFolder(props.folder);

        fetch(`http://localhost:8000/jsonlist/${folder}`)
            .then(response => response.json())
            .then(data => setData(data.data));
        console.log(data);
    }, [folder]);

    return (
        <div>
            <ul>
                {/* {data.map(el => (
                    <li key={el.folder + '_' + el.module}>{el.module}</li>
                ))} */}
            </ul>
        </div>
    );
}