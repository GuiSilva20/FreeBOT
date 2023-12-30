const { default: mongoose } = require('mongoose')
const moongose = require('mongoose')

const invSchema = new moongose.Schema({
    id:{
        type: moongose.SchemaTypes.Number,
        required: true
    },
    gold: {
        type: moongose.SchemaTypes.String,
        required: true
    },
    invMAX: {
        type: moongose.SchemaTypes.String,
        required: true
    },
    invUSE: {
        type: moongose.SchemaTypes.String,
        required: true
    },
    lotter:{
       item: {
        type: moongose.SchemaTypes.String,
        required: true
       },
       jade:{
        type: moongose.SchemaTypes.Number,
        required: true,
        default: 0
       },
       steel:{
        type: moongose.SchemaTypes.Number,
        required: true,
        default: 0
       },
       gold:{
        type: moongose.SchemaTypes.Number,
        required: true,
        default: 0
       },
       silver:{
        type: moongose.SchemaTypes.Number,
        required: true,
        default: 0
       },
       bronze:{
        type: moongose.SchemaTypes.Number,
        required: true,
        default: 0
       },
       iron:{
        type: moongose.SchemaTypes.Number,
        required: true,
        default: 0
       },
    }


   
})

module.exports = mongoose.model('inventory', invSchema)