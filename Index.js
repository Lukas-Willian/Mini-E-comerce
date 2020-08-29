const express = require('express');
const app = express();
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars')
const Post = require('./Models/Post');


//Tamplate engine
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');


//Config
    //Body-parser
    app.use(bodyParser.urlencoded({extended:false}));
    app.use(bodyParser.json())


//methods
app.use('/static' , express.static('public'))
app.use('/static' , express.static('js'))


    //change pages
        //Inicial
        app.get('/' , function(req,res){
            
            Post.findAll().then(function(posts){
                res.render('home' , {posts:posts})
            })
            })
            
        
        


        //Cadastro
        app.get('/cadastro' , function(req , res) {
        res.render('Produtos')
        })

        app.get('/' , function(req,res){
            
            Post.findAll().then(function(posts){
                res.render('home' , {posts:posts})
            })
        })


        //Dados
        app.post('/dados' , function(req,res){

            
            Post.create({
                titulo: req.body.nome,
                preço:req.body.preco,
                descrição:req.body.desc

            }).then(function(){
                res.redirect('/')
            }).catch(function(erro){
                res.send('Falha ao cadastrar produto' + erro)
            });
            
        })

        app.get('/deletar/:id' , function(req,res){
            Post.destroy({where: {'id' : req.params.id}}).then(function(){
                res.redirect(req.get('referer'));
            }).catch(function(erro){
                res.send('Essa postagem não existe' + erro)
            })
        })



app.listen(4000,function(){
    console.log('Server is starting in http://localhoost:4000')
})
