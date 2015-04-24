/**
 * Created by PHI on 4/3/2015.
 */
var mongoose=require('mongoose');
var deepPopulate = require('mongoose-deep-populate');
var teacher=new mongoose.Schema({
    ma_giang_vien:String,
    ho_va_ten: String,
    ma_danh_gia: String
});
teacher.plugin(deepPopulate);
module.exports=teacher;