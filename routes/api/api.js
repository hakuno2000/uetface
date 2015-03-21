/**
 * Created by PHI on 3/21/2015.
 */
var express=require('express');
var router=express.Router();
var findById=require('./findById');
router.use('/findById',findById);
module.exports=router;