/**
 * Created by PHI on 1/28/2015.
 */
var express=require('express');
var router=express.Router();

router.get('/',function(req,res){
    if(req.session.username){
        req.session.destroy(function(err){
            if(err) {
                throw err;
            }else{
                res.redirect('/');
            }
        })
    }else if(req.session.level){
        req.session.destroy(function(err){
            if(err) {
                throw err;
            }else{
                res.redirect('/admin');
            }
        })
    }
    else{
        res.redirect('/');
    }
});

module.exports=router;