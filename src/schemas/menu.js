const { default: mongoose } = require('mongoose')
const moongose = require('mongoose')

const menuSchema = new moongose.Schema({

    id: {
        type: String,
        required: true,
    },
    name: {
        type: moongose.SchemaTypes.String,
        required: true,

    },
    symbol: {
        type: moongose.SchemaTypes.String,
        required: true,

    },
    desc: {
        type: moongose.SchemaTypes.String,
        required: true,

    },
    value: {
        type: moongose.SchemaTypes.String,
        required: true,

    }
})

module.exports = mongoose.model('menu', menuSchema)