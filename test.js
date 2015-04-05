
//var mongoose=require('mongoose');
/*
function doit(next){
    var user_reg=require('./routes/data/models/user_reg');
    if(mongoose.connection.readyState==0) mongoose.connect('mongodb://localhost/uetface');
    user_reg.findOne({'ma_sinh_vien':'12020282'},function(err,result){
        console.log(result.ma_sinh_vien);
        if(mongoose.connection.readyState==1||mongoose.connection.readyState==2) mongoose.disconnect();
        next();
    });
}
*/

//function doContinue(){
//
//    var user_reg=require('./routes/data/models/user_reg');
//    if(mongoose.connection.readyState==0) mongoose.connect('mongodb://localhost/uetface');
//    user_reg.findOne({'ma_sinh_vien':'12020282'},function(err,result){
//        console.log(result.ma_sinh_vien);
//        if(mongoose.connection.readyState==1)mongoose.disconnect();
//    });
//}

//doit(doContinue);

//var user_reg=require('./routes/data/models/user_reg');
//if(mongoose.connection.readyState==0) mongoose.connect('mongodb://localhost/uetface');
//user_reg.find({'ma_sinh_vien':/8/i},function(err,result){
//    console.log(result);
//    user_reg.findOne({'ma_sinh_vien':'12020282'},function(err,result){
//        console.log(result.active);
//        if(mongoose.connection.readyState==1)mongoose.disconnect();
//    });
//
//});

//
//
//
//var md5=require('./routes/decode/md5');
//var test=md5.MD5('khoa'+'uetface').toString();
//console.log(test);

var mongoose = require('mongoose')
    , Schema = mongoose.Schema;
if(mongoose.connection.readyState==0) mongoose.connect('mongodb://localhost/uetface');
var deepPopulate = require('mongoose-deep-populate');
var theory_Schema=new mongoose.Schema({
    ma_sinh_vien:String,
    ma_lop:String,
    ghi_chu:String,
    thong_tin_lop : { type: Schema.Types.ObjectId, ref: 'lopmonhoc' }
});
theory_Schema.plugin(deepPopulate);
var theory=mongoose.model('sinhvien_lopmonhoc',theory_Schema,'sinhvien_lopmonhoc');
var theory_info_schema=new mongoose.Schema({
    ma_lop:String,
    ma_mon:String,
    ghi_chu:String,
    tiet_bat_dau:Number,
    tiet_ket_thuc:Number,
    thu: String,
    giang_duong: String,
    si_so:Number,
    ma_danh_gia:String,
    thong_tin_mon: { type: Schema.Types.ObjectId, ref: 'monhoc' }
});
var subject_schema=new mongoose.Schema({
    ma_mon:String,
    ten_mon: String,
    khoa: String,
    ma_danh_gia:String,
    tin_chi:Number,
    mo_ta:String
});
var subject=mongoose.model('monhoc',subject_schema,'monhoc');
theory_info_schema.plugin(deepPopulate);
var theory_info=mongoose.model('lopmonhoc',theory_info_schema,'lopmonhoc');
theory.find({ma_sinh_vien:'12020282'},{_id:0}).deepPopulate('thong_tin_lop.thong_tin_mon').exec(function(err,_result){
    console.log(_result);
});
//theory_info.find().deepPopulate('thong_tin_mon').exec(function(err,result){
//    console.log(result);
//})
//classes.find({ma_lop:'INT3115',ma_sinh_vien:'12020282'},{_id:0}).limit(2).populate('thong_tin_lop',{_id:0}).exec(function(err,result){
//    if(err) console.log(err);
//    console.log(result[0].thong_tin_lop.thong_tin_mon)
//    subject.populate(result[0].thong_tin_lop.thong_tin_mon,function(err,result){
//        console.log(result);
//    });
//});
//practice.find({}).exec(function(err,result){
//    result.forEach(function(value){
//        var param=value.ma_lop.split(" ")[0];
//        if(param.length<6){
//            var param=value.ma_lop.split(" ")[0]+" "+value.ma_lop.split(" ")[1];
//        }
//        console.log(param);
//       theory_info.findOne({ma_mon:param}).exec(function(err,result2){
//           practice.update({ma_lop:value.ma_lop},{$set:{thong_tin_mon:mongoose.Types.ObjectId(result2._id)}},{multi:true}).exec(function(err,result3){
//               if(err) console.log(err);
//               console.log(result3);
//           });
//       })
//    });
//});
//var crypto=require('crypto');
//var now=new Date();
//var ex=crypto.createHash('sha256').update(now.toJSON()).digest('hex');
//console.log(ex);