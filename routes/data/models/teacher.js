/**
 * Created by PHI on 4/3/2015.
 */
var mongoose=require('./../db');
var teacher_Schema=require('./../schemas/teacher');

var teacher=mongoose.model('teacher',teacher_Schema,'giangvien');
module.exports=teacher;