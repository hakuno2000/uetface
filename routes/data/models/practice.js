/**
 * Created by Phi on 3/28/2015.
 */
var mongoose=require('./../db');
var practice_Schema=require('./../schemas/practice');

var practice=mongoose.model('practice',practice_Schema,'sinhvien_lopthuchanh');
module.exports=practice;