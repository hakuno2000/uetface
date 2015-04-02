var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');
var dbURL=require('./data/dbURL');
var secretKey=require('./secretKey');
var isNull=require('./isNull');
var crypto=require('crypto');
/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.session.username){
        res.redirect('/users');
    }else {
        res.render('index', { title: '4UET' });
    }
});
router.post('/',function(req,res,next){
    if(req.body.username!=''&&req.body.password&&req.body.login!='') {
        var user_login=require('./data/models/user_login');
        if(mongoose.connection.readyState==0) mongoose.connect(dbURL);
        user_login.findOne({'tai_khoan':req.body.username},{_id:0,ma_sinh_vien:1,mat_khau:1},function(err,result){
            if (err) console.log(err);
            if(!isNull(result)){
                if (crypto.createHash('md5').update(req.body.password+secretKey).digest('hex') == result.mat_khau) {
                    req.session.username = req.body.username;
                    req.session.user_id =result.ma_sinh_vien;
                    res.redirect('/users');
                }
            }else{
                res.redirect('/');
            }
            
        });
    }else if(req.body.login){
        res.render('index',{title:'4UET',Log_rp:'Chưa nhập tài khoản hoặc mật khẩu!'});
    }else if(req.body.reg_user!=''&&req.body.reg_email!=''&&req.body.reg_pass!=''&&req.body.std_name!=''
            &&req.body.std_class!=''&&req.body.std_id!=''){
        var user_reg=require('./data/models/user_reg');
        if(mongoose.connection.readyState==0) mongoose.connect(dbURL);
        if(req.body.reg_user.length<6){
            res.render('index',{title:'4UET',Reg_rp:'Tài khoản nhỏ hơn 6 kí tự.'});
            
        }else{
            if(req.body.reg_pass.length<6){
                res.render('index',{title:'4UET',Reg_rp:'Mật khẩu nhỏ hơn 6 kí tự.'});
                
            }else{
                user_reg.findOne({'ma_sinh_vien':req.body.std_id},{_id:0,active:1},function(err,result){
                    if(err) {
                        res.render('index',{title:'4UET',Reg_rp:'Đã có lỗi xảy ra. Mời bạn thao tác lại'});
                        
                    }
                    if(isNull(result)){ res.render('index',{title:'4UET',Reg_rp:'Mã sinh viên không tồn tại'});}
                    else{
                        if(result.active==0){
                            user_reg.findOne({'tai_khoan':req.body.reg_user.toLowerCase()},{_id:0},function(err,result){
                                if(err) {
                                    res.render('index',{title:'4UET',Reg_rp:'Đã có lỗi xảy ra. Mời bạn thao tác lại'});
                                    
                                }
                                if(!isNull(result)){
                                    res.render('index',{title:'4UET',Reg_rp:'Tên tài khoản đã được đăng kí. Mời bạn chọn tài khoản khác.'});
                                    
                                }
                                else{
                                    user_reg.findOne({'email':req.body.reg_email.toLowerCase()},function(err,result){
                                        if(err) {
                                            res.render('index',{title:'4UET',Reg_rp:'Đã có lỗi xảy ra. Mời bạn thao tác lại'});
                                            
                                        }
                                        if(!isNull(result)){
                                            res.render('index',{title:'4UET',Reg_rp:'Email đã được đăng kí. Mời bạn chọn email khác.'});
                                            
                                        }else{
                                            user_reg.update({'ma_sinh_vien':req.body.std_id},{$set:{'tai_khoan':req.body.reg_user,
                                                'mat_khau':crypto.createHash('md5').update(req.body.password+secretKey).digest('hex'),'email':req.body.reg_email.toLowerCase(),
                                                'active':1,'gioi_tinh':req.body.sex.toLowerCase()}},function(err,result){
                                                if(err) {
                                                    console.log(err);
                                                    res.render('index',{title:'4UET',Reg_rp:'Đã có lỗi 1 xảy ra. Mời bạn thao tác lại'});
                                                    
                                                }
                                                res.render('index',{title:'4UET',Reg_rp:'Chúc mừng bạn đã đăng kí tài khoản thành công!'});
                                                
                                            });
                                        }
                                    });
                                }
                            });
                        }else{
                            res.render('index',{title:'4UET',Reg_rp:'Tài khoản đã được đăng kí!'});
                            
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
