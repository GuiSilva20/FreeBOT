const { default: mongoose } = require('mongoose')
const moongose = require('mongoose')

const filesSchema = new moongose.Schema({
    nome: {
        type: moongose.SchemaTypes.String,
        required: true
    },
    image: {
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
    elemento: {
        type: String,
        required: true
    },
    elementoID: {
        type: Number,
        required: false
    },
    estrutura: {
        força: {
            type: Number,
            required: true,
            default: 1
        },
        agilidade: {
            type: Number,
            required: true,
            default: 1
        },
        espirito: {
            type: Number,
            required: true,
            default: 1
        },
        inteligencia: {
            type: Number,
            required: true,
            default: 1
        }
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
        },
        fortitude: {
            type: Number,
            required: true,
            default: 0
        },
        presença: {
            type: Number,
            required: true,
            default: 0
        },
        crime: {
            type: Number,
            required: true,
            default: 0
        }, 
        reflexos: {
            type: Number,
            required: true,
            default: 0
        },
        atualidades: {
            type: Number,
            required: true,
            default: 0
        },
        pericia: {
            type: Number,
            required: true,
            default: 0
        }


    },
    dano: {
        danoTotal: {
            type: Number,
            required: true,
            default: 0
        },
        dano: {
            type: String,
            required: true,
           
        }
        
    }
})

module.exports = mongoose.model('filesHazen', filesSchema)