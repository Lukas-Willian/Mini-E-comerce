const db = require('./db');

const Post = db.sequelize.define('produtos' ,{
    titulo:{
        type:db.Sequelize.STRING
    },
    preço:{
        type:db.Sequelize.INTEGER
    },
    descrição:{
        type:db.Sequelize.TEXT
    }
    
});

module.exports = Post