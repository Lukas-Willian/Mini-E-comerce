const localStrategy = require('passport-local').Strategy;
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

//Model de usario
const usuario = require("../Models/usuario");
const user = require('../Models/usuario');



module.exports = function(passport){
passport.use(new localStrategy({usernameField : 'email'} , (email , password , done) =>{

    usuario.findOne({where :{
        'email' : email
    }}).then((usuario) =>{
        if(!usuario){
            return done(null , false , {message : "Esta conta não existe"})
        }

        bcrypt.compare(password , usuario.password , function (erro , batem)  {
            if(batem){
                return done(null , usuario)
            }else{
                return done(null , false , {message: "Senha incorreta"})
            }
        })
    })
}));



passport.serializeUser((usuario, done) => {
    done(null , usuario.id)
})

passport.deserializeUser((usuario, done) =>{   //(id, done)
    done(null, usuario)
   })
}