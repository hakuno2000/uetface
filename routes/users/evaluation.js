/**
 * Created by Phi on 1/30/2015.
 */
var express=require('express');
var router=express.Router();
var userNotLoggedIn=require('./user_not_logged_in');
router.get('/',userNotLoggedIn,function(req,res,next){
     res.render('users/evaluation',{user:req.session.username,title:'Đánh giá môn học'});
});
router.get('/demo',function(req,res,next){
    var options = {
        root: __dirname + './../../public/',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };

    res.sendFile('dgmh.html', options, function (err) {
        if (err) {
            console.log(err);
            res.status(err.status).end();
        }});
});
router.post('/',userNotLoggedIn,function(req,res,next){
        if(req.body.subject!=''&&req.body.sub_id!=''&&req.body.cla_id!==''&&
            req.body.tea_id!=''&&req.body.cla_name!=''&&req.body.tea_name!=''&&req.body.date!=''
            &&req.body.q1!=''&&req.body.q2!=''&&req.body.q3!=''&&req.body.q4!=''&&req.body.q5!=''&&req.body.q6!=''
            &&req.body.q7!=''&&req.body.q8!=''&&req.body.q9!=''&&req.body.q10!=''&&req.body.q11!=''&&req.body.q12!=''
            &&req.body.q13!=''&&req.body.q14!=''&&req.body.q15!=''&&req.body.q16!=''&&req.body.q17!=''
            &&req.body.q18!=''&&req.body.q19!=''&&req.body.q20!=''&&req.body.q21!=''&&req.body.q22!=''&&req.body.q23!=''
        ){
            var form={
                ma_mon:req.body.sub_id,
                ma_giang_vien:req.body.tea_id,
                ma_sinh_vien:req.session.user_id,
                1:req.body.q1,
                2:req.body.q2,
                3:req.body.q3,
                4:req.body.q4,
                5:req.body.q5,
                6:req.body.q6,
                7:req.body.q7,
                8:req.body.q8,
                9:req.body.q9,
                10:req.body.q10,
                11:req.body.q11,
                12:req.body.q12,
                13:req.body.q13,
                14:req.body.q14,
                15:req.body.q15,
                16:req.body.q16,
                17:req.body.q17,
                18:req.body.q18,
                19:req.body.q19,
                20:req.body.q20,
                21:req.body.q21,
                22:req.body.q22,
                23:req.body.q23,
                comment:req.body.comment,
                date:req.body.date
            };
            var connection=connector(mysql);
            connection.query('INSERT INTO ketquadanhgia SET ?',form,function(err,results){
                if(err) throw err;
                else{
                    res.render('evaluation',{Rp_Form:'Đánh giá thành công.',user:req.session.username})
                }
            });
            connection.end(function(err){
                if(err){
                    throw err;
                }
            });
        }
});
module.exports=router;