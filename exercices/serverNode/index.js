import http from "node:http"
import dotenv from "dotenv"
import path from "node:path"
import fs from "node:fs"
import querystring from "node:querystring"

dotenv.config()

const dirname = import.meta.dirname
const viewPath = path.join(dirname, "views")
const dataPath = path.join(dirname, "data", "users.json")
const headerPath = path.join(viewPath, "__header.html")
const footerPath = path.join(viewPath, "__footer.html")
const userTemplatePath = path.join(viewPath, "user.html")

const { HOST, PORT } = process.env

function getUsers() {
  const data = fs.readFileSync(dataPath, "utf8")
  return JSON.parse(data)
}

function saveUsers(users) {
  fs.writeFileSync(dataPath, JSON.stringify(users, null, 2), "utf8")
}

const server = http.createServer((req, res) => {
  const url = req.url

  const header = fs.readFileSync(headerPath, {encoding: "utf8"})
  const footer = fs.readFileSync(footerPath, {encoding: "utf8"})
  let users = getUsers()

  if (url === "/") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
    const list = users
      .map((user, i) => `<li><a href="/user?id=${i}">${user.nom}</a></li>`)
      .join("")
    res.end(`${header}<h1>Liste des utilisateurs</h1><ul>${list}</ul>${footer}`)
    return
  }

  if (url.startsWith("/user")) {
    const id = new URLSearchParams(url.split("?")[1]).get("id")
    const user = users[id]
    if (!user) {
      res.writeHead(404, { "Content-Type": "text/plain" })
      res.end("Utilisateur non trouvé")
      return
    }

    const template = fs.readFileSync(userTemplatePath, "utf-8")
    const page = template
      .replace("{{nom}}", user.nom)
      .replace("{{email}}", user.email)
      .replace("{{role}}", user.role)

    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
    res.end(`${header}${page}${footer}`)
    return
  }

  if (url === "/add" && req.method === "GET") {
    const form = fs.readFileSync(path.join(viewPath, "form.html"), "utf-8")
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
    res.end(`${header}<h1>Ajouter un utilisateur</h1>${form}${footer}`)
    return
  }

  if (url === "/add" && req.method === "POST") {
    let body = ""
    req.on("data", chunk => {
        body += chunk.toString()
    })
    req.on("end", () => {
      const data = querystring.parse(body)

      if (!data.nom || !data.email || data.nom.trim() === "" || data.email.trim() === "") {
        res.writeHead(401, { "Content-Type": "text/plain" })
        res.end("Nom et Email sont obligatoires.")
        return
      }

      users.push({
        nom: data.nom,
        email: data.email,
        role: "utilisateur"
      })
      saveUsers(users)
      res.writeHead(301, { Location: "/" })
      res.end()
    })
    return
  }

  res.writeHead(404, { "Content-Type": "text/plain" })
  res.end("404 - Page non trouvée")
})

server.listen(PORT, HOST, () => {
  console.log(`Serveur en ligne : http://${HOST}:${PORT}`)
})
