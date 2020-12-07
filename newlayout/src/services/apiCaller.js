export function getModules(folder) {
    return fetch(`http://localhost:8000/jsonlist/${folder}`)
        .then(data => data.json())
}