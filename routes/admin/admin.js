/**
 * Created by Phi on 2/7/2015.
 */
var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');
var dbURL=require('./../data/dbURL');
router.get('/',function(req,res,next){
    if(req.session.level) {
        res.render('admin/dashboard',{title:'Quản trị viên',ad:req.session.user_ad});
    }else{
        res.render('admin/admin',{title:'Quản trị viên'});
    }
});
router.post('/',function(req,res,next){
    var admin=require('./../data/models/admin');
    if(mongoose.connection.readyState==0) mongoose.connect(dbURL);
    if(req.body.user!=''&&req.body.pass!=''){
        admin.findOne({'username':req.body.user},function(err,result){
            if(err) res.render('admin/admin',{title:"Quản trị viên",log_rp:'Lỗi đăng nhập.'});
            if(result.password==req.body.pass){
               req.session.user_ad=req.body.user;
               req.session.level=result.level;
               res.render('admin/dashboard',{title:'Quản trị viên',ad:req.session.user_ad});
            }else{
                res.redirect('/admin');
            }
            if(mongoose.connection.readyState==1) mongoose.disconnect();
        });
    }
    else{
        res.redirect('/admin');
    }
});

module.exports=router;