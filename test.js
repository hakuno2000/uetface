
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
/*
var mongoose=require('mongoose');
var MyModel = require('./routes/data/models/subjects');;
if(mongoose.connection.readyState==0) mongoose.connect('mongodb://localhost/uetface');
MyModel.paginate({}, 2, 10, function(error, pageCount, paginatedResults, itemCount) {
    if (error) {
        console.error(error);
    } else {
        console.log('Pages:', pageCount);
        console.log(paginatedResults);
    }
});
    */
var crypto=require('crypto');
var now=new Date();
var ex=crypto.createHash('sha256').update(now.toJSON()).digest('hex');
console.log(ex);