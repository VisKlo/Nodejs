import fs from "node:fs"

const dataPath = "./exercices/shifoumi/data/scores.json"

const SCORES = [
    {
        name: "ordi1",
        win: 0,
        lose: 0,
        draw: 0
    },
    {
        name: "ordi2",
        win: 0,
        lose: 0,
        draw: 0
    }
]

const main = ["feuille", "ciseaux", "pierre"]


export const saveFile = () => {
    fs.writeFileSync(dataPath, JSON.stringify(SCORES, null, 2))
    console.log("Fichier sauvegardé")
}

export const run = (number, value) => {
    if(value === 0){
        resetScores()
    }
    for (let i = 0; i < number; i++) {
        const value1 = main[Math.floor(Math.random() * 3)]
        const value2 = main[Math.floor(Math.random() * 3)]
        let result = 0
        switch (value1) {
            case "feuille":
                if (value2 === "feuille") {
                    result = "Egalité"
                    console.log(result)
                    SCORES[0].draw += 1
                    SCORES[1].draw += 1
                }
                else if (value2 === "pierre") {
                    result = "ORDI1 gagne"
                    console.log(result)
                    SCORES[0].win += 1
                    SCORES[1].lose += 1
                }
                else {
                    result = "ORDI2 gagne"
                    console.log(result)
                    SCORES[0].lose += 1
                    SCORES[1].win += 1
                }
                break;

            case "pierre":
                if (value2 === "pierre") {
                    result = "Egalité"
                    console.log(result)
                    SCORES[0].draw += 1
                    SCORES[1].draw += 1
                }
                else if (value2 === "ciseaux") {
                    result = "ORDI1 gagne"
                    console.log(result)
                    SCORES[0].win += 1
                    SCORES[1].lose += 1
                }
                else {
                    result = "ORDI2 gagne"
                    console.log(result)
                    SCORES[0].lose += 1
                    SCORES[1].win += 1
                }
                break;

            case "ciseaux":
                if (value2 === "ciseaux") {
                    result = "Egalité"
                    console.log(result)
                    SCORES[0].draw += 1
                    SCORES[1].draw += 1
                }
                else if (value2 === "feuille") {
                    result = "ORDI1 gagne"
                    console.log(result)
                    SCORES[0].win += 1
                    SCORES[1].lose += 1
                }
                else {
                    result = "ORDI2 gagne"
                    console.log(result)
                    SCORES[0].lose += 1
                    SCORES[1].win += 1
                }
                break;
            default:
                console.error("Une erreur est survenu")
                break
        }
    }
    console.table(SCORES)
}

export const showScore = () => {
    console.table(SCORES)
}

export const showSavedScore = () => {
    try{
    const data = JSON.parse(fs.readFileSync(dataPath, {encoding: 'utf8'}))
    console.table(data)
    }
    catch(err){
        console.error(err)
    }
}

export const resetScores = () => {
    SCORES.forEach(score => {
        score.win = 0;
        score.lose = 0;
        score.draw = 0;
    });
    saveFile()
};