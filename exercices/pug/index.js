import pug from "pug"
import path from 'node:path'

const dirname = import.meta.dirname
const viewPath = path.join(dirname, "view")

pug.renderFile(path.join(viewPath, "html.pug"),{ user: { isAdmin: true } }, (err, data) => {
    if (err) {
        throw err
    }   

    console.log(data)
})
