/**
 * Created by Phi on 2/16/2015.
 */
var express=require('express');
var router=express.Router();
var mysql=require('mysql');
var connect=require('./../../mysql/connectDB');
router.get('/',function(req,res,next){
    var listclass=connect(mysql);
    listclass.query('select * from monhoc',function(err,rows,fields){
        if(err) ;
        res.json(rows);
    });
    listclass.end();
});

module.exports=router;