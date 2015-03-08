/**
 * Created by Phi on 2/8/2015.
 */
var express=require('express');
var router=express.Router();
var mysql=require('mysql');
var connect=require('./../mysql/connectDB');
router.get('/', function (req,res,next) {
    if(req.session.level){
        res.render('admin/class',{title:"Quản lí lớp học",ad:req.session.user_ad});
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
    var list=connect(mysql);
    list.query('select * from lopmonhoc',function(err,rows,fields) {
        data.number_page=Math.ceil(rows.length/page_length);
        if(page_num>data.number_page) page_num=data.number_page;
        var list2=connect(mysql);
        list2.query('select lopmonhoc.ma_lop,lopmonhoc.ma_mon,monhoc.ten_mon,tiet_bat_dau,tiet_ket_thuc,ngay_hoc,giang_duong from lopmonhoc inner join monhoc on monhoc.ma_mon=lopmonhoc.ma_mon limit '+((page_num-1)*page_length)+','+(page_length),function(err,rows2,fields2){
            if(err) ;
            data.rows=rows2;
            res.json(data);
        });
        list2.end(function(err){
            if(err) console.log(err);
        });
    });
    list.end(function(err){
        if(err) console.log(err);
    });
});

module.exports=router;