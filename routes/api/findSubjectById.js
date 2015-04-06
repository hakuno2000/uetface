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
    //subjects.find({'ma_danh_gia':new RegExp(rq_id, 'i')},{_id:0},function(err,result){
    //    if(err) {
    //        res.json({type:'error',content:'Lỗi server!'});
    //    }
    //    else if(isNull(result)){
    //        subjects.find({ten_mon:new RegExp(rq_id,'i')},{_id:0},function(err,result2){
    //            if(err) {
    //                res.json({type:'error',content:'Lỗi server!'});
    //            }
    //            else if(isNull(result2)){
                    subjects.find({ma_mon:rq_id},{_id:0},function(err,result3){
                        if(err) {
                            res.json({type:'error',content:'Lỗi server!'});
                        }
                        else if(isNull(result3)){
                            res.json({type:'error',content:'Không có thông tin liên quan'});
                        }
                        else{
                            res.json(result3);
                        }
                    });
        //        }
        //        else{
        //            res.json(result2);
        //        }
        //    });
        //}
        //else{
        //    res.json(result);
        //}
    //});
});

module.exports=router;