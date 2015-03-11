/**
 * Created by Phi on 3/11/2015.
 */
function adminNotLoggedIn(req,res,next){
    if(!req.session.level){
        res.end('Unauthorized',401);
    }else{
        next();
    }
}