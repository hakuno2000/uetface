/**
 * Created by PHI on 4/11/2015.
 */
var express=require('express');
var async=require('async');
var router=express.Router();
var mongoose=require('mongoose');
var isNull=require('./../../isNull');
router.post('/',function(req,res){
    console.log(req.body);
    var user=require('./../../data/models/user_login');
    user.findOne({token:req.body.token}).exec(function(err,result){
        if(err) res.json({type:'error',content:'Có lỗi xảy ra!'});
        else if(isNull(result)){
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
                    if (mongoose.connection.readyState == 0) mongoose.connect(dbURL);
                    var subject = require('./../../data/models/subjects');
                    async.parallel([
                        function getIdTeacher(cb) {
                            var teacher = require('./../../data/models/teacher');
                            teacher.findOne({ma_giang_vien: req.body.tea_id}, {_id: 1, ho_va_ten: 1}).exec(cb);
                        }, function getIdTheoryClass(cb) {
                            var theory_info = require('./../../data/models/theory_info');
                            theory_info.findOne({ma_danh_gia: req.body.cla_id}).deepPopulate('thong_tin_mon').exec(cb);
                        }, function getIdPracticeClass(cb) {
                            var practice_info = require('./../../data/models/practice_info');
                            practice_info.findOne({ma_danh_gia: req.body.cla_id}).deepPopulate('thong_tin_mon').exec(cb);
                        }
                    ], function (err, result) {
                        if (isNull(result[0])) {
                            res.json({type: 'error', content: 'Mã giảng viên không đúng'});
                        } else {
                            var mgv = result[0]._id;
                            if (isNull(result[1]) && isNull(result[2])) {
                                res.json({type: 'error', content: 'Không có môn học phù hợp!'})
                            } else {
                                if (isNull(result[1])) {
                                    var form = new dgmh({
                                        ma_giang_vien: mgv,
                                        ma_lop_thuc_hanh: result[2]._id,
                                        ma_sinh_vien: req.session.user_id,
                                        1: req.body.q1,
                                        2: req.body.q2,
                                        3: req.body.q3,
                                        4: req.body.q4,
                                        5: req.body.q5,
                                        6: req.body.q6,
                                        7: req.body.q7,
                                        8: req.body.q8,
                                        9: req.body.q9,
                                        10: req.body.q10,
                                        11: req.body.q11,
                                        12: req.body.q12,
                                        13: req.body.q13,
                                        14: req.body.q14,
                                        15: req.body.q15,
                                        16: req.body.q16,
                                        17: req.body.q17,
                                        18: req.body.q18,
                                        comment: req.body.comment
                                    });
                                    form.save(function (err) {
                                        if (err) {
                                            console.log(err);
                                            res.json({type: 'error', content: 'Lỗi server!'});
                                        }
                                        res.json({type: 'success', content: 'Mẫu đánh giá tạo thành công!'});
                                    });
                                } else {
                                    var form = new dgmh({
                                        ma_giang_vien: mgv,
                                        ma_lop_mon_hoc: result[1]._id,
                                        ma_sinh_vien: req.session.user_id,
                                        1: req.body.q1,
                                        2: req.body.q2,
                                        3: req.body.q3,
                                        4: req.body.q4,
                                        5: req.body.q5,
                                        6: req.body.q6,
                                        7: req.body.q7,
                                        8: req.body.q8,
                                        9: req.body.q9,
                                        10: req.body.q10,
                                        11: req.body.q11,
                                        12: req.body.q12,
                                        13: req.body.q13,
                                        14: req.body.q14,
                                        15: req.body.q15,
                                        16: req.body.q16,
                                        17: req.body.q17,
                                        18: req.body.q18,
                                        comment: req.body.comment
                                    });
                                    form.save(function (err) {
                                        if (err) {
                                            console.log(err);
                                            res.json({type: 'error', content: 'Lỗi server!'});
                                        }
                                        res.json({type: 'success', content: 'Mẫu đánh giá tạo thành công!'});
                                    });
                                }
                            }
                        }
                    })
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