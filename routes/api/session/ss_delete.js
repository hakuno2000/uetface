/**
 * Created by PHI on 3/22/2015.
 */
var express=require('express');
var router=express.Router();
var mongoose=require('mongoose');
router.post('/',function(req,res){
    if(req.body.token){
        var user_login=require('./../../data/models/user_login');
        if(mongoose.connection.readyState==0) mongoose.connect(dbURL);
        var isNull=require('./../../isNull');
        user_login.findOne({'token':req.body.token},function(err,result){
            if (err) {
                console.log(err);
                
            }
            if(!isNull(result)){
                res.json({type:'error',content:'Phiên làm việc không tồn tại'});
                
            }else{
                user_login.update({'token':req.body.token},{$set:{token:''}},function(err,result){
                    if (err) {
                        console.log(err);
                        
                    }
                    
                });
            }
        });
    }else{
        res.json({type:'error',content:'Thiếu thông tin!'});
    }
});
module.exports=router;