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
            res.json({type:'error',rp:'Đã có lỗi xảy ra!'});
        } else {
            data.rows=[];
            data.rows=paginatedResults;
            data.number_page=pageCount;
            res.json(data);
            if(mongoose.connection.readyState==1){
                mongoose.disconnect();
            }
        }
    },{columns:{'_id':0,'ma_mon':1,'ten_mon':1,'ma_danh_gia':1,'tin_chi':1,'khoa':1}});
});
router.post('/api',function(req,res,next){
    if(req.session.level){
        if(req.body.subject){
            if(req.body.action=='add'){
                if(req.body.subject.ma_mon!=''&&req.body.subject.ten_mon!=''&&req.body.subject.tin_chi!=''&&req.body.subject.ma_mon&&req.body.subject.ten_mon&&req.body.subject.tin_chi){
                        var subject=require('./../data/models/subjects');
                        if(mongoose.connection.readyState==0) mongoose.connect('mongodb://localhost/uetface');
                        subject.count({'ma_mon':req.body.subject.ma_mon},function(err,result){
                            if(err){
                                res.json({type:'error',rp:'Đã có lỗi xảy ra!'});
                                if(mongoose.connection.readyState==1) mongoose.disconnect();
                            }
                            else if(result>=1){
                                res.json({type:'error',rp:'Môn học đã tồn tại!'})
                                if(mongoose.connection.readyState==1) mongoose.disconnect();
                            }else{
                                var newSubject= new subject(req.body.subject);
                                newSubject.save(function(err){
                                    if(err) res.json({type:'error',rp:'Đã có lỗi xảy ra!'});
                                    res.json({type:'success',rp:'Thêm môn học thành công!'})
                                    if(mongoose.connection.readyState==1) mongoose.disconnect();
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
    if(req.session.level){
        if(req.body.action=='edit'){
            if(req.body.subject.ma_mon!=''&&req.body.subject.ten_mon!=''&&req.body.subject.tin_chi!=''&&req.body.subject.change!=''
                &&req.body.subject.ma_mon&&req.body.subject.ten_mon&&req.body.subject.tin_chi&&req.body.subject.change){
                var subject=require('./../data/models/subjects');
                if(mongoose.connection.readyState==0) mongoose.connect('mongodb://localhost/uetface');
                subject.count({'ma_mon':req.body.subject.change},function(err,result){
                    if(err){
                        res.json({type:'error',rp:'Đã có lỗi xảy ra!'});
                        if(mongoose.connection.readyState==1) mongoose.disconnect();
                    }else if(result!=1){
                        res.json({type:'error',rp:'Môn học không tồn tại!'})
                        if(mongoose.connection.readyState==1) mongoose.disconnect();
                    }else{
                        subject.update({'ma_mon':req.body.subject.change},{$set:{'ma_mon':req.body.subject.ma_mon,'ten_mon':req.body.subject.ten_mon,
                        'khoa':req.body.subject.khoa,'ma_danh_gia':req.body.subject.ma_danh_gia,'tin_chi':req.body.subject.tin_chi}},function(err,result){
                            if(err) {
                                res.json('index',{type:'error',rp:'Đã có lỗi xảy ra. Mời bạn thao tác lại!'});
                                if(mongoose.connection.readyState==1) mongoose.disconnect();
                            }
                            res.json('index',{type:'success',rp:'Môn học đã cập nhật thành công!'});
                            if(mongoose.connection.readyState==1) mongoose.disconnect();
                        });
                    }
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

        var ma_mon=req.query.ma_mon;
        var subject=require('./../data/models/subjects');
        if(mongoose.connection.readyState==0) mongoose.connect('mongodb://localhost/uetface');
        subject.count({'ma_mon':req.query.ma_mon},function(err,result){
            if(err){
                res.json({type:'error',rp:'Đã có lỗi xảy ra!'});
                if(mongoose.connection.readyState==1) mongoose.disconnect();
            }else if(result!=1){
                res.json({type:'error',rp:'Môn học không tồn tại!'})
                if(mongoose.connection.readyState==1) mongoose.disconnect();
            }else{
                subject.remove({'ma_mon':req.query.ma_mon},function(err,result){
                    if(err) {
                        res.json('index',{type:'error',rp:'Đã có lỗi xảy ra. Mời bạn thao tác lại!'});
                        if(mongoose.connection.readyState==1) mongoose.disconnect();
                    }
                    res.json('index',{type:'success',rp:'Môn học đã được xóa!'});
                    if(mongoose.connection.readyState==1) mongoose.disconnect();
                });
            }
        });
    }else{
        res.json({type:'error',rp:'Có lỗi xảy ra.'})
    }
});
module.exports=router;