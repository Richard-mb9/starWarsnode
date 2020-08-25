const mongose = require('mongoose');
const mongoose = require('../db');


const planetaSchema = new mongose.Schema({
    nome:{
        type:String,
        require:true
    },
    clima:{
        type:String,
        required:true
    },
    terreno:{
        type:String,
        required:true
    }
});


const planeta = mongoose.model('planetas',planetaSchema);

module.exports = planeta;