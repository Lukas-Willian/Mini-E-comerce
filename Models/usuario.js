const db = require('./db');






const usuarios = db.sequelize.define('usuarios' , {
    nome:{
        type:db.Sequelize.STRING
    },
    sobrenome:{
        type:db.Sequelize.STRING
    },
    email:{
        type:db.Sequelize.STRING
    },

    senha:{
        type:db.Sequelize.STRING
    },
});

module.exports = usuarios