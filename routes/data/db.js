/**
 * Created by PHI on 3/7/2015.
 */
var mongoose=require('mongoose');
var dbURL=require('./dbURL');
if(mongoose.connection.readyState==1){
    mongoose.disconnect();
}
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected on app termination');
        process.exit(0);
    });
}).on('SIGTERM',function() {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected on app termination');
        process.exit(0);
    });
});
var db=mongoose.connect(dbURL,{server:{auto_reconnect:true}});
module.exports=db;
