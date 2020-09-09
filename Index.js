const express = require('express');
const app = express();
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars')
const Post = require('./Models/Post');
const Roupas = require('./Models/Roupas')
const usuarios = require('./Models/usuario')
const multer = require('multer');
const bcrypt = require('bcrypt');
const session = require('express-session');
const flash = require('connect-flash');
const PostarProduto = require('./controller/Post-produtos');
const passport = require('passport');
require("./config/auth")(passport);
const {eAdmim} = require("./helpers/esLogado");




//Sessão

app.use(session({
    secret:"curso",
    resave:true,
    saveUninitialized:true
}))


app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

//middleware
app.use((req , res , next)=>{
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg") 
    res.locals.user = req.user || null
    next() 
})

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
        app.get('/cadastro' ,eAdmim, function(req , res) {
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

        app.get('/usuario/cadastrar' , function(req, res){
            res.render('Cadastro')
        })
        app.get('/usuario/entrar' , function(req,res){
            res.render('Entrar')
        })
        app.get('/sucesso' , function(req , res) {
            res.render('Sucesso')
        })
        app.get('/error' , function(req, res){
            res.render('Error')
        })



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


        app.get('/pag/roupas/:id' , function(req,res){
            
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
           

        });

        app.get('/pag/tenis/:id' , function(req , res){
            Post.findOne({where:{
                'id' :req.params.id
            }}
            ).then(function(id){
                res.render('pags' , {
                    nome: id.titulo,
                    Preço: id.preço,
                    Image : id.images
                    
                })
            })
        })

        app.get('/categorias/calcados' , function(req,res){
            Post.findAll().then(function(tens){
                res.render('viewall' , {
                    tens:tens,
                    images: tens.image
                })
            })
        })

        app.get('/categorias/roupas' , function(req , res){
            Roupas.findAll().then(function(roups){
                res.render('viewall' , {
                    roups:roups
                })
            })
        })

        app.post('/usuario/CadastrarConta' , function(req , res){
            if(req.body.Nome == '' || req.body.Sobrenome == '' || req.body.email == ''){
                res.send('Preencha todos os campos correntamente')
            }
 

        usuarios.findOne({where : {
            'email' :req.body.email
        }}).then((user)=>{
            if(user){
                res.render('Error')
            }else{
                usuarios.create({
                    firstName: req.body.Nome,
                    lastName : req.body.Sobrenome,
                    email : req.body.email,
                    password: req.body.password
                });
                res.redirect('/sucesso')
                }
            })
        
   
        })

        app.post('/usuario/LogarConta' , (req , res , next) =>{
            passport.authenticate("local" , {
                successRedirect: "/",
                failureRedirect: "/error"
            })(req, res , next)
        })

        app.get('/logout' , function(req , res){
            req.logOut()
            res.redirect('/')
        })

        app.get('/favoritar/:id',eAdmim , function(req , res){
            Post.findOne({where: {
                'id' : req.params.id
            }}).then(function(id){
                id.favorito = true;
                id.save();
                res.redirect('/');

            })
        });
        app.get('/desfavoritar/:id' , function(req,res){
            Post.findOne({where:{
                'id' : req.params.id
            }}).then(function(id){
                id.favorito = false;
                id.save();
                setTimeout(function(){ res.redirect(req.get('referer')); }, 1000);

               
            })
        })

        
        app.get('/favoritos' , eAdmim , function(req , res){
            Post.findAll({where:{
                favorito : true
            }}).then(function(favorits){
                
                res.render('favoritos' ,{
                    favorits : favorits
                } )
            })
        });


        app.get('/account' ,  function(req , res){
            res.render('My_acout')
        })

        


        



app.listen(4000,function(){
    console.log('Server is starting in http://localhoost:4000')
})
