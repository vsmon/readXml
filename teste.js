const xml2js = require('xml2js')
const fs = require('fs')

const xml = fs.readFileSync('./teste.xml')

xml2js.parseString(xml, (error, result) => {
    console.log(result)
})