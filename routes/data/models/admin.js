/**
 * Created by Phi on 3/9/2015.
 */
var mongoose=require('./../db.js');
var db=require('mongoose');
var adminSchema=require('./../schemas/admin');
var admin=mongoose.model('admin',adminSchema,'admin');

module.exports=admin;