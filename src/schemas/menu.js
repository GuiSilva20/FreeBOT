const { default: mongoose } = require('mongoose')
const moongose = require('mongoose')

const menuSchema = new moongose.Schema({

    id: {
        type: Number,
        required: true,
        default: 1
    },
    name: {
        type: moongose.SchemaTypes.String,
        required: true,

    },
    symbol: {
        type: moongose.SchemaTypes.String,
        required: true,

    },
    element: {
        type: moongose.SchemaTypes.String,
        required: true,

    },
    desc: {
        type: moongose.SchemaTypes.String,
        required: true,

    },
    image: {
        type: moongose.SchemaTypes.String,
        required: true,

    },
    kingdom: {
        type: moongose.SchemaTypes.String,
        required: true
    }
})

module.exports = mongoose.model('menu', menuSchema)