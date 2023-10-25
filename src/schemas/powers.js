const { default: mongoose } = require('mongoose')
const moongose = require('mongoose')

const powersSchema = new moongose.Schema({
    id:{
        type: moongose.SchemaTypes.String,
        required: true
    },
    user: {
        type: moongose.SchemaTypes.Number,
        required: true
    },
    name: {
        type: moongose.SchemaTypes.String,
        required: true
    },
    desc: {
        type: moongose.SchemaTypes.String,
        required: true
    },
    multiplier: {
        type: moongose.SchemaTypes.Number,
        required: true,
        default: 0
    },
    level: {
        type: moongose.SchemaTypes.Number,
        required: true,
        default: 1
    },
    cost: {
        type: moongose.SchemaTypes.Number,
        required: true,
        default: 0
    },
    dt: {
        type: moongose.SchemaTypes.Number,
        required: true
    },
    effect: {
        doEffect: {
            type: Boolean,
            default: false,
            required: true
        },
        effectDamage: {
            type: Number,
            default: 0,
            required: false
        },
        additional: {
            type: Number,
            default: 0,
            required: false
        
        }

    }
})

module.exports = mongoose.model('powers', powersSchema)