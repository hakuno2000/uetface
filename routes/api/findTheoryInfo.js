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
    theory_info.find({'ma_lop':new RegExp(theory_id, 'i')},{_id:0},function(err,result){
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
});

module.exports=router;