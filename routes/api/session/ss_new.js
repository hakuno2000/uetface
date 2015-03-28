/**
 * Created by PHI on 3/22/2015.
 */
var express=require('express');
var router=express.Router();
var mongoose=require('mongoose');
var isNull=require('./../../isNull');
var secretKey=require('./../../secretKey');
var crypto=require('crypto');
var dbURL=require('./../../data/dbURL');
router.post('/',function(req,res){
    if(req.body.action!='',req.body.username!=''&&req.body.password) {
        if(req.body.username&&req.body.password){
            var user_login=require('./../../data/models/user_login');
            if(mongoose.connection.readyState==0) mongoose.connect(dbURL);
            user_login.findOne({'tai_khoan':req.body.username},{_id:0,ma_sinh_vien:1,mat_khau:1},function(err,result){
                if (err) {
                    console.log(err);
                    if(mongoose.connection.readyState==1) mongoose.disconnect();
                }
                if(!isNull(result)){
                    if (crypto.createHash('md5').update(req.body.password+secretKey).digest('hex') == result.mat_khau) {
                        //make token
                        var now=new Date();
                        var token=crypto.createHash('sha256').update(now.toJSON()+result.mat_khau+result.ma_sinh_vien).digest('hex');
                        user_login.update({'tai_khoan':req.body.username},{$set:{token:token}},function(err,result){
                            if(err) {
                                res.json({type:'error',content:'Lỗi server!'})
                            }
                            res.json({type:'success',token:token});
                            if(mongoose.connection.readyState==1) mongoose.disconnect();
                        });
                    }else{
                        res.json({type:'error',content:'Mật khẩu không đúng!'});
                    }
                }else{
                    res.json({type:'error',content:'Tài khoản không tồn tại!'});
                }
            });
        }else{
            res.json({type:'error',content:'Bạn chưa nhập đủ thông tin!'});
        }

    }else{
        res.json({type:'error',content:'Bạn chưa nhập đủ thông tin!'});
    }
});
module.exports=router;