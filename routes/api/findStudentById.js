/**
 * Created by PHI on 3/21/2015.
 */
var express=require('express');
var router=express.Router();
var mongoose=require('mongoose');
var dbURL=require('./../data/dbURL');
var isNull=require('./../isNull');
router.get('/:std_id',function(req,res){
    var rq_id=req.params.std_id;
    var user_reg=require('./../data/models/user_reg');
    if(mongoose.connection.readyState==0) mongoose.connect(dbURL);
    user_reg.find({'ma_sinh_vien':new RegExp(rq_id, 'i')},{_id:0,ho_va_ten:1,lop_khoa_hoc:1},function(err,result){
        if(err) {
            res.json({type:'error',content:'Lỗi server!'});
            if(mongoose.connection.readyState==1) mongoose.disconnect();
        }
        if(isNull(result)){ res.json({type:'error',content:'Mã sinh viên không tồn tại'});}
        else{
            res.json(result);
        }
        if(mongoose.connection.readyState==1) mongoose.disconnect();
    });
});

module.exports=router;