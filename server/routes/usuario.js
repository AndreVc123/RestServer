const express = require('express');

const bcrypt = require('bcrypt');

const _ = require( 'underscore' );

const Usuario = require('../models/usuario');

const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

const app = express();



app.get('/usuario', verificaToken ,(req,res)=>{


    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);
    
    Usuario.find({estado: true}, 'nombre email role estado google img').limit(limite).skip(desde).exec((err, usuario) => {
        if(err){
            res.status(400).json({
                ok: false,
                err
            })
        }else{
            Usuario.count({estado: true}, (err, conteo)=>{
                if(err){
                    res.status(400).json({
                        ok: false,
                        err
                    })
                }
                res.json({
                    ok:true,
                    usuario,
                    conteo
                })
            })
        }
    })
})


app.post('/usuario',[verificaToken, verificaAdmin_Role ], function(req, res){
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });


    usuario.save((err, usuarioDB) => {
        if(err){
            res.status(400).json({
                ok: false,
                err
            })
        }else{

            res.status(200).json({
                ok: true,
                usuarioDB
            })
        }
    })

})

app.put('/usuario/:id',verificaToken, (req, res)=> {

    let id = req.params.id;

    let body = _.pick(req.body, ['nombre','email','img','role','estado']);

    // Usuario.findByIdAndUpdate(id, body , {new: true, runValidators: true },(err, usuarioDB) => {


    Usuario.findByIdAndUpdate(id, body , {new: true, runValidators: true },(err, usuarioDB) => {

        if(err){
            res.status(400).json({
                ok: false,
                err
            })
        }else{

            res.status(200).json({
                ok: true,
                usuarioDB
            })
        }
    })

})

app.delete('/usuario/:id',[verificaToken, verificaAdmin_Role], (req, res) => {

    let id = req.params.id;

    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado)=>{
    
    let cambiaEstado = {
        estado: false
    }

    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado)=>{
        if(err){
            res.status(400).json({
                ok: false,
                err
            })
        }else{
            res.json({
                ok:true,
                usuarioBorrado
            })
        }
    })

})


module.exports = app;