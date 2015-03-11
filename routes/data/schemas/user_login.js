/**
 * Created by Phi on 3/11/2015.
 */
var mongoose=require('mongoose');
var user_login=new mongoose.Schema({
    tai_khoan:String,
    mat_khau:String,
    ma_sinh_vien: String
});
module.exports=user_login;