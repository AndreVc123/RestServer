require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

const bodyParser = require('body-parser');

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// Parse application/json
app.use(bodyParser.json());

//Habilitar carpeta public

app.use( express.static(path.resolve(__dirname , '../public')) )

// Configuración global de rutas
app.use( require('./routes/index'));


mongoose.connect(process.env.URLDB, {useNewUrlParser: true, useCreateIndex: true},(err)=>{
        if(err) throw err;

        console.log('Base de datos ONLINE')
});

app.listen(process.env.PORT, ()=> {
    console.log('Escuchando puerto: ', 3000)
})