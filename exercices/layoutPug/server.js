import http from "node:http";
import dotenv from "dotenv";
import path from "node:path";
import pug from "pug";

dotenv.config();

const { HOST, PORT } = process.env

const dirname = import.meta.dirname
const viewPath = path.join(dirname, "views")

const menuItems = [
    { path: '/', title: 'Home', isActive: true },
    { path: '/about-me', title: 'About', isActive: false },
    { path: '/references', title: 'References', isActive: false },
    { path: '/contact-me', title: 'Contact', isActive: false },
]

const server = http.createServer((req, res) => {

    const requestedPath = req.url === "/" ? "/" : req.url;

    const updatedMenuItems = menuItems.map(item => ({
        ...item,
        isActive: item.path === requestedPath
    }))

    const url = req.url.replace("/", "")

    if (url === "favicon.ico") {
        res.writeHead(200, {
            "content-type": "image/x-icon"
        })
        res.end()
        return
    }

    if (url === "") {
        res.writeHead(200, {
            "content-type": "text/html"
        })

        pug.renderFile(path.join(viewPath, "home.pug"), { menuItems: updatedMenuItems }, (err, data) => {
            if (err) throw err;
            res.end(data)
        })
        return
    }

    if (url === "about-me") {
        res.writeHead(200, {
            "content-type": "text/html"
        })

        pug.renderFile(path.join(viewPath, "about.pug"), { menuItems: updatedMenuItems }, (err, data) => {
            if (err) throw err;
            res.end(data)
        })
        return
    }

    if (url === "references") {
        res.writeHead(200, {
            "content-type": "text/html"
        })

        pug.renderFile(path.join(viewPath, "references.pug"), { menuItems: updatedMenuItems }, (err, data) => {
            if (err) throw err;
            res.end(data)
        })
        return
    }

    if (url === "contact-me") {
        res.writeHead(200, {
            "content-type": "text/html"
        })

        pug.renderFile(path.join(viewPath, "contact.pug"), { menuItems: updatedMenuItems }, (err, data) => {
            if (err) throw err;
            res.end(data)
        })
        return
    }
})

server.listen(PORT, HOST, () => {
    console.log("running")
})