const express = require('express')
const xml2js = require('xml2js')
const parser = require('fast-xml-parser')
const fs = require('fs')
const he = require('he')

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    const xml = fs.readFileSync('./teste.xml')
    const options = {
        attributeNamePrefix : "@_",
        attrNodeName: "attr", //default is 'false'
        textNodeName : "#text",
        ignoreAttributes : true,
        ignoreNameSpace : false,
        allowBooleanAttributes : false,
        parseNodeValue : true,
        parseAttributeValue : false,
        trimValues: true,
        cdataTagName: "__cdata", //default is 'false'
        cdataPositionChar: "\\c",
        localeRange: "", //To support non english character in tag/attribute values.
        parseTrueNumberOnly: false,
        attrValueProcessor: a => he.decode(a, {isAttributeValue: true}),//default is a=>a
        tagValueProcessor : a => he.decode(a) //default is a=>a
    }
    const json = parser.parse(xml.toString(), options)
    
    const dados = json.nfeProc.NFe.infNFe
    
    res.json(dados)
})


app.listen(3000, () => console.log('Executando na porta 3000'))
