const { default: mongoose } = require('mongoose')
const moongose = require('mongoose')

const classesSchema = new moongose.Schema({
    nome: {
        type: moongose.SchemaTypes.String,
        required: true
    },
    desc: {
        type: moongose.SchemaTypes.String,
        required: true
    },
    ID: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    image: {
        type: moongose.SchemaTypes.String,
        required: false
    }
})

module.exports = mongoose.model('classes', classesSchema)