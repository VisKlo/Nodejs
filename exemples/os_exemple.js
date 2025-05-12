const os = require("node:os")

const {username} = os.userInfo()

const cpus = os.cpus()

console.log(username)
console.table(cpus)