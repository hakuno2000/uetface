/**
 * Created by Phi on 3/11/2015.
 */
function Isnull(target){
    for(var member in target){
        if(member!=undefined) return false;
    }
    return true;
}
module.exports=Isnull;