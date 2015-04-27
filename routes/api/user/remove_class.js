/**
 * Created by PHI on 4/18/2015.
 */
var express=require('express');
var async=require('async');
var router=express.Router();
var mongoose=require('mongoose');
var isNull=require('./../../isNull');
var userNotLoggedIn=require('./../../users/user_not_logged_in');
router.post('/',userNotLoggedIn,function(req,res,next){
    if(req.body.class_id&&req.body.class_id!=''&&req.body.ghi_chu&&req.body.ghi_chu!=''){
        var subjects =require('./../../data/models/subjects');
        var theory=require('./../../data/models/theory');
        var practice=require('./../../data/models/practice');
        if(mongoose.connection.readyState==0) mongoose.connect(dbURL);
        async.parallel([
            function getTheory(cb){
                theory.findOne({ma_lop:req.body.class_id,ghi_chu:req.body.ghi_chu,ma_sinh_vien:req.session.user_id}).exec(cb);
            },function getPractice(cb){
                practice.findOne({ma_lop:req.body.class_id,ghi_chu:req.body.ghi_chu,ma_sinh_vien:req.session.user_id}).exec(cb);
            }
        ],function(err, result){
            if (err) return console.error(err);
            //process save class
            if(isNull(result[0])){
                practice.remove({ma_lop:req.body.class_id,ma_sinh_vien:req.session.user_id,ghi_chu:req.body.ghi_chu}).exec(function(err,result){
                    if(err) res.json('Đã có lỗi xảy ra!');
                    else{
                        res.json('Xóa môn thành công!');
                    }
                })
            }else{
                theory.remove({ma_lop:req.body.class_id,ma_sinh_vien:req.session.user_id,ghi_chu:req.body.ghi_chu}).exec(function(err,result){
                    if(err) res.json('Đã có lỗi xảy ra!');
                    else{
                        res.json('Xóa môn thành công!');
                    }
                })
            }
        });
    }else{
        res.json('Bạn đã nhập thiếu thông tin!');
    }
});
router.post('/',userNotLoggedIn,function(req,res,next){
    if(req.body.class_id&&req.body.class_id!=''&&req.body.ghi_chu&&req.body.ghi_chu!=''){
        var subjects =require('./../../data/models/subjects');
        var theory=require('./../../data/models/theory');
        var practice=require('./../../data/models/practice');
        if(mongoose.connection.readyState==0) mongoose.connect(dbURL);
        async.parallel([
            function getTheory(cb){
                theory.findOne({ma_lop:req.body.class_id,ghi_chu:req.body.ghi_chu,ma_sinh_vien:req.session.user_id}).exec(cb);
            },function getPractice(cb){
                practice.findOne({ma_lop:req.body.class_id,ghi_chu:req.body.ghi_chu,ma_sinh_vien:req.session.user_id}).exec(cb);
            }
        ],function(err, result){
            if (err) return console.error(err);
            //process save class
            if(isNull(result[0])){
                practice.remove({ma_lop:req.body.class_id,ma_sinh_vien:req.session.user_id,ghi_chu:req.body.ghi_chu}).exec(function(err,result){
                    if(err) res.json('Đã có lỗi xảy ra!');
                    else{
                        res.json('Xóa môn thành công!');
                    }
                })
            }else{
                theory.remove({ma_lop:req.body.class_id,ma_sinh_vien:req.session.user_id,ghi_chu:req.body.ghi_chu}).exec(function(err,result){
                    if(err) res.json('Đã có lỗi xảy ra!');
                    else{
                        res.json('Xóa môn thành công!');
                    }
                })
            }
        });
    }else{
        res.json('Bạn đã nhập thiếu thông tin!');
    }
});
module.exports=router;