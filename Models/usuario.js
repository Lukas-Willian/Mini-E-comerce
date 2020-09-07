const db = require('./db');
const bcrypt = require('bcrypt');






const user = db.sequelize.define('usuarios' , {
    firstName: {
        type: db.Sequelize.STRING,
        field: 'first_name'
    },
    lastName: {
        type:   db.Sequelize.STRING,
        field: 'last_name'
    },
    eAdimim:{
        type:db.Sequelize.INTEGER,
        defaultValue: 1
    },
    email: db.Sequelize.STRING,
    password: db.Sequelize.STRING
}, {
    hooks:{
        beforeCreate: user =>{
            const salt = bcrypt.genSaltSync();
            user.set("password" , bcrypt.hashSync(user.password , salt))
        }
    },
    classMethods : {
        isPassword: (encodedPassword , password) =>bcrypt.compareSync(password , encodedPassword)
    }
        
    
})     



module.exports = user







