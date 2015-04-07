/**
 * Created by Phi on 3/26/2015.
 */
var express=require('express');
var router=express.Router();
var mongoose=require('mongoose');
var dbURL=require('./../../data/dbURL');
var isNull=require('./../../isNull');
router.get('/',function(req,res){
    var dgmh=require('./../../data/models/dgmh');
    var teacher=require('./../../data/models/teacher');
    if(mongoose.connection.readyState==0) mongoose.connect(dbURL);
    dgmh.find({'ma_sinh_vien':req.session.user_id},{_id:0,__v:0}).deepPopulate('ma_giang_vien ma_lop_mon_hoc.thong_tin_mon ma_lop_thuc_hanh.thong_tin_mon').exec(function(err,result){
        if(err) {
            res.json({type:'error',content:'Lỗi server!'});
            console.log(err);
        }
        else if(isNull(result)){ res.json({type:'error',content:'Bạn chưa có đánh giá nào.'});}
        else{
            res.json(result);
        }
        
    });
});

module.exports=router;