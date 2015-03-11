/**
 * Created by PHI on 3/7/2015.
 */
var mongoose=require('mongoose');
var dbURL=require('./dbURL');
var db=mongoose.connect(dbURL,{server:{auto_reconnect:true}});
module.exports=db;
