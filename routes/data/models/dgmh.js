/**
 * Created by Phi on 3/25/2015.
 */
var mongoose=require('./../db');
var dgmh_schema=require('./../schemas/dgmh');
var dgmh=mongoose.model('dgmh',dgmh_schema,'dgmh');
module.exports=dgmh;