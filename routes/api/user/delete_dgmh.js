/**
 * Created by PHI on 4/29/2015.
 */
var express=require('express');
var async=require('async');
var router=express.Router();
var mongoose=require('mongoose');
var isNull=require('./../../isNull');
var user_not_logged_in=require('./user_not_logged_in');
router.post('/',user_not_logged_in,function(req,res){
    if (req.body.cla_id !== '' && req.body.tea_id != '') {
        if (req.body.cla_id && req.body.tea_id) {
            var dgmh = require('./../../data/models/dgmh');
            dgmh.remove({ma_sinh_vien:req.session.user_id,ma_lop_mon_hoc:req.body.cla_id,ma_giang_vien:req.body.tea_id}).exec(
                function(err,result){
                    if(err) res.json({type: 'error', content: 'Đã có lỗi xảy ra!'});
                    else{
                        res.json({type:'success',content:'Đã xóa đánh giá!'})
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
            if (req.body.cla_id !== '' && req.body.tea_id != ''&&req.body.token!=''
            ) {
                if (req.body.cla_id && req.body.tea_id&&req.body.token) {
                    var dgmh = require('./../../data/models/dgmh');
                    dgmh.remove({ma_sinh_vien:req.session.user_id,ma_lop_mon_hoc:req.body.cla_id,ma_giang_vien:req.body.tea_id}).exec(
                        function(err,result){
                            if(err) res.json({type: 'error', content: 'Đã có lỗi xảy ra!'});
                            else{
                                res.json({type:'success',content:'Đã xóa đánh giá!'})
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