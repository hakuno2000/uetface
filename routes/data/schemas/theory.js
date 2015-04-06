/**
 * Created by Phi on 3/28/2015.
 */
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate');
var theory=mongoose.Schema({
    ma_sinh_vien:String,
    ma_lop:String,
    ghi_chu:String,
    thong_tin_lop : { type: Schema.Types.ObjectId, ref: 'lopmonhoc' }
});
theory.plugin(deepPopulate);
module.exports=theory;