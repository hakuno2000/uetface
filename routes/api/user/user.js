/**
 * Created by PHI on 3/22/2015.
 */
var express=require('express');
var router=express.Router();
var user_new=require('./user_new');
var find_dgmh=require('./find_dgmh');
var find_class=require('./findClasses');

router.use('/new',user_new);
router.use('/find_evaluate',find_dgmh);
router.use('/find_class',find_class);

module.exports=router;