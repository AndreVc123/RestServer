

// Puerto

process.env.PORT = process.env.PORT || 3000;


// Entorno

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Base de datos

let urlBD;

if(process.env.NODE_ENV === 'dev'){
    urlBD = 'mongodb://localhost:27017/cafe'; 
}else{
    urlBD = 'mongodb+srv://LearningCourse:Italia-12394@cluster0.upqbb.mongodb.net/cafe?retryWrites=true&w=majority';
}

process.env.URLDB = urlBD;