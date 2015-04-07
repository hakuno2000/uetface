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
    1:Number,
    2:Number,
    3:Number,
    4:Number,
    5:Number,
    6:Number,
    7:Number,
    8:Number,
    9:Number,
    10:Number,
    11:Number,
    12:Number,
    13:Number,
    14:Number,
    15:Number,
    16:Number,
    17:Number,
    18:Number,
    comment:String
});
dgmh.plugin(deepPopulate);
module.exports=dgmh;