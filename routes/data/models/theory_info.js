/**
 * Created by Phi on 4/1/2015.
 */
var mongoose=require('./../db');
var theory_info_schema=require('./../schemas/theory_info')
var theory_info=mongoose.model('lopmonhoc',theory_info_schema,'lopmonhoc');

module.exports=theory_info;