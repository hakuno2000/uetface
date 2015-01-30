/**
 * Created by Phi on 1/30/2015.
 */
var express=require('express');
var router=express.Router();

router.get('/',function(req,res,next){
    res.render('evaluation');
});
router.post('/',function(req,res,next){
    res.render('evaluation');
});
module.exports=router;