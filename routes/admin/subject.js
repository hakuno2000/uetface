/**
 * Created by Phi on 2/8/2015.
 */
var express=require('express');
var router=express.Router();
var mysql=require('mysql');
var connect=require('./../connectDB')
router.get('/', function (req,res,next) {
    //if(req.session.level){
        res.render('admin/subject',{title:'Quản lí môn học',ad:req.session.user_ad});
    //}else{
    //    res.redirect('/admin');
    //}
});

router.get('/api',function(req,res,next){
    var data={number_page:1};
    if(req.query.page_num){
       var page_num=req.query.page_num;
    }else{
       var page_num=1;
    }
    if(req.query.page_length){
        var page_length=req.query.page_length;
    }else{
        var page_length=10;
    }
    var list=connect(mysql);
    list.query('select * from monhoc',function(err,rows,fields) {
        data.number_page=Math.ceil(rows.length/page_length);
        if(page_num>data.number_page) page_num=data.number_page;
        var list2=connect(mysql);
        list2.query('select * from monhoc limit '+((page_num-1)*page_length)+','+(page_length),function(err,rows2,fields2){
            if(err) ;
            data.rows=rows2;
            res.json(data);
        });
        list2.end(function(err){
            if(err) ;
        });
    });
    list.end(function(err){
        if(err) ;
    });
});
router.post('/api',function(req,res,next){
    console.log(req.body);
    if(req.session.level){
        console.log(req.body);
        if(req.body.subject){
            if(req.body.action=='add'){
                if(req.body.subject.ma_mon!=''&&req.body.subject.ten_mon!=''&&req.body.subject.khoa&&req.body.subject.tin_chi){
                    var check_subject=connect(mysql);
                    check_subject.query('select * from monhoc where ma_mon="'+req.body.subject.ma_mon+'"',function(err,rows,fields){
                        if(err) res.json({type:'error',rp:'Lỗi truy vấn.'});
                        if(rows.length>0){
                            res.json({type:'error',rp:'Mã môn đã tồn tại.'});
                        }
                        if(rows.length==0) {
                            var create_subject = connect(mysql);
                            var subject = {
                                ma_mon: req.body.subject.ma_mon,
                                ten_mon: req.body.subject.ten_mon,
                                khoa: req.body.subject.khoa,
                                tin_chi: req.body.subject.tin_chi,
                                mo_ta: req.body.subject.mo_ta
                            };
                            create_subject.query('INSERT INTO monhoc SET ?',subject,function(err,result){
                                if(err) res.json({type:'error',rp:'Đã xảy ra lỗi.'});
                                else{
                                    res.json({type:'success',rp:'Môn học thêm thành công.'});
                                }
                            });
                        }
                    });
                }else{
                    res.json({type:'error',rp:'Bạn đã nhập thiếu thông tin.'})
                }
            }else{
                res.json({type:'error',rp:'Đã có lỗi xảy ra! Sai phương thức!'});
            }
        }
    }
    else{
        res.redirect('/admin');
    }
});
router.put('/api',function(req,res,next){
    console.log(req.body);
    if(true){
        if(req.body.action=='edit'){
            if(req.body.subject.ma_mon!=''&&req.body.subject.ten_mon!=''&&req.body.subject.khoa&&req.body.subject.tin_chi){
                var check_subject=connect(mysql);
                check_subject.query('select * from monhoc where ma_mon="'+req.body.subject.ma_mon+'"',function(err,rows,fields){
                    if(err) res.json({type:'error',rp:'Lỗi truy vấn.'});
                    if(rows.length!=1){
                        res.json({type:'error',rp:'Môn học không tồn tại.'});
                    }
                    if(rows.length==1) {
                        var update_subject = connect(mysql);
                        var subject = {
                            ma_mon: req.body.subject.ma_mon,
                            ten_mon: req.body.subject.ten_mon,
                            khoa: req.body.subject.khoa,
                            tin_chi: req.body.subject.tin_chi,
                            mo_ta: req.body.subject.mo_ta
                        };
                        var query='UPDATE monhoc SET ten_mon="'+subject.ten_mon+'",khoa="'+subject.khoa+'",tin_chi="'+subject.tin_chi+'",mo_ta="'+subject.mo_ta+'" where ma_mon="'+subject.ma_mon+'"';
                        console.log(query);
                        update_subject.query(query,function(err,result){
                            if(err) res.json({type:'error',rp:'Đã xảy ra lỗi.'});
                            else{
                                res.json({type:'success',rp:'Chỉnh sửa môn học thành công.'});
                            }
                        });
                    }
                });
            }else{
                res.json({type:'error',rp:'Bạn đã nhập thiếu thông tin.'})
            }
        }else{
            res.json({type:'error',rp:'Đã có lỗi xảy ra! Sai phương thức!'})
        }
    }
});
/*
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
*/
module.exports=router;