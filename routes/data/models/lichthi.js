/**
 * Created by PHI on 4/25/2015.
 */
var mongoose=require('./../db.js');
var db=require('mongoose');
var lichthi_schema=require('./../schemas/lichthi');
var lichthi=mongoose.model('lichthi',lichthi_schema,'lichthi');

module.exports=lichthi;