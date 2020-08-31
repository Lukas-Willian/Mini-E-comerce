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
    },
    categorias:{
        type:db.Sequelize.STRING
    },
    images:{
        type:db.Sequelize.STRING
    }
    
});





module.exports = Post;

