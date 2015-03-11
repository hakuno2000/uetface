var mongoose=require('mongoose');
var db=mongoose.connect('mongodb://localhost/uetface');
var user_login=db.model('user_login',{ma_sinh_vien:String, tai_khoan:String, mat_khau: String},'sinhvien');
user_login.findOne({'ma_sinh_vien':'12020282'},function(err,result){
	console.log(result.mat_khau);
	mongoose.disconnect();
});
