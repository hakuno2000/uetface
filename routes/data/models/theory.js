/**
 * Created by Phi on 3/28/2015.
 */
var mongoose=require('./../db');
var theory_Schema=require('./../schemas/theory');

var theory=mongoose.model('theory',theory_Schema,'sinhvien_lopmonhoc');
module.exports=theory;