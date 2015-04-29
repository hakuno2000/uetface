/**
 * Created by PHI on 3/22/2015.
 */
var express=require('express');
var router=express.Router();
var user_new=require('./user_new');
var find_dgmh=require('./find_dgmh');
var find_class=require('./findClasses');
var create_dgmh=require('./create_dgmh');
var add_class=require('./add_class');
var remove_class=require('./remove_class');
var get_class=require('./get_class');
var lich_thi=require('./lich_thi');
var update_evaluate=require('./update_dgmh');
var delete_evaluate=require('./delete_dgmh');

router.use('/delete_evaluate',delete_evaluate);
router.use('/update_evaluate',update_evaluate);
router.use('/lich_thi',lich_thi);
router.use('/get_class',get_class);
router.use('/remove_class',remove_class);
router.use('/add_class',add_class);
router.use('/new',user_new);
router.use('/find_evaluate',find_dgmh);
router.use('/find_class',find_class);
router.use('/create_evaluate',create_dgmh);
module.exports=router;