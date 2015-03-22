/**
 * Created by PHI on 3/21/2015.
 */
var express=require('express');
var router=express.Router();
var findById=require('./findById');
var session=require('./session/session');
var user=require('./user/user');
router.use('/findById',findById);
router.use('/user',user);
router.use('/session',session);
module.exports=router;