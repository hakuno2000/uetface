/**
 * Created by Phi on 3/30/2015.
 */
var day, i , number;
function xoa(tiet ,so_tiet){
    var part = tiet.split("_");
    var so = parseInt(part[1]);
    //console.log(tiet + "  " + so_tiet);
    for (var i = 1; i < so_tiet; i++){
        var phantu = document.getElementById(part[0] + "_" + (so + i));
        console.log(part[0] + "_" + (so + i));
        var xoaPhantu = phantu.parentNode;

        xoaPhantu.removeChild(phantu);
        //phantu.parentNode.removeChild(phantu);
    }
    document.getElementById(tiet).setAttribute("rowspan",so_tiet);
}
function chuyen(thu){
    if(thu == 2) return "mon";
    if(thu == 3) return "tue";
    if(thu == 4) return "wed";
    if(thu == 5) return "thu";
    if(thu == 6) return "fri";
    if(thu == 7) return "sat";
    if(thu == "CN") return "sun";
}
var user=angular.module('user',[]);
user.controller('timetable',function($scope,$http,$q){
    $http.get('/api/user/find_class')
        .success(function(data){
            $scope.theories=data[0];
            $scope.practices=data[1];

            //alert($scope.theories[0].thong_tin_lop.thong_tin_mon.ten_mon);

            for(i = 0 ; i < $scope.theories.length ; i++){
                day = chuyen($scope.theories[i].thong_tin_lop.thu )+ "_" + $scope.theories[i].thong_tin_lop.tiet_bat_dau;
                number = $scope.theories[i].thong_tin_lop.tiet_ket_thuc - $scope.theories[i].thong_tin_lop.tiet_bat_dau + 1 ;
                xoa(day,number);
                $("#"+day).html($scope.theories[i].thong_tin_lop.thong_tin_mon.ten_mon +"<br>(" + $scope.theories[i].thong_tin_lop.giang_duong + ")");

            }


            for(i = 0 ; i < $scope.practices.length ; i++){
                day = chuyen($scope.practices[i].thong_tin_lop.thu )+ "_" + $scope.practices[i].thong_tin_lop.tiet_bat_dau;
                number = $scope.practices[i].thong_tin_lop.tiet_ket_thuc - $scope.practices[i].thong_tin_lop.tiet_bat_dau + 1 ;
                xoa(day,number);

                $("#"+day).html($scope.practices[i].thong_tin_lop.thong_tin_mon.ten_mon +"<br>(" + $scope.practices[i].thong_tin_lop.giang_duong + ")");
            }

        }).error(function(data){
            console.log(data);
        });
});




