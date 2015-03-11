/**
 * Created by PHI on 3/7/2015.
 */
var mongoose=require('mongoose');
var dbURL='mongodb://localhost/uetface';
var db=mongoose.connect(dbURL,{server:{auto_reconnect:true}});
var Connection = mongoose.connection;
module.exports=db;
