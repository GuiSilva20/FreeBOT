const { default: mongoose } = require('mongoose')
const moongose = require('mongoose')

const goldSchema = new moongose.Schema({
    coin: {
     id:{
        type: Number,
        required: true
     },
     name:{
        type: String,
        required: true
     },
    }
   
})

module.exports = mongoose.model('gold', goldSchema)