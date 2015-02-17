/**
 * Created by Phi on 2/8/2015.
 */
var express=require('express');
var router=express.Router();

router.get('/', function (req,res,next) {
    if(req.session.level){
        res.render('admin/teacher',{title:'Quản lí giáo viên',ad:req.session.user_ad});
    }else{
        res.redirect('/admin');
    }
});
router.post('/',function(req,res,next){

});

module.exports=router;