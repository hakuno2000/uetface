/**
 * Created by Phi on 2/7/2015.
 */
var express = require('express');
var router = express.Router();
var connection=require('./../connectDB');
var mysql=require('mysql');
router.get('/',function(req,res,next){
    if(req.session.level) {
        res.render('admin/ad_dashboard',{ad:req.session.user_ad});
    }else{
        res.render('admin/admin');
    }
});
router.post('/',function(req,res,next){
    if(req.body.login&&req.body.user!=''&&req.body.pass!=''){
        var connector=connection(mysql);
        connector.query('select * from admin where username="'+req.body.user+'"',function(err,rows,fields){
            if(err) res.render('admin/admin',{log_rp:'Lỗi đăng nhập.'});
            if(rows.length>0){
                if(rows.length>1) res.redirect('/admmin');
                rows.forEach(function(row){
                    if(row.password==req.body.pass){
                        req.session.user_ad=req.body.user;
                        req.session.level=row.level;
                        res.render('admin/ad_dashboard',{ad:req.session.user_ad});
                    }else{
                        res.redirect('/admin');
                    }
                });
            }
            else{
                res.redirect('/admin');
            }
        });
        connector.end(function(err){
            if(err){
                res.redirect('/admin');
            }
        })
    }
    else{
        res.redirect('/admin');
    }
});

module.exports=router;