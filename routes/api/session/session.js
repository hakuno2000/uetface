/**
 * Created by PHI on 3/22/2015.
 */
var express=require('express');
var router=express.Router();
var ss_delete=require('./ss_delete');
var ss_new=require('./ss_new');
router.use('/delete',ss_delete);
router.use('/new',ss_new);
module.exports=router;