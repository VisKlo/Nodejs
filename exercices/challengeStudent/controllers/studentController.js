import fs from "node:fs";
import dotenv from "dotenv"

dotenv.config({
	path: "./exercices/challengeStudent/.env"
})

const dataPath = "./exercices/challengeStudent/data/student.json"

const students = JSON.parse(fs.readFileSync(dataPath, {encoding: 'utf8'}))


export const list = () => {
	const names = students.map(student => student.name)
	console.log(names.join('\n'))
}

export const find = (name) => {
	const student = students.find((student) => student.name.trim().toLowerCase() === name.trim().toLowerCase())
	if (!student) {
		console.log(`L'élève ${name} n'existe pas.`)
		return
	}
	console.table(student)
}

export const more = (num) => {
	const filterStudent =  students.filter(student => {
		return (student.notes.reduce((acc, curr) => acc + curr, 0) / student.notes.length) > num
	})
	
	console.table(filterStudent)
}

export const addNote = (name, note) => {
	const student = students.find((s) => s.name.toLowerCase() === name.toLowerCase().trim())
	
	if (!student) {
		console.log(`L'étudiant ${name} n'éxiste pas.`)
		return
	}
	const sanitizeNote = parseFloat(note.trim());
	
	if (isNaN(sanitizeNote) || sanitizeNote < 0 || sanitizeNote > 20) {
		console.log("Merci de saisir une valeur numérique comprise entre 0 et 20")
		return
	}
	
	student.notes.push(sanitizeNote)
	console.log(`La note de ${sanitizeNote} à bien été attribuer à ${name}`)
}

export const addMention = (name) => {
    const student = students.find((s) => s.name.toLowerCase() === name.toLowerCase().trim())

    if (!student) {
        console.log(`L'étudiant ${name} n'existe pas.`)
        return
    }

    const moyenne = student.notes.reduce((acc, curr) => acc + curr, 0) / student.notes.length

    let mention

    if (moyenne > 10 && moyenne <= 12) {
        mention = process.env.PASSABLE
    } else if (moyenne > 12 && moyenne <= 14) {
        mention = process.env.ASSEZBIEN
    } else if (moyenne > 14 && moyenne <= 16) {
        mention = process.env.BIEN
    } else if (moyenne > 16) {
        mention = process.env.TRESBIEN
    } else {
        mention = "Aucune mention"
    }

    student.mention = mention
    console.log(`Mention "${mention}" ajoutée à ${student.name} (moyenne : ${moyenne.toFixed(2)})`)
}


export const saveFile = () => {
	fs.writeFileSync(dataPath, JSON.stringify(students, null, 2))
	console.log("Fichier sauvegardé")
}