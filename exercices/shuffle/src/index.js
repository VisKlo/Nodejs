import http from "node:http"

import { shuffleArray } from './utils/utils.js'

let users = [
    'Alan',
    'Sophie',
    'Bernard',
    'Elie'
]

function listUsers(users) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Liste des utilisateurs</title>
        </head>
        <body>
            <h1>Utilisateurs</h1>
            <ul>
                ${users.map(user => `<li>${user}</li>`).join('')}
            </ul>
        </body>
        </html>
    `
}

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(listUsers(users))
    } else if (req.url === '/shuffle') {
        users = shuffleArray(users)
        res.writeHead(302, { 'Location': '/' })
        res.end()
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' })
        res.end('404 Not Found')
    }
})

server.listen(8000, () => {
    console.log('Serveur running on http://localhost:8000')
})
