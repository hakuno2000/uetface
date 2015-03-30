/**
 * Created by PHI on 3/21/2015.
 */
var express=require('express');
var router=express.Router();
var findStudentById=require('./findStudentById');
var findSubjectById=require('./findSubjectById');
var findTheoryClass=require('./findTheoryClass');
var findPracticeClass=require('./findPracticeClass');
var session=require('./session/session');
var user=require('./user/user');

//routes
router.use('/findSubjectById',findSubjectById);
router.use('/findStudentById',findStudentById);
router.use('/findtheoryclass',findTheoryClass);
router.use('/findPracticeClass',findPracticeClass);
router.use('/user',user);
router.use('/session',session);
module.exports=router;