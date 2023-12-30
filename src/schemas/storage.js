const { default: mongoose } = require('mongoose')
const moongose = require('mongoose')

const storageSchema = new moongose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    info: {
        type: String,
        required: true
    },
    messageID: {
        type: String,
        required: false
    },
    channelID: {
        type: String,
        required: false
    },
    playerID: {
        type: Number,
        required: true
    },
   
})

module.exports = mongoose.model('storage', storageSchema)