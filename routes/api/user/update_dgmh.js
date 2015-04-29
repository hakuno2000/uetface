/**
 * Created by PHI on 4/29/2015.
 */
/**
 * Created by PHI on 4/11/2015.
 */
var express=require('express');
var async=require('async');
var router=express.Router();
var mongoose=require('mongoose');
var isNull=require('./../../isNull');
var user_not_logged_in=require('./user_not_logged_in');
router.post('/',user_not_logged_in,function(req,res){
    if (req.body.cla_id !== '' && req.body.tea_id != ''
        && req.body.q1 != '' && req.body.q2 != '' && req.body.q3 != '' && req.body.q4 != '' && req.body.q5 != '' && req.body.q6 != ''
        && req.body.q7 != '' && req.body.q8 != '' && req.body.q9 != '' && req.body.q10 != '' && req.body.q11 != '' && req.body.q12 != ''
        && req.body.q13 != '' && req.body.q14 != '' && req.body.q15 != '' && req.body.q16 != '' && req.body.q17 != ''
        && req.body.q18 != ''
    ) {
        if (req.body.cla_id && req.body.tea_id
            && req.body.q1 && req.body.q2 && req.body.q3 && req.body.q4 && req.body.q5 && req.body.q6
            && req.body.q7 && req.body.q8 && req.body.q9 && req.body.q10 && req.body.q11 && req.body.q12
            && req.body.q13 && req.body.q14 && req.body.q15 && req.body.q16 && req.body.q17 && req.body.q18) {
            var dgmh = require('./../../data/models/dgmh');
            dgmh.update({ma_sinh_vien:req.session.user_id,ma_lop_mon_hoc:req.body.cla_id,ma_giang_vien:req.body.tea_id},
                {$set:{
                    q1:req.body.q1,
                    q2:req.body.q2,
                    q3:req.body.q3,
                    q4:req.body.q4,
                    q5:req.body.q5,
                    q6:req.body.q6,
                    q7:req.body.q7,
                    q8:req.body.q8,
                    q9:req.body.q9,
                    q10:req.body.q10,
                    q11:req.body.q11,
                    q12:req.body.q12,
                    q13:req.body.q13,
                    q14:req.body.q14,
                    q15:req.body.q15,
                    q16:req.body.q16,
                    q17:req.body.q17,
                    q18:req.body.q18
                }}).exec(
                function(err,result){
                    if(err) res.json({type: 'error', content: 'Đã có lỗi xảy ra!'});
                    else{
                        res.json({type:'success',content:'Đã cập nhật!'})
                    }
                }
            )

        } else {
            res.json({type: 'error', content: 'Bạn đã nhập thiếu thông tin!'});
        }
    } else {
        res.json({type: 'error', content: 'Bạn đã nhập thiếu thông tin!'});
    }

});
router.post('/',function(req,res){
    var user=require('./../../data/models/user_login');
    user.findOne({token:req.body.token}).exec(function(err,std){
        if(err) res.json({type:'error',content:'Có lỗi xảy ra!'});
        else if(isNull(std)){
            res.json({type:'error',content:'Token không tồn tại.'})
        }else {
            if (req.body.cla_id !== '' && req.body.tea_id != ''
                && req.body.q1 != '' && req.body.q2 != '' && req.body.q3 != '' && req.body.q4 != '' && req.body.q5 != '' && req.body.q6 != ''
                && req.body.q7 != '' && req.body.q8 != '' && req.body.q9 != '' && req.body.q10 != '' && req.body.q11 != '' && req.body.q12 != ''
                && req.body.q13 != '' && req.body.q14 != '' && req.body.q15 != '' && req.body.q16 != '' && req.body.q17 != ''
                && req.body.q18 != ''
            ) {
                if (req.body.cla_id && req.body.tea_id
                    && req.body.q1 && req.body.q2 && req.body.q3 && req.body.q4 && req.body.q5 && req.body.q6
                    && req.body.q7 && req.body.q8 && req.body.q9 && req.body.q10 && req.body.q11 && req.body.q12
                    && req.body.q13 && req.body.q14 && req.body.q15 && req.body.q16 && req.body.q17 && req.body.q18) {
                    var dgmh = require('./../../data/models/dgmh');
                    dgmh.update({ma_sinh_vien:std.ma_sinh_vien,ma_lop_mon_hoc:req.body.cla_id,ma_giang_vien:req.body.tea_id},
                        {$set:{
                            q1:req.body.q1,
                            q2:req.body.q2,
                            q3:req.body.q3,
                            q4:req.body.q4,
                            q5:req.body.q5,
                            q6:req.body.q6,
                            q7:req.body.q7,
                            q8:req.body.q8,
                            q9:req.body.q9,
                            q10:req.body.q10,
                            q11:req.body.q11,
                            q12:req.body.q12,
                            q13:req.body.q13,
                            q14:req.body.q14,
                            q15:req.body.q15,
                            q16:req.body.q16,
                            q17:req.body.q17,
                            q18:req.body.q18
                        }}).exec(
                        function(err,result){
                            if(err) res.json({type: 'error', content: 'Đã có lỗi xảy ra!'});
                            else{
                                res.json({type:'success',content:'Đã cập nhật!'})
                            }
                        }
                    )

                } else {
                    res.json({type: 'error', content: 'Bạn đã nhập thiếu thông tin!'});
                }
            } else {
                res.json({type: 'error', content: 'Bạn đã nhập thiếu thông tin!'});
            }
        }
    });
});

module.exports=router;