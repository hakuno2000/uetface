var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');
var dbURL=require('./data/dbURL');
var md5=require('./decode/md5');
var secretKey=require('./secretKey');
var isNull=require('./isNull');
/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.session.username){
        res.redirect('/users');
    }else {
        res.render('index', { title: 'UETFACE' });
    }
});
router.post('/',function(req,res,next){
    console.log(req.body);
    if(req.body.username!=''&&req.body.password&&req.body.login!='') {
        var user_login=require('./data/models/user_login');
        if(mongoose.connection.readyState==0) mongoose.connect(dbURL);
        user_login.findOne({'tai_khoan':req.body.username},{_id:0,ma_sinh_vien:1,mat_khau:1},function(err,result){
            if (err) console.log(err);
            if(!isNull(result)){
                if (md5.MD5(req.body.password+secretKey).toString() == result.mat_khau) {
                    req.session.username = req.body.username;
                    req.session.user_id =result.ma_sinh_vien;
                    console.log(result);
                    res.redirect('/users');
                }
            }else{
                res.redirect('/');
            }
            if(mongoose.connection.readyState==1) mongoose.disconnect();
        });
    }else if(req.body.login){
        res.render('index',{title:'UETFACE',Log_rp:'Chưa nhập tài khoản hoặc mật khẩu!'});
    }else if(req.body.reg_user!=''&&req.body.reg_email!=''&&req.body.reg_pass!=''&&req.body.std_name!=''
            &&req.body.std_class!=''&&req.body.std_id!=''){
        var user_reg=require('./data/models/user_reg');
        if(mongoose.connection.readyState==0) mongoose.connect(dbURL);
        if(req.body.reg_user.length<6){
            res.render('index',{title:'UETFACE',Reg_rp:'Tài khoản nhỏ hơn 6 kí tự.'});
            if(mongoose.connection.readyState==1) mongoose.disconnect();
        }else{
            if(req.body.reg_pass.length<6){
                res.render('index',{title:'UETFACE',Reg_rp:'Mật khẩu nhỏ hơn 6 kí tự.'});
                if(mongoose.connection.readyState==1) mongoose.disconnect();
            }else{
                user_reg.findOne({'ma_sinh_vien':req.body.std_id},{_id:0,active:1},function(err,result){
                    if(err) {
                        res.render('index',{title:'UETFACE',Reg_rp:'Đã có lỗi xảy ra. Mời bạn thao tác lại'});
                        if(mongoose.connection.readyState==1) mongoose.disconnect();
                    }
                    if(isNull(result)){ res.render('index',{title:'UETFACE',Reg_rp:'Mã sinh viên không tồn tại'});}
                    else{
                        if(result.active==0){
                            user_reg.findOne({'tai_khoan':req.body.reg_user.toLowerCase()},{_id:0},function(err,result){
                                if(err) {
                                    res.render('index',{title:'UETFACE',Reg_rp:'Đã có lỗi xảy ra. Mời bạn thao tác lại'});
                                    if(mongoose.connection.readyState==1) mongoose.disconnect();
                                }
                                if(!isNull(result)){
                                    res.render('index',{title:'UETFACE',Reg_rp:'Tên tài khoản đã được đăng kí. Mời bạn chọn tài khoản khác.'});
                                    if(mongoose.connection.readyState==1) mongoose.disconnect();
                                }
                                else{
                                    user_reg.findOne({'email':req.body.reg_email.toLowerCase()},function(err,result){
                                        if(err) {
                                            res.render('index',{title:'UETFACE',Reg_rp:'Đã có lỗi xảy ra. Mời bạn thao tác lại'});
                                            if(mongoose.connection.readyState==1) mongoose.disconnect();
                                        }
                                        if(!isNull(result)){
                                            res.render('index',{title:'UETFACE',Reg_rp:'Email đã được đăng kí. Mời bạn chọn email khác.'});
                                            if(mongoose.connection.readyState==1) mongoose.disconnect();
                                        }else{
                                            user_reg.update({'ma_sinh_vien':req.body.std_id},{$set:{'tai_khoan':req.body.reg_user,
                                                'mat_khau':md5.MD5(req.body.reg_pass.toLowerCase()+secretKey).toString(),'email':req.body.reg_email.toLowerCase(),
                                                'active':1,'gioi_tinh':req.body.sex.toLowerCase()}},function(err,result){
                                                if(err) {
                                                    console.log(err);
                                                    res.render('index',{title:'UETFACE',Reg_rp:'Đã có lỗi 1 xảy ra. Mời bạn thao tác lại'});
                                                    if(mongoose.connection.readyState==1) mongoose.disconnect();
                                                }
                                                res.render('index',{title:'UETFACE',Reg_rp:'Chúc mừng bạn đã đăng kí tài khoản thành công!'});
                                                if(mongoose.connection.readyState==1) mongoose.disconnect();
                                            });
                                        }
                                    });
                                }
                            });
                        }else{
                            res.render('index',{title:'UETFACE',Reg_rp:'Tài khoản đã được đăng kí!'});
                            if(mongoose.connection.readyState==1) mongoose.disconnect();
                        }
                    }
                });
            }
        }
    }
    else{
        res.render('index',{title:'Uet Face',Reg_rp:'Bạn đã nhập thiếu thông tin.'});
    }
});
module.exports = router;
