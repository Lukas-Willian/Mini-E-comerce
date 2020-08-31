const db = require('./db');






const Roupas = db.sequelize.define('roupas' , {
    tituloRoupas:{
        type:db.Sequelize.STRING
    },
    preçoRoupas:{
        type:db.Sequelize.INTEGER
    },
    descriçãoRoupas:{
        type:db.Sequelize.STRING
    },
    categoriasRoupas:{
        type:db.Sequelize.STRING
    },
    imagesRoupas:{
        type:db.Sequelize.STRING
    }
});

Roupas.sync(FORCE = 'true')
module.exports = Roupas