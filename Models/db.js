const Sequelize = require('sequelize');

const sequelize = new Sequelize('produtoApp' , 'root' , '123Lukas@',{
    host: 'localhost',
    dialect:'mysql',
});

sequelize.authenticate().then(function(){
    console.log('Connect')
}).catch(function(erro){
    console.log('falha ao se conectar:' + erro)
})

module.exports = {
    Sequelize:Sequelize,
    sequelize:sequelize
}
