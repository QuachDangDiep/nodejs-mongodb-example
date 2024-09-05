const mongoose = require('mongoose');
// Cấu trúc của các Field trong collection
const itemChema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    descripstion:{
        type:String,
        require:true,
    },
    price:{
        type:Number,
        require:true,
    }
});
module.exports = mongoose.model('Item',itemChema);