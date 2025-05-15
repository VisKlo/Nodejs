import http from "node:http"
import dotenv from "dotenv"
import path from "node:path"
import pug from "pug"
import querystring from "node:querystring"
import fs from "node:fs"

dotenv.config()

const { HOST, PORT } = process.env

const dirname = import.meta.dirname
const viewPath = path.join(dirname, "views")

const menuItems = [
    { path: '/', title: 'Home', isActive: true },
    { path: '/about-me', title: 'About', isActive: false },
    { path: '/references', title: 'References', isActive: false },
    { path: '/contact-me', title: 'Contact', isActive: false },
]

const getContacts = () => {
    return JSON.parse(fs.readFileSync("./data/contacts.json", "utf-8") || "[]")
}

const saveContacts = (data) => {
    fs.writeFileSync("./data/contacts.json", JSON.stringify(data, null, 2))
}

const server = http.createServer((req, res) => {
    const parsedUrl = new URL(req.url, `http://${HOST}:${PORT}`)
    const pathname = parsedUrl.pathname
    const searchParams = parsedUrl.searchParams

    const updatedMenuItems = menuItems.map(item => ({
        ...item,
        isActive: item.path === pathname
    }))

    if (pathname === "/favicon.ico") {
        res.writeHead(200, {
            "content-type": "image/x-icon"
        })
        res.end()
        return
    }

    if (pathname === "/") {
        res.writeHead(200, {
            "content-type": "text/html"
        })

        pug.renderFile(path.join(viewPath, "home.pug"), {
            menuItems: updatedMenuItems,
            sent: searchParams.get("sent")
        }, (err, data) => {
            if (err) throw err
            res.end(data)
        })
        return
    }

    if (pathname === "/about-me") {
        res.writeHead(200, {
            "content-type": "text/html"
        })

        pug.renderFile(path.join(viewPath, "about.pug"), { menuItems: updatedMenuItems }, (err, data) => {
            if (err) throw err
            res.end(data)
        })
        return
    }

    if (pathname === "/references") {
        res.writeHead(200, {
            "content-type": "text/html"
        })

        pug.renderFile(path.join(viewPath, "references.pug"), { menuItems: updatedMenuItems }, (err, data) => {
            if (err) throw err
            res.end(data)
        })
        return
    }

    if (pathname === "/contact-me") {
        if (req.method === "GET") {
            res.writeHead(200, {
                "content-type": "text/html"
            })

            pug.renderFile(path.join(viewPath, "contact.pug"), { menuItems: updatedMenuItems }, (err, data) => {
                if (err) throw err
                res.end(data)
            })
            return
        }

        if (req.method === "POST") {
            let body = ""

            req.on("data", chunk => {
                body += chunk.toString()
            }).on("end", () => {
                const data = querystring.parse(body)

                if (!data.email || !data.message || data.email.trim() === "" || data.message.trim() === "") {
                    res.writeHead(500, { "content-type": "text/html" })
                    pug.renderFile(
                        path.join(viewPath, "contact.pug"),
                        {
                            menuItems: updatedMenuItems,
                            error: "Merci de remplir tous les champs."
                        },
                        (err, data) => {
                            if (err) throw err
                            res.end(data)
                        }
                    )
                    return
                }

                const contacts = getContacts()
                contacts.push({ email: data.email, message: data.message, date: new Date() })
                saveContacts(contacts)

                res.writeHead(302, {
                    Location: "/?sent=1"
                })
                res.end()
            })
            return
        }
    }

    res.writeHead(404, { "content-type": "text/plain" })
    res.end("Page non trouvée")
})

server.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}`)
})
