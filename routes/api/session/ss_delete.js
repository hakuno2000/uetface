/**
 * Created by PHI on 3/22/2015.
 */
var express=require('express');
var router=express.Router();
router.post('/',function(req,res){
    res.json({api:'API has done!'});
});
module.exports=router;