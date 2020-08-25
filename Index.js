const express = require('express');
const app = express();
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');



//config
app.use('/static' , express.static('public'))
app.post('/' , function(req,res){
    res.sendFile(__dirname + '/Index.html')
})

app.post('/cadastro' , function(req , res){
    res.sendFile(__dirname+'/Produtos.html');
    
    
})




//conexão de banco de dados
    const sequelize = new Sequelize('produtos' , 'root' , '123Lukas@',{
        host: 'localhost',
        dialect:'mysql'
    });

    sequelize.authenticate().then(function(){
        console.log('Connect')
    }).catch(function(erro){
        console.log('falha ao se conectar:' + erro)
    })















app.listen(8080,function(){
    console.log('Server is starting in http://localhoost:8080')
})
