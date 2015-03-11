/**
 * Created by Phi on 3/11/2015.
 */
var mongoose=require('./../db');
var db=require('mongoose');
var user_reg_schema=require('./../schemas/user_reg');
var user_reg=mongoose.model('user_reg',user_reg_schema,'sinhvien');
db.disconnect();
module.exports=user_reg;