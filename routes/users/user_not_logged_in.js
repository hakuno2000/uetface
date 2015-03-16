/**
 * Created by Phi on 3/11/2015.
 */
function userNotLoggedIn(req,res,next){
    if(!req.session.username){
        res.end('Unauthorized',401);
    }else{
        next();
    }
}
module.exports=userNotLoggedIn;