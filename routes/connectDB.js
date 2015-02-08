/**
 * Created by Phi on 2/7/2015.
 */

var config = {
    host: 'sql3.freesqldatabase.com',
    user: 'sql366657',
    password: 'rW7*fC9*',
    database: 'sql366657'
};
var connect=function(mysql){
    return mysql.createConnection(config);
}
module.exports=connect;