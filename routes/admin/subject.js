/**
 * Created by Phi on 2/8/2015.
 */
var express=require('express');
var router=express.Router();
var mysql=require('mysql');
var connect=require('./../connectDB')
router.get('/', function (req,res,next) {
    if(req.session.level){
        res.render('admin/subject',{title:'Quản lí môn học',ad:req.session.user_ad});
    }else{
        res.redirect('/admin');
    }
});
router.get('/api',function(req,res,next){
    var listclass=connect(mysql);
    listclass.query('select * from monhoc',function(err,rows,fields){
        if(err) ;
        res.json(rows);
    });
    listclass.end();
});
router.post('/',function(req,res,next){
    if(req.session.level){
        if(req.body.ma_mon!=''&&req.body.ten_mon!=''&&req.body.khoa&&req.body.tin_chi){
            var check_subject=connect(mysql);
            check_subject.query('select * from monhoc where ma_mon="'+req.body.ma_mon+'"',function(err,rows,fields){
                if(err) res.render('admin/subject',{title:'Quản lí môn học',ad:req.session.user_ad,rp:'Lỗi truy vấn.'});
                if(rows.length>0){
                    res.render('admin/subject',{title:'Quản lí môn học',ad:req.session.user_ad,rp:'Mã môn đã tồn tại.'});
                }
                if(rows.length==0) {
                    var create_subject = connect(mysql);
                    var subject = {
                        ma_mon: req.body.ma_mon,
                        ten_mon: req.body.ten_mon,
                        khoa: req.body.khoa,
                        tin_chi: req.body.tin_chi,
                        mo_ta: req.body.mo_ta
                    };
                    create_subject.query('INSERT INTO monhoc SET ?',subject,function(err,result){
                       if(err) res.render('admin/subject',{title:'Quản lí môn học',ad:req.session.user_ad,rp:'Đã xảy ra lỗi.'});
                       else{
                           res.render('admin/subject',{title:'Quản lí môn học',ad:req.session.user_ad,rp:'Môn học thêm thành công.'});
                       }
                    });
                }
            });
        }else{
            res.render('admin/subject',{title:'Quản lí môn học',ad:req.session.user_ad,rp:'Bạn đã nhập thiếu thông tin.'})
        }
    }else{
        res.redirect('/admin');
    }
});

module.exports=router;