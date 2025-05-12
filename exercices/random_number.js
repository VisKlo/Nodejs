const randomNumber = Math.floor(Math.random() * 100) + 1;
let attemps = 10;


process.stdout.write("Choissisez un nombre entre 1 et 100 \n")

function game() {
    if (attemps === 0) {
        process.stdout.write(`Vous avez perdu. Le nombre était : ${randomNumber}\n`)
        process.exit(0)
    }

    process.stdout.write(`Il vous reste ${attemps} tentatives. Choissisez un nombre :`)
}

process.stdin.on("data", (data => {
    const number = parseInt(data.toString().trim())

    if (isNaN(number) || number < 1 || number > 100) {
        process.stdout.write("Veuillez rentrer un nombre valide entre 1 et 100.\n");
        game();
        return;
    }

    if (number == randomNumber) {
        process.stdout.write("Vous avez trouvé le nombre\n");
        process.exit();
    } else {
        attemps--;
        if (number < randomNumber) {
        process.stdout.write("C'est plus grand\n");
        } else {
        process.stdout.write("C'est plus petit\n");
        }
        game();
    }
}))

game()