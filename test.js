
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
var isNull=require('./routes/isNull');
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
var mongoose=require('mongoose');
var subjects =require('./routes/data/models/subjects');
var theory_info=require('./routes/data/models/theory_info');
var practice=require('./routes/data/models/theory');
var teacher=require('./routes/data/models/teacher');

var theory_teacher_schema= new mongoose.Schema({
    ma_giang_vien : String,
    ma_lop : String,
    ghi_chu : String,
    ten_giang_vien : String
});
var theory_teacher= mongoose.model('theory_teacher',theory_teacher_schema,'giangvien_lopmonhoc');
//var fs=require('fs');
//var doc=fs.readFileSync('data2.json','utf8');
//var doc=doc.substr(1);
//var obj=JSON.parse(doc);
//obj.forEach(function(value){
//    teacher.find({ho_va_ten:value["Giáo viên"]}).exec(function(err,res){
//        if(isNull(res)){
//            var newTeacher= new teacher({
//                ma_giang_vien:'',
//                ho_va_ten:value["Giáo viên"]
//            });
//            newTeacher.save(function(err,kq){
//                console.log(kq);
//            });
//        }
//    })
//});
theory_info.find().exec(function(err,res){
    res.forEach(function(data){
       theory_teacher.findOne({ma_lop:data.ma_lop},function(err,theory_teacher){
           //teacher.findOne({ho_va_ten:value.ten_giang_vien}).exec(function(err,getTeacher){
           //    theory_info.update({ma_lop:data.ma_lop,ghi_chu:data.ghi_chu},{$set:{giang_vien:getTeacher._id}}).exec(function(err,last){
           //        console.log(last);
           //    });
           //});
           if(isNull(theory_teacher)){
               console.log(data.ma_lop+" "+data.ghi_chu);
           }else{
               console.log(theory_teacher.ten_giang_vien);
           }
       });
    });
});
//theory_teacher.find().exec(function(err,res){
//   res.forEach(function(value){
//      teacher
//   });
//});
//async.parallel([
//    function getIdTheoryClass(cb){
//        var theory=require('./routes/data/models/theory');
//        theory.find({ma_lop:/FLF/}).exec(cb);
//    }
//],function(err,result){
//    result[0].forEach(function(value){
//        var practice_info=require('./routes/data/models/practice_info');
//        practice_info.find({ma_lop:value.ma_lop}).exec(function(err,res){
//            //console.log(res);
//            if(err) console.log(err);
//            var practice=require('./routes/data/models/practice');
//            var el_practice1=new practice({
//                ma_sinh_vien:value.ma_sinh_vien,
//                ma_lop: value.ma_lop,
//                ghi_chu: res[0].ghi_chu,
//                thong_tin_lop: res[0]._id
//            });
//            var el_practice2=new practice({
//                ma_sinh_vien:value.ma_sinh_vien,
//                ma_lop: value.ma_lop,
//                ghi_chu: res[1].ghi_chu,
//                thong_tin_lop: res[1]._id
//            });
//            //console.log(el_practice1);
//            //console.log(el_practice2);
//            el_practice1.save(function(err,res2){
//                console.log(res2);
//            })
//            el_practice2.save(function(err,res2){
//                console.log(res2);
//            })
//        })
//
//    })
//});