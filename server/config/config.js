

// Puerto

process.env.PORT = process.env.PORT || 3000;


// Entorno

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// Vencimiento del token

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;


// SEED de autenticación

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

// Base de datos

let urlBD;

if(process.env.NODE_ENV === 'dev'){
    urlBD = 'mongodb://localhost:27017/cafe'; 
}else{
    urlBD = process.env.MONGO_URI;
}

process.env.URLDB = urlBD;

// Google Client ID

process.env.CLIENT_ID = process.env.CLIENT_ID ||  '950967835442-ka1p00k78pvpu9k6rcrgp0rqom1lgio1.apps.googleusercontent.com'