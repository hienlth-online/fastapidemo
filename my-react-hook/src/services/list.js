export function getList() {
    return fetch('http://localhost:8000/list')
        .then(data => data.json())
}


export function setItem(item) {
    return fetch('http://localhost:8000/list', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ item })
    })
        .then(data => data.json())
}