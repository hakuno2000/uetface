/**
 * Created by Phi on 4/1/2015.
 */
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate');
var practice_info=new mongoose.Schema({
    ma_lop:String,
    ghi_chu: String,
    tiet_bat_dau: Number,
    tiet_ket_thuc: Number,
    giang_duong: String,
    thu: String,
    ma_danh_gia:String,
    thong_tin_mon: { type: Schema.Types.ObjectId, ref: 'monhoc' }
});
practice_info.plugin(deepPopulate);
module.exports=practice_info;