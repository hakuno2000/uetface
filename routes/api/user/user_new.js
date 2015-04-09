/**
 * Created by PHI on 3/22/2015.
 */
var express=require('express');
var router=express.Router();
var dbURL=require('./../../data/dbURL');
var mongoose=require('mongoose');
var isNull=require('./../../isNull');
router.post('/',function(req,res){
    if(req.body.reg_user!=''&&req.body.reg_email!=''&&req.body.reg_pass!=''&&req.body.std_id!=''){
        var user_reg=require('./../../data/models/user_reg');
        if(mongoose.connection.readyState==0) mongoose.connect(dbURL);
        if(req.body.reg_user.length<6){
            res.json({type:'error',content:'Tài khoản nhỏ hơn 6 kí tự.'});
        }else{
            if(req.body.reg_pass.length<6){
                res.json({type:'error',content:'Mật khẩu nhỏ hơn 6 kí tự.'});
            }else{
                user_reg.findOne({'ma_sinh_vien':req.body.std_id},{_id:0,active:1},function(err,result){
                    if(err) {
                        res.json({type:'error',content:'Lỗi server!'});
                    }
                    if(isNull(result)){ res.json({type:'error',content:'Mã sinh viên không tồn tại'});}
                    else{
                        if(result.active==0){
                            user_reg.findOne({'tai_khoan':req.body.reg_user.toLowerCase()},{_id:0},function(err,result){
                                if(err) {
                                    res.json({type:'error',content:'Lỗi server!'});
                                }
                                if(!isNull(result)){
                                    res.json({type:'error',content:'Tên tài khoản đã được đăng kí. Mời bạn chọn tài khoản khác'});
                                }
                                else{
                                    user_reg.findOne({'email':req.body.reg_email.toLowerCase()},function(err,result){
                                        if(err) {
                                            res.json({type:'error',content:'Lỗi server!'});
                                            
                                        }
                                        if(!isNull(result)){
                                            res.json({type:'error',content:'Email đã được đăng kí. Mời bạn chọn email khác.'});
                                            
                                        }else{
                                            var now=new Date();
                                            var makeToken=require('./../../decode/sha256');
                                            var token=makeToken.SHA256(now.toJSON()+md5.MD5(req.body.reg_pass.toLowerCase()+secretKey).toString()).toString();
                                            user_reg.update({'ma_sinh_vien':req.body.std_id},{$set:{'tai_khoan':req.body.reg_user,
                                                'mat_khau':md5.MD5(req.body.reg_pass.toLowerCase()+secretKey).toString(),'email':req.body.reg_email.toLowerCase(),
                                                'active':1,'gioi_tinh':req.body.sex.toLowerCase(),'token':token}},function(err,result){
                                                if(err) {
                                                    console.log(err);
                                                    res.json({type:'error',content:'Lỗi server!'});
                                                }
                                                res.json({type:'success',token:token});
                                            });
                                        }
                                    });
                                }
                            });
                        }else{
                            res.json({type:'error',content:'Tài khoản đã được đăng kí!'});
                        }
                    }
                });
            }
        }
    }
});
module.exports=router;