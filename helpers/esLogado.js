module.exports = {
    eAdmim : function(req , res , next){
        if(req.isAuthenticated()){
            return next()
        }

        res.render('needLog')
    }
}