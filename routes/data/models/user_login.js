/**
 * Created by Phi on 3/11/2015.
 */
var mongoose=require('./../db.js');
var db=require('mongoose');
var user_login_Schema=require('./../schemas/user_login')
var user_login=mongoose.model('sinhvien',user_login_Schema,'sinhvien');
db.disconnect();
module.exports=user_login;
