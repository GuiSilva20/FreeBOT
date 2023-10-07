const { default: mongoose } = require('mongoose')
const moongose = require('mongoose')

const godsSchema = new moongose.Schema({

    id: {
        type: Number,
        required: true,
        default: 1
    },
    name: {
        type: moongose.SchemaTypes.String,
        required: false,

    },
    symbol: {
        type: moongose.SchemaTypes.String,
        required: false,

    },
    element: {
        type: moongose.SchemaTypes.String,
        required: false,

    },
    desc: {
        type: moongose.SchemaTypes.String,
        maxLength: 2000,
        required: false,

    },
    image: {
        type: moongose.SchemaTypes.String,
        required: false,

    },
    kingdom: {
        type: moongose.SchemaTypes.String,
        required: false
    },
    option: {
        type: moongose.SchemaTypes.String,
        required: true
    }
})

module.exports = mongoose.model('deuses', godsSchema)