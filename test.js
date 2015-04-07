
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

//var mongoose = require('mongoose')
//    , Schema = mongoose.Schema;
////if(mongoose.connection.readyState==0) mongoose.connect('mongodb://localhost/uetface');
//var practice=require('./routes/data/models/practice');
//var theory=require('./routes/data/models/theory');
//var theory_info=require('./routes/data/models/theory_info');
//var isNull=require('./routes/isNull');
//practice.find().exec(function(err,result){
//    result.forEach(function(value){
//        theory.find({ma_lop: value.ma_lop,ma_sinh_vien: value.ma_sinh_vien}).exec(function(err,result2){
//            theory_info.find({ma_lop:value.ma_lop}).exec(function(err,result3){
//                theory.update({ma_lop: value.ma_lop,ma_sinh_vien: value.ma_sinh_vien},{$set:{thong_tin_lop: result3[0]._id}},function(err,result4){
//                    console.log(result4);
//                })
//            })
//                //console.log(value.thong_tin_lop);
//
//                //var add=new theory({
//                //    ma_sinh_vien:value.ma_sinh_vien,
//                //    ma_lop: value.ma_lop,
//                //    ghi_chu: 'CL',
//                //    thong_tin_lop: value.thong_tin_lop
//                //});
//                //add.save(function(err){
//                //    if(err) console.log(err);
//                //})
//        });
//    });
//})
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
var async=require('async');
var mongoose=require('mongoose');
var subjects =require('./routes/data/models/subjects');
async.parallel([
    function getIdTeacher(cb){
        var teacher=require('./routes/data/models/teacher');
        teacher.findOne({ma_giang_vien:'048'},{_id:1,ho_va_ten:1}).exec(cb);
    },function getIdTheoryClass(cb){
        var theory_info=require('./routes/data/models/theory_info');
        theory_info.findOne({ma_danh_gia:'001'}).deepPopulate('thong_tin_mon').exec(cb);
    },function getIdPracticeClass(cb){
        var practice_info=require('./routes/data/models/practice_info');
        practice_info.findOne({ma_danh_gia:'001'}).deepPopulate('thong_tin_mon').exec(cb);
    }
],function(err,result){
    console.log(result[0])
    var isNull=require('./routes/isNull');
    console.log(isNull(result[1]));

});