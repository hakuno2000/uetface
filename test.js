
var mongoose=require('mongoose');
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

function doContinue(){

    var user_reg=require('./routes/data/models/user_reg');
    if(mongoose.connection.readyState==0) mongoose.connect('mongodb://localhost/uetface');
    user_reg.findOne({'ma_sinh_vien':'12020282'},function(err,result){
        console.log(result.ma_sinh_vien);
        if(mongoose.connection.readyState==1)mongoose.disconnect();
    });
}

//doit(doContinue);
var user_reg=require('./routes/data/models/user_reg');
if(mongoose.connection.readyState==0) mongoose.connect('mongodb://localhost/uetface');
user_reg.find({'ma_sinh_vien':/8/i},function(err,result){
    console.log(result);
    user_reg.findOne({'ma_sinh_vien':'12020282'},function(err,result){
        console.log(result.ma_sinh_vien);
        if(mongoose.connection.readyState==1)mongoose.disconnect();
    });

});



/*
var md5=require('./routes/decode/md5');
var test=md5.MD5('levannguyen'+'uetface').toString();
console.log(test);
*/