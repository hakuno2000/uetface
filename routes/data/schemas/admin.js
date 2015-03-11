/**
 * Created by Phi on 3/11/2015.
 */
var mongoose=require('mongoose');
var admin=new mongoose.Schema({
    username:String,
    password:String,
    level: Number
});
module.exports=admin;
