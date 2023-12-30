const { default: mongoose } = require('mongoose')
const moongose = require('mongoose')

const filesSchema = new moongose.Schema({
    cost: {
        type: moongose.SchemaTypes.Number,
        required: true,
        default: 10
    },
    nome: {
        type: moongose.SchemaTypes.String,
        required: true,
        default: "Vazio"
    },
    level: {
        type: mongoose.SchemaTypes.Number,
        required: true,
        default: 0
    },
    species: {
        type: moongose.SchemaTypes.String,
        required: true,
        default: "Vazio"
    },
    xp: {
        type: mongoose.SchemaTypes.Number,
        required: true,
        default: 0
    },
    image: {
        type: moongose.SchemaTypes.String,
        required: true,
        default: "Vazio"
    },
    studyPath: {
        type: moongose.SchemaTypes.String,
        required: true,
        default: "X0"
    },
    classe: {
        type: moongose.SchemaTypes.String,
        required: true,
        default: "Vazio"
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
    DEF: {
        type: Number,
        required: true,
        default: 0,
      
    },
    DES: {
        type: Number,
        required: true,
        default: 0,
     
    },
    desc: {
        type: String,
        required: false,
        default: "Vazio"
    },
    elemento: {
        type: String,
        required: true,
        default: "Vazio"
    },
    elementoID: {
        type: Number,
        required: false,
        default: 0
    },
    estrutura: {
        força: {
            type: Number,
            required: true,
            default: 0
        },
        agilidade: {
            type: Number,
            required: true,
            default: 0
        },
        espirito: {
            type: Number,
            required: true,
            default: 0
        },
        inteligencia: {
            type: Number,
            required: true,
            default: 0
        },
        sabedoria: {
            type: Number,
            required: true,
            default: 0
        }
    },
    attributes: {
        ESP: {
            vontade: {
                type: Number,
                required: true,
                default: 0
            },
            conjuracao: {
                type: Number,
                required: true,
                default: 0
            },
            intimidaçao: {
                type: Number,
                required: true,
                default: 0
            },
            presenca: {
                type: Number,
                required: true,
                default: 0
            }
        },
        SAB: {
            percepcao: {
                type: Number,
                required: true,
                default: 0
            },
            sobrevivencia: {
                type: Number,
                required: true,
                default: 0
            },
            localizacao: {
                type: Number,
                required: true,
                default: 0
            },
            crime: {
                type: Number,
                required: true,
                default: 0
            },
        },
        INT: {
            intuicao: {
                type: Number,
                required: true,
                default: 0
            },
            diplomacia: {
                type: Number,
                required: true,
                default: 0
            },
            atualidades: {
                type: Number,
                required: true,
                default: 0
            }
        },
        AGI: {
            atletismo: {
                type: Number,
                required: true,
                default: 0
            },
            acrobacia: {
                type: Number,
                required: true,
                default: 0
            },
            furtividade: {
                type: Number,
                required: true,
                default: 0
            },
            reflexos: {
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
        FOR: {
            vigor: {
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
            }
        }


    },
    dano: {
        danoTotal: {
            type: Number,
            required: true,
            default: 1
        },
        dano: {
            type: String,
            required: true,
           
        }
        
    }
})

module.exports = mongoose.model('filesHazen', filesSchema)