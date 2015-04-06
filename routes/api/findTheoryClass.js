/**
 * Created by Phi on 3/28/2015.
 */
var express=require('express');
var router=express.Router();
var mongoose=require('mongoose');
var dbURL=require('./../data/dbURL');
var isNull=require('./../isNull');
var async=require('async');
router.get('/',function(req,res){
    var theory=require('./../data/models/theory');
    var theory_info=require('./../data/models/theory_info');
    var subject=require('./../data/models/subjects');
    if(mongoose.connection.readyState==0) mongoose.connect(dbURL);
    //async.waterfall([
    //    function(next){
    //        theory.find({'ma_sinh_vien':req.session.user_id},{_id:0}).exec(next);
    //    },
    //    function(result,next){
    //        var number=result.length;
    //        function callback(value){
    //            result.tiet_bat_dau=value.tiet_bat_dau;
    //        }
    //        for(var i=0;i<result.length;i++){
    //            theory_info.find({ma_lop:result[i].ma_lop},{_id:0},function(err,result3){
    //
    //                if(i>=result.length-1){
    //                    res.json(result);
    //                    console.log(result);
    //                }
    //            })
    //        }
    //    }
    //],function(err,result){
    //    if(err) console.log(err);
    //    res.json(result);
    //})
    theory.find({'ma_sinh_vien':req.session.user_id},{_id:0}).deepPopulate('thong_tin_lop.thong_tin_mon').exec(function(err,result){
        if(err) {
            res.json({type:'error',content:'Lỗi server!'});
        }
        else if(isNull(result)){ res.json({type:'error',content:'Mã sinh viên không tồn tại'});}
        else{
            res.json(result);
        }
    });
});

module.exports=router;