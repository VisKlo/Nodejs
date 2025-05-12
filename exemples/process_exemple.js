process.stdout.write("Quel est votre nom ?")

process.stdin.on("data", (chunk => {
    const name = chunk.toString().replace("\n", "")

    console.log(`bonjour ${name}`)

    process.exit(0)
}))