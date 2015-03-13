/**
 * Created by Phi on 3/13/2015.
 */
var mongoose=require('./../db');
var subjects_Schema=require('./../schemas/subjects');
var subjects=mongoose.model('subjects',subjects_Schema,'monhoc');
module.exports=subjects;