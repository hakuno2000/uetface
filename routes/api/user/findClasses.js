/**
 * Created by PHI on 4/4/2015.
 */
var express=require('express');
var async=require('async');
var router=express.Router();
var mongoose=require('mongoose');
var dbURL=require('./../../data/dbURL');
var isNull=require('./../../isNull');
var deepPopulate = require('mongoose-deep-populate');
router.get('/',function(req,res){
    var subjects =require('./../../data/models/subjects');
    var practice_info =require('./../../data/models/practice_info');
    var theory_info=require('./../../data/models/theory_info');
    var theory=require('./../../data/models/theory');
    var practice=require('./../../data/models/practice');
    if(mongoose.connection.readyState==0) mongoose.connect(dbURL);
    async.parallel([
        function getTheory(cb){
            theory.find({'ma_sinh_vien':req.session.user_id},{_id:0}).deepPopulate('thong_tin_lop.thong_tin_mon',{_id:0}).exec(cb);
        },function getPractice(cb){
            practice.find({'ma_sinh_vien':req.session.user_id},{_id:0}).deepPopulate('thong_tin_lop.thong_tin_mon',{_id:0}).exec(cb);
        }
    ],function(err, result){
        if (err) return console.error(err);
        res.json(result);
    });
});
module.exports=router;