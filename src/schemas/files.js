const { default: mongoose } = require('mongoose')
const moongose = require('mongoose')

const filesSchema = new moongose.Schema({
    nome: {
        type: moongose.SchemaTypes.String,
        required: true
    },
    classe: {
        type: moongose.SchemaTypes.String,
        required: true
    },
    discordID: {
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    vida: {
        type: Number,
        required: true,
        default: 100
    },
    mana: {
        type: Number,
        required: true,
        default: 50
    },
    desc: {
        type: String,
        required: false
    },
    attributes: {
        furtividade: {
            type: Number,
            required: true,
            default: 0
        },
        brutalidade: {
            type: Number,
            required: true,
            default: 0
        }

    }
})

module.exports = mongoose.model('filesHazen', filesSchema)