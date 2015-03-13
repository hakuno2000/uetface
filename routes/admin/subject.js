/**
 * Created by Phi on 2/8/2015.
 */
var express=require('express');
var router=express.Router();
var mongoose=require('mongoose');
router.get('/', function (req,res,next) {
    if(req.session.level){
        res.render('admin/subject',{title:'Quản lí môn học',ad:req.session.user_ad});
    }else{
        res.redirect('/admin');
    }
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
    var subject=require('./../data/models/subjects');
    if(mongoose.connection.readyState==0) mongoose.connect('mongodb://localhost/uetface');
    subject.paginate({}, page_num, page_length, function(error, pageCount, paginatedResults, itemCount) {
        if (error) {
            console.error(error);
        } else {
            data.rows=[];
            data.rows=paginatedResults;
            data.number_page=pageCount;
            console.log(data);
            res.json(data);
            if(mongoose.connection.readyState==1){
                mongoose.disconnect();
            }
        }
    });
});
router.post('/api',function(req,res,next){
    if(req.session.level){
        if(req.body.subject){
            if(req.body.action=='add'){
                if(req.body.subject.ma_mon!=''&&req.body.subject.ten_mon!=''&&req.body.subject.khoa!=''&&req.body.subject.tin_chi!=''){
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
                                mo_ta: req.body.subject.mo_ta.showmore
                            };
                            create_subject.query('INSERT INTO monhoc SET ?',subject,function(err,result){
                                if(err) res.json({type:'error',rp:'Đã xảy ra lỗi.'});
                                else{
                                    res.json({type:'success',rp:'Môn học thêm thành công.'});
                                }
                            });
                            create_subject.end(function(err){
                                if(err) console.log(err);
                            });
                        }
                    });
                    check_subject.end(function(err){
                        if(err) console.log(err);
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
    if(req.session.level){
        if(req.body.action=='edit'){
            if(req.body.subject.ma_mon!=''&&req.body.subject.ten_mon!=''&&req.body.subject.khoa!=''&&req.body.subject.tin_chi!=''){
                var check_subject=connect(mysql);
                check_subject.query('select * from monhoc where ma_mon="'+req.body.subject.change+'"',function(err,rows,fields){
                    if(err) res.json({type:'error',rp:'Lỗi truy vấn.'});
                    if(rows.length!=1){
                        res.json({type:'error',rp:'Môn học không tồn tại.'});
                    }
                    if(rows.length==1) {
                        var update_subject = connect(mysql);
                        var subject = {
                            ma_mon_thay_doi: req.body.subject.change,
                            ma_mon: req.body.subject.ma_mon,
                            ten_mon: req.body.subject.ten_mon,
                            khoa: req.body.subject.khoa,
                            tin_chi: req.body.subject.tin_chi,
                            mo_ta: req.body.subject.mo_ta.showmore
                        };
                        var query='UPDATE monhoc SET ma_mon="'+subject.ma_mon+'",ten_mon="'+subject.ten_mon+'",khoa="'+subject.khoa+'",tin_chi="'+subject.tin_chi+'",mo_ta="'+subject.mo_ta+'" where ma_mon="'+subject.ma_mon_thay_doi+'"';
                        console.log(query)
                        update_subject.query(query,function(err,result){
                            if(err) res.json({type:'error',rp:'Đã xảy ra lỗi.'});
                            else{
                                res.json({type:'success',rp:'Chỉnh sửa môn học thành công.'});
                            }
                        });
                        update_subject.end(function(err){
                            if(err) console.log(err);
                        });
                    }
                });
                check_subject.end(function(err){
                    if(err) console.log(err);
                });
            }else{
                res.json({type:'error',rp:'Bạn đã nhập thiếu thông tin.'})
            }
        }else{
            res.json({type:'error',rp:'Đã có lỗi xảy ra! Sai phương thức!'})
        }
    }else{
        res.redirect('/admin');
    }
});
router.delete('/api',function(req,res){
    if(req.session.level){
        console.log(req.query.ma_mon);
        var ma_mon=req.query.ma_mon;
        var check_subject=connect(mysql);
        check_subject.query('select * from monhoc where ma_mon="'+ma_mon+'"',function(err,rows,fields){
            if(err) res.json({type:'error',rp:'Lỗi truy vấn.'});
            if(rows.length!=1){
                res.json({type:'error',rp:'Môn học không tồn tại.'});
            }
            if(rows.length==1) {
                var delete_subject = connect(mysql);
                var query='DELETE FROM monhoc where ma_mon="'+ma_mon+'"';
                delete_subject.query(query,function(err,result){
                    if(err) res.json({type:'error',rp:'Đã xảy ra lỗi.'});
                    else{
                        res.json({type:'success',rp:'Xóa môn học thành công.'});
                    }
                });
                delete_subject.end(function(err){
                    if(err) console.log(err);
                });
            }
        });
        check_subject.end(function(err){
            if(err) console.log(err);
        });
    }else{
        res.json({type:'error',rp:'Có lỗi xảy ra.'})
    }
});
module.exports=router;