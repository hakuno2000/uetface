/**
 * Created by PHI on 3/28/2015.
 */
/**
 * Created by PHI on 3/21/2015.
 */
var express=require('express');
var router=express.Router();
var mongoose=require('mongoose');
var dbURL=require('./../data/dbURL');
var isNull=require('./../isNull');
router.get('/:sbj_id',function(req,res){
    var rq_id=req.params.sbj_id;
    var subjects=require('./../data/models/subjects');
    if(mongoose.connection.readyState==0) mongoose.connect(dbURL);
    subjects.find({'ma_danh_gia':new RegExp(rq_id, 'i')},{_id:0,ten_mon:1,ma_mon:1},function(err,result){
        if(err) {
            res.json({type:'error',content:'Lỗi server!'});
            if(mongoose.connection.readyState==1) mongoose.disconnect();
        }
        if(isNull(result)){ res.json({type:'error',content:'Mã đánh giá môn không tồn tại'});}
        else{
            res.json(result);
        }
        if(mongoose.connection.readyState==1) mongoose.disconnect();
    });
});

module.exports=router;