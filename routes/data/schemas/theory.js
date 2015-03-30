/**
 * Created by Phi on 3/28/2015.
 */
var mongoose=require('mongoose');
var theory=new mongoose.Schema({
    ma_sinh_vien:String,
    ma_lop:String,
    ghi_chu:String
});
module.exports=theory;