const express = require('express');
const app = express();
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars')
const Post = require('./Models/Post');
const Roupas = require('./Models/Roupas')
const multer = require('multer');




//Tamplate engine
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');


//Config
    //Body-parser
    
    app.use(bodyParser.urlencoded({extended:false}));
    app.use(bodyParser.json());


    
//methods
    app.use('/static' , express.static('public'));
    app.use('/CSS' , express.static('CSS'))
    app.use('/js' , express.static('js'));
    app.use('/Uploads' , express.static('Uploads'))

    
    



    //Multer
    
    const storage  =   multer.diskStorage({
    
    destination: function(req , file , cb){
        cb(null , "Uploads/")
    },
    filename: function(req , file , cb){
        cb(null ,file.originalname)
    }
    })

    const upload = multer({storage})




    //change pages
        //Inicial
        app.get('/' , Roupas2 , Posts2 , render);
            function Posts2(req, res , next){
            Post.findAll().then(function(posts){
                res.locals.posts=posts;
                next()
            })
            };

            function Roupas2(req , res , next){
                Roupas.findAll().then(function(roups){
                    res.locals.roups=roups;
                    next()
                })
            }

            function render(req,res){
                res.render('home')
            }


        //Cadastro
        app.get('/cadastro' , function(req , res) {
        res.render('Produtos')
        })


        app.post("/upload" ,upload.single("file"), (req, res) =>{
            if(req.body.select == 'Tenis'){
            Post.create({
                titulo: req.body.nome,
                preço:req.body.preco,
                descrição:req.body.desc,
                categorias:req.body.select,
                images: req.file.path

            }).then(function(){
               
                res.redirect('/')
            }).catch(function(erro){
                res.send('Falha ao cadastrar produto' + erro)
            });
        };
        if(req.body.select == "Roupas"){
            Roupas.create({
                tituloRoupas: req.body.nome,
                preçoRoupas:req.body.preco,
                descriçãoRoupas:req.body.desc,
                categoriasRoupas:req.body.select,
                imagesRoupas: req.file.path

            }).then(function(){
               
                res.redirect('/')
            }).catch(function(erro){
                res.send('Falha ao cadastrar produto' + erro)
            });

        }})



        app.get('/deletarPost/:id' , function(req,res){
            Post.destroy({where: {'id' : req.params.id}}).then(function(){
                res.redirect(req.get('referer'));
            }).catch(function(erro){
                res.send('Essa postagem não existe' + erro)
            })
        });

        app.get('/deletarRoupas/:id' , function(req,res){
            Roupas.destroy({where: {'id' : req.params.id}}).then(function(){
                res.redirect(req.get('referer'));
            }).catch(function(erro){
                res.send('Essa postagem não existe' + erro)
            })
        })


        app.get('/pag/:id' , function(req,res){
            
            Roupas.findOne({where:{
                'id' : req.params.id
            }} 
            ).then(function(id){
                console.log(id.imagesRoupas)
               res.render('pags' , {
                nome : id.tituloRoupas,
                Preço: id.preçoRoupas,
                Image: id.imagesRoupas})
               
               
            }).catch(function(erro){
                res.send('Não encontramos este arquivo')
            })
           

        })




        







app.listen(4000,function(){
    console.log('Server is starting in http://localhoost:4000')
})
