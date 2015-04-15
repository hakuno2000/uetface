/**
 * Created by PHI on 4/3/2015.
 */
var express=require('express');
var router=express.Router();
var mongoose=require('mongoose');
var dbURL=require('./../data/dbURL');
var isNull=require('./../isNull');
router.get('/:tea_id',function(req,res){
    var rq_id=req.params.tea_id;
    var teacher=require('./../data/models/teacher');
    if(mongoose.connection.readyState==0) mongoose.connect(dbURL);

    teacher.find({ma_giang_vien:new RegExp(rq_id,'i')},{_id:0,ma_giang_vien:1,ho_va_ten:1}).exec(function(err,result2){
        if(err) {
            res.json({type:'error',content:'Lỗi server!'});
        }
        if(isNull(result2)){
            teacher.find({ho_va_ten:new RegExp(rq_id,'i')},{_id:0,ma_giang_vien:1,ho_va_ten:1},function(err,result3){
                if(err) {
                    res.json({type:'error',content:'Lỗi server!'});
                }
                if(isNull(result3)){
                    res.json({type:'error',content:'Không có thông tin liên quan'});
                }
                else{
                    res.json(result3);
                }
            });

        }
        else{
            res.json(result2);
        }
    });

});
router.get('/',function(req,res){

    var teacher=require('./../data/models/teacher');
    if(mongoose.connection.readyState==0) mongoose.connect(dbURL);

    teacher.find({},{_id:0,ma_giang_vien:1,ho_va_ten:1}).exec(function(err,result2){
        if(err) {
            res.json({type:'error',content:'Lỗi server!'});
        }
        if(isNull(result2)){
            res.json({type:'error',content:'Không có thông tin liên quan'});

        }
        else{
            res.json(result2);
        }
    });

});

module.exports=router;