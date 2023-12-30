const { default: mongoose } = require('mongoose')
const moongose = require('mongoose')

const xpSchema = new moongose.Schema({
    level: {
        type: Number,
        required: true
     },
     xp:{
        type: Number,
        required: true
     },
    
   
})

module.exports = mongoose.model('xp', xpSchema)