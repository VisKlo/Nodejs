const fs = require('node:fs')

const commands = [
    {
        name: "list",
        description: "Liste tous les élèves."
    },
    {
        name: 'find <string>',
        description: "Cherche puis affiche les infos d'un élève si il existe."
    },
    {
        name: 'more <number>',
        description: "Filtre les élèves en fonction de leur moyenne"
    }
]

fs.readFile("./exercices/challengeStudent/data/student.json", { encoding: 'utf8' }, (err, data) => {

    if (err) {
        console.error(err)
        process.exit(0)
    }

    const students = JSON.parse(data)

    function listStudent() {
        students.forEach(student => {
            console.log(student.name)
        })
    }

    function findStudent(text) {
        const regex = /^[a-zA-Z\s]+$/.test(text.trim())

        if (!regex) {
            console.log("Seuls des lettres sont autorisés")
            return
        }

        const results = students.filter(student => 
            student.name.toLowerCase().includes(text.toLowerCase())
        )

        if (results.length > 0) {
            console.table(results)
        } else {
            console.log("Aucun étudiant trouvé")
        }
    }

    function moreStudent(text) {
        const number = Number(text)

        if (isNaN(number) || !number) {
            console.log("Vous devez entrer un nombre")
            return
        }

        const results = students.filter(student => 
            student.notes.some(note => note > number)
        )

        if (results.length > 0) {
            console.table(results)
        } else {
            console.log("Aucun étudiant avec une note supérieure à " + number)
        }
    }

    console.log("Entrez une commande")

    process.stdin.on("data", (chunk) => {

        const text = chunk.toString().trim()

        if (text === commands[0].name) {
            listStudent()
        }
        else if (text.startsWith(commands[1].name.split(' ')[0])) {
            const name = text.slice(commands[1].name.split(' ')[0].length).trim()
            findStudent(name)
        }
        else if (text.startsWith(commands[2].name.split(' ')[0])) {
            const number = text.slice(commands[2].name.split(' ')[0].length).trim()
            moreStudent(number)
        }
        else {
            console.log("Commande inconnue")
        }
    })

})
