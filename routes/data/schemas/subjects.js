/**
 * Created by Phi on 3/13/2015.
 */
var mongoose=require('mongoose');
var mongoosePaginate=require('mongoose-paginate');
var deepPopulate = require('mongoose-deep-populate');
var subject=new mongoose.Schema({
    ma_mon:String,
    ten_mon: String,
    khoa: String,
    ma_danh_gia:String,
    tin_chi:Number,
    mo_ta:String
});
subject.plugin(mongoosePaginate);
subject.plugin(deepPopulate);
module.exports=subject;