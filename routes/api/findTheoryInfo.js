/**
 * Created by Phi on 4/1/2015.
 */
var express=require('express');
var router=express.Router();
var mongoose=require('mongoose');
var dbURL=require('./../data/dbURL');
var isNull=require('./../isNull');
router.get('/:theory_id',function(req,res){
    var theory_id=req.params.theory_id;
    var theory_info=require('./../data/models/theory_info');
    if(mongoose.connection.readyState==0) mongoose.connect(dbURL);
    theory_info.find({'ma_danh_gia':theory_id},{_id:0},function(err,result){
        if(err) {
            res.json({type:'error',content:'Lỗi server!'});
        }
        else if(isNull(result)){
            theory_info.find({'ma_lop':theory_id},{_id:0},function(err,result){
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
router.get('/:theory_id/:group',function(req,res){
    var theory_id=req.params.theory_id;
    var group=req.params.group;
    var theory_info=require('./../data/models/theory_info');
    if(mongoose.connection.readyState==0) mongoose.connect(dbURL);
    theory_info.find({'ma_danh_gia':theory_id,'ghi_chu':group},{_id:0},function(err,result){
        if(err) {
            res.json({type:'error',content:'Lỗi server!'});
        }
        else if(isNull(result)){
            theory_info.find({'ma_lop':theory_id,'ghi_chu':group},{_id:0},function(err,result){
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