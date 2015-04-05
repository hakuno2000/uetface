/**
 * Created by Phi on 4/1/2015.
 */
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate');
var theory_info=new mongoose.Schema({
    ma_lop:String,
    ma_mon:String,
    ghi_chu:String,
    tiet_bat_dau:Number,
    tiet_ket_thuc:Number,
    thu: String,
    giang_duong: String,
    si_so:Number,
    ma_danh_gia:String,
    thong_tin_mon: { type: Schema.Types.ObjectId, ref: 'monhoc' }
});
theory_info.plugin(deepPopulate);
module.exports=theory_info;