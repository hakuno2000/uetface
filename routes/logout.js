/**
 * Created by PHI on 1/28/2015.
 */
var express=require('express');
var router=express.Router();

router.get('/',function(req,res){
    if(req.session){
        req.session.destroy(function(err){
            if(err) {
                throw err;
            }else{
                res.redirect('/');
            }
        })
    }
    else{
        res.redirect('/');
    }
});

module.exports=router;