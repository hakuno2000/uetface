/*
 * Created by Phi on 3/25/2015.
 */
var mongoose=require('mongoose');
var deepPopulate = require('mongoose-deep-populate');
var dgmh=new mongoose.Schema({
    ma_lop_mon_hoc:{type: mongoose.Schema.Types.ObjectId ,ref:'lopmonhoc'},
    ma_lop_thuc_hanh: {type: mongoose.Schema.Types.ObjectId ,ref:'lopthuchanh'},
    ma_giang_vien: {type: mongoose.Schema.Types.ObjectId ,ref:'giangvien'},
    ma_sinh_vien:String,
    q1:Number,
    q2:Number,
    q3:Number,
    q4:Number,
    q5:Number,
    q6:Number,
    q7:Number,
    q8:Number,
    q9:Number,
    q10:Number,
    q11:Number,
    q12:Number,
    q13:Number,
    q14:Number,
    q15:Number,
    q16:Number,
    q17:Number,
    q18:Number,
    comment:String
});
dgmh.plugin(deepPopulate);
module.exports=dgmh;