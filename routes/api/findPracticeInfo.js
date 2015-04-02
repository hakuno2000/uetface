/**
 * Created by Phi on 4/1/2015.
 */
var express=require('express');
var router=express.Router();
var mongoose=require('mongoose');
var dbURL=require('./../data/dbURL');
var isNull=require('./../isNull');
router.get('/:practice_id/:group',function(req,res){
    var practice_id=req.params.practice_id;
    var group=req.params.group;
    var practice_info=require('./../data/models/practice_info');
    if(mongoose.connection.readyState==0) mongoose.connect(dbURL);
    practice_info.find({'ma_danh_gia':practice_id,ghi_chu:group},{_id:0},function(err,result){
        if(err) {
            res.json({type:'error',content:'Lỗi server!'});
            if(mongoose.connection.readyState==1) mongoose.disconnect();
        }
        else if(isNull(result)){
            practice_info.find({'ma_lop':practice_id,ghi_chu:group},{_id:0},function(err,result){
                if(err) {
                    res.json({type:'error',content:'Lỗi server!'});
                    if(mongoose.connection.readyState==1) mongoose.disconnect();
                }
                else if(isNull(result)){ res.json({type:'error',content:'Mã lớp không tồn tại'});}
                else{
                    res.json(result);
                }
                if(mongoose.connection.readyState==1) mongoose.disconnect();
            });
        }
        else{
            res.json(result);
            if(mongoose.connection.readyState==1) mongoose.disconnect();
        }
    });
});
router.get('/:practice_id',function(req,res){
    var practice_id=req.params.practice_id;
    var practice_info=require('./../data/models/practice_info');
    if(mongoose.connection.readyState==0) mongoose.connect(dbURL);
    practice_info.find({'ma_danh_gia':practice_id},{_id:0},function(err,result){
        if(err) {
            res.json({type:'error',content:'Lỗi server!'});
        }
        else if(isNull(result)){
            practice_info.find({'ma_lop':practice_id},{_id:0},function(err,result){
                if(err) {
                    res.json({type:'error',content:'Lỗi server!'});
                }
                else if(isNull(result)){ res.json({type:'error',content:'Mã lớp không tồn tại'});}
                else{
                    res.json(result);
                }
            });
        }
        else{
            res.json(result);
        }
    });
});
module.exports=router;