/**
 * Created by PHI on 3/22/2015.
 */
var express=require('express');
var router=express.Router();
var user_new=require('./user_new');
router.use('/new',user_new);
module.exports=router;