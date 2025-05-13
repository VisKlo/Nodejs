import fs from 'node:fs'
import readline from 'node:readline'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.setPrompt("Entrez une commande >>")
rl.prompt()

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
    },
    {
        name: 'add',
        description: "Ajoute une note à un étudiant"
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
            const students = results
            return students
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

    rl.on("line", (line) => {
        switch (line.toString().trim()) {
            case commands[0].name:
                listStudent()
                break;
            case line.match(/^find /) ? line : null :
                const name = line.slice(commands[1].name.split(' ')[0].length).trim()
                const result = findStudent(name)
                console.table(result)
                break;
            case line.match(/^more /)? line : null :
                const number = line.slice(commands[2].name.split(' ')[0].length).trim()
                moreStudent(number)
                break;
            case commands[3].name :
                rl.question("Quel est le nom de l'étudiant ? ", (name) =>{
                    rl.question("Quel est la note à ajouté ? ", (note) => {
                        const student = findStudent(name)
                        if(student.length > 1){
                            console.log("plusieurs étudiants trouvés")
                        }
                        else if (student.length == 0){
                            console.log("aucun étudiant trouvé")
                        }
                        else{
                            const number = Number(note)
                            if(isNaN(number) || number < 0 || number > 20){
                                console.log("Veuillez entrer un nombre entre 0 et 20")
                            }
                            else{
                                student[0].notes.push(number)
                                fs.writeFile("./exercices/challengeStudent/data/student.json", JSON.stringify(students, null, 2), (err) => {
                                    if(err){
                                        console.log(err)
                                    }
                                    else {
                                        console.log(`La note ${number} a bien été ajoutée à l'étudiant ${student[0].name}.`)
                                    }
                                })
                            }
                        }
                    })
                })
                

                break
            default:
                console.log("Commande inconnue")
                break
        }
    })

})
