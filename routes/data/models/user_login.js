/**
 * Created by Phi on 3/11/2015.
 */
var mongoose=require('./../db.js');
var user_login_Schema=require('./../schemas/user_login')
var user_login=mongoose.model('sinhvien',user_login_Schema,'sinhvien');
module.exports=user_login;
