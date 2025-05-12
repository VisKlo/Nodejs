const fs = require("node:fs")

/*fs.readFile("./data/student.txt",{encoding:"utf8"}, (err, data) => {

    if(err){
        console.log(err);
        return
    }

    console.log(data);
})*/
const students = []

try{

    const data = fs.readFileSync("./data/student.txt",{encoding:"utf-8"})
    const allStudents = JSON.parse(data)
    allStudents.forEach(student => {
        const moyenne = student.notes.reduce((sum, note) => sum + note, 0) / student.notes.length;

        students.push({
            name: student.name,
            moyenne: parseFloat(moyenne),
            address: student.address
        })
    });
    
    const sup17 = students.filter(student => student.moyenne > 17)
    console.log("Etudiants avec une moyenne > 17 :\n", sup17)

    const bestStudent = students.reduce((best, current) => {
        return (current.moyenne > best.moyenne) ? current : best
    }, students[0])

    console.log("Meilleur éléve :\n", bestStudent)

    const triStudents = [...students].sort((a,b) => b.moyenne - a.moyenne)
    console.log("Etudiants par moyenne décroissante", triStudents)

}catch(err){

    console.log(err)
}