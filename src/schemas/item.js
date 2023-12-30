const { default: mongoose } = require('mongoose')
const moongose = require('mongoose')

const itemSchema = new moongose.Schema({
    id: {
        type: moongose.SchemaTypes.Number,
        required: true
    },
    itemID: {
        type: moongose.SchemaTypes.Number,
        required: true
    },
    name: {
        type: moongose.SchemaTypes.String,
        required: true
    },
    price: {
        type: moongose.SchemaTypes.Array,
        required: true
    },
    weight: {
            type: moongose.SchemaTypes.Boolean,
            required: true,
            default: false
    },
    doesDamage:{
        type: moongose.SchemaTypes.Boolean,
        required: true,
        default: false
    },
    damage:{
        type: moongose.SchemaTypes.Number,
        required: false
    },
    desc: {
        type: moongose.SchemaTypes.String,
        required: true
    }




})

module.exports = mongoose.model('item', itemSchema)