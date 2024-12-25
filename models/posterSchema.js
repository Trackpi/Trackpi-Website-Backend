const mongoose = require('mongoose');

const posterSchema = new mongoose.Schema({
    postername:{
        type:String,
        required:true
    },
    posterimage:{
        type:String,
        required:true
    }
})

const posters = mongoose.model('posters',posterSchema)
module.exports=posters
