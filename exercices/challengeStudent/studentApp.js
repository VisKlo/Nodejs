import {extractArg} from "./utils/utils.js";
import {list, find, more, addNote, saveFile, addMention} from "./controllers/studentController.js"
import readline from "node:readline";


const commands = [
	{
		name: "list",
		description: "Liste tout les élèves."
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
		name: "addNote",
		description: "Ajoute une note à un élève spécifique"
	},
    {
        name:"addMention",
        description: "Ajoute une mention à un étudiant"
    }
]

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
})

rl.setPrompt("STUDENT > ")
rl.prompt()
rl.on("line", (line) => {
	let arg;
	
	switch (line) {
		
		case 'list':
			list()
			break
		
		case line.match(/^find /) ? line : null :
			arg = extractArg(line)
			find(arg)
			break
		
		case line.match(/^more /) ? line : null:
			arg = extractArg(line)
			more(arg)
			break
		
		case "addNote":
			rl.question("A qui souhaitez vous ajouter une note ?", (studentName) => {
				rl.question("Quelle est la note à ajouter ?", (note) => {
					addNote(studentName, note);
					rl.prompt()
				})
			})
			break;
        case "addMention":
            rl.question("A qui souhaitez vous ajouter une mention ?", (studentName) => {
					addMention(studentName);
					rl.prompt()
			})
			break;
		case "quit":
			rl.close()
			break;
		default:
			console.group('Commande inconnu, voici la liste des commandes')
			console.table(commands)
			console.groupEnd()
			break
	}
	rl.prompt()
})
rl.on("close", () => {
	saveFile()
	process.exit(0)
})