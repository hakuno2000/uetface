/**
 * Created by PHI on 3/7/2015.
 */
var mongoose=require('mongoose');
var dbURL='mongodb://localhost/uetface';
var db=mongoose.connect(dbURL);

module.exports=db;