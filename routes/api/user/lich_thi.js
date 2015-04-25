/**
 * Created by PHI on 4/25/2015.
 */
/**
 * Created by Nguyen Le on 4/22/2015.
 */
var express=require('express');
var async=require('async');
var router=express.Router();
var mongoose=require('mongoose');
var isNull=require('./../../isNull');
var userNotLoggedIn=require('./../../users/user_not_logged_in');
router.get('/',userNotLoggedIn,function(req,res,next){
    var lichthi =require('./../../data/models/lichthi');
    async.parallel([
        function getLichThi(cb){
            lichthi.find({ma_sinh_vien:req.session.user_id}).exec(cb);
        }
    ],function(err, result){
        res.json(result);
    });
})
router.post('/',function(req,res,next){
    var user=require('./../../data/models/user_login');
    user.findOne({token:req.body.token}).exec(function(err,std){
        if(err) res.json({type:'error',content:'Có l?i x?y ra!'});
        else if(isNull(std)){
            res.json({type:'error',content:'Token không t?n t?i.'})
        }else {
            var lichthi =require('./../../data/models/lichthi');
            async.parallel([
                function getLichThi(cb){
                    lichthi.find({ma_sinh_vien:std.ma_sinh_vien}).exec(cb);
                }
            ],function(err, result){
                res.json(result);
            });
        }
    });
})
module.exports=router;