/**
 * Created by Phi on 3/13/2015.
 */
var mongoose=require('mongoose');
var subject=new mongoose.Schema({
    ma_mon:String,
    ten_mon: String,
    khoa: String,
    tin_chi:Number,
    mo_ta:String
});
module.exports=subject;