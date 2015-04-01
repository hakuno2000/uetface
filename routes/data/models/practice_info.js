/**
 * Created by Phi on 4/1/2015.
 */
var mongoose=require('./../db');
var practice_info_schema=require('./../schemas/practice_info')
var practice_info=mongoose.model('practice_info',theory_info_schema,'lopthuchanh');
module.exports=practice_info;