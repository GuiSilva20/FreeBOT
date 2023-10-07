const { default: mongoose } = require('mongoose')
const moongose = require('mongoose')

const battleSchema = new moongose.Schema({

    id: {
        type: Number,
        required: true,
        default: 1
    },
    battleMode: {
        type: moongose.SchemaTypes.Boolean,
        required: true,
        default: false
   }
})

module.exports = mongoose.model('battle', battleSchema)