//console.log(global)

// les informations sur l'os

const os = require("os")

//console.log(os)

console.log(os.type)

console.log(os.homedir)

console.log(os.version)

// information sur un ficher

console.log(__dirname)

console.log(__filename)

const path = require("path")

console.log(path.dirname(__filename))

console.log(path.basename(__filename))

console.log(path.extname(__filename))

console.log(path.parse(__filename))

const math = require("./math")

console.log(math.divide(10,5))