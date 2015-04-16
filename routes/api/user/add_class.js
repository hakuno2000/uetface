/**
 * Created by Phi on 4/16/2015.
 */
var express=require('express');
var async=require('async');
var router=express.Router();
var mongoose=require('mongoose');
var isNull=require('./../../isNull');
function userNotLoggedIn(req,res,next){
    if(!req.session.username){
        res.redirect('/');
    }else{
        next();
    }
}
router.post('/',userNotLoggedIn,function(req,res,next){
    if(req.body.class_id&&req.body.class_id!=''&&req.body.ghi_chu&&req.body.ghi_chu!=''){
        var subjects =require('./../../data/models/subjects');
        var practice_info =require('./../../data/models/practice_info');
        var theory_info=require('./../../data/models/theory_info');
        var theory=require('./../../data/models/theory');
        var practice=require('./../../data/models/practice');
        if(mongoose.connection.readyState==0) mongoose.connect(dbURL);
        async.parallel([
            function getTheory(cb){
                theory.findOne({ma_lop:req.body.class_id,ghi_chu:req.body.ghi_chu},{_id:0}).deepPopulate('thong_tin_lop.thong_tin_mon',{_id:0}).exec(cb);
            },function getPractice(cb){
                practice.findOne({ma_lop:req.body.class_id,ghi_chu:req.body.ghi_chu}).deepPopulate('thong_tin_lop.thong_tin_mon',{_id:0}).exec(cb);
            }
        ],function(err, result){
            if (err) return console.error(err);
            //process save class
            if(isNull(result[0])){

            }else{

            }
        });
    }
});

module.exports=router;