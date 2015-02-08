/**
 * Created by Phi on 2/7/2015.
 */

var config = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'uetface'
};
var connect=function(mysql){
    return mysql.createConnection(config);
}
module.exports=connect;