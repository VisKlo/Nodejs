import readline from "node:readline"
import { run, showScore, saveFile, resetScores, showSavedScore } from "./controllers/shifoumiController.js"

const commands = [
    {
        name: "run",
        description: "Démarre une partie de <number> manches"
    },
    {
        name: "reset",
        description: "Remets les scores à zéro"
    },
    {
        name: "rerun",
        description: "Relance une partie de <number> manches après avoir réinitialisé les scores"
    },
    {
        name: "score",
        description: "Voir les scores"
    },
    {
        name: "saved score",
        description: "Voir les scores sauvegardés"
    },
    {
        name: "save",
        description: "Sauvegarder les scores"
    }
]

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.setPrompt("Entrez une commande > ")
rl.prompt()

rl.on("line", (line) => {

    switch (line) {
        case 'run':
            rl.question("Combien de manches ?", (number) => {
                run(number,1)
            })
            break
        case 'rerun':
            rl.question("Combien de manches ?", (number) => {
                run(number,0)
            })
            break
        case 'score':
            showScore()
            break
        case line.match(/^saved /) ? line : null :
            showSavedScore()
            break
        case 'save':
            saveFile()
            break
        case 'reset':
            resetScores()
            break
        case "quit":
            saveFile()
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
    process.exit(0)
})