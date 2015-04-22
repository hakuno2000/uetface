/**
 * Created by Nguyen Le on 4/22/2015.
 */
var express=require('express');
var async=require('async');
var router=express.Router();
var mongoose=require('mongoose');
var isNull=require('./../../isNull');
var userNotLoggedIn=require('./../../users/user_not_logged_in');
router.get('/',userNotLoggedIn,function(req,res,next){
    var subjects =require('./../../data/models/subjects');
    var practice_info =require('./../../data/models/practice_info');
    var theory_info=require('./../../data/models/theory_info');
    if(mongoose.connection.readyState==0) mongoose.connect(dbURL);
    async.parallel([
        function getTheory(cb){
            theory_info.find({}).deepPopulate('thong_tin_mon',{_id:0}).exec(cb);
        },function getPractice(cb){
            practice_info.find({}).deepPopulate('thong_tin_mon',{_id:0}).exec(cb);
        }
    ],function(err, result){
        res.json(result);
    });
})
router.post('/',function(req,res,next){
    var user=require('./../../data/models/user_login');
    user.findOne({token:req.body.token}).exec(function(err,std){
        if(err) res.json({type:'error',content:'Có l?i x?y ra!'});
        else if(isNull(std)){
            res.json({type:'error',content:'Token không t?n t?i.'})
        }else {
            var subjects =require('./../../data/models/subjects');
            var practice_info =require('./../../data/models/practice_info');
            var theory_info=require('./../../data/models/theory_info');
            if(mongoose.connection.readyState==0) mongoose.connect(dbURL);
            async.parallel([
                function getTheory(cb){
                    theory_info.find({}).deepPopulate('thong_tin_mon',{_id:0}).exec(cb);
                },function getPractice(cb){
                    practice_info.find({}).deepPopulate('thong_tin_mon',{_id:0}).exec(cb);
                }
            ],function(err, result){
                res.json(result);
            });
        }
    });
})
module.exports=router;