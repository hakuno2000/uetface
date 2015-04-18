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
        var xoaPhantu = phantu.parentNode;
        xoaPhantu.removeChild(phantu);
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
}).controller('add_class',function($http,$scope){
        $http.get('/api/user/add_class')
            .success(function(data){
                $scope.name_mon=data[0];
                var tenMon = [];
                for(var i = 0 ; i < $scope.name_mon. length ;i++){
                    var obj = {};
                    obj.label = $scope.name_mon[i].thong_tin_mon.ten_mon;
                    obj.value = i;
                    tenMon[i] = obj;
                }
                $("#subject").autocomplete({
                    source : tenMon,
                    focus: function( e, ui ) {
                        var ti = "Thu " + $scope.name_mon[ui.item.value].thu + "(" + $scope.name_mon[ui.item.value].tiet_bat_dau + "-" + $scope.name_mon[ui.item.value].tiet_ket_thuc + ")";
                        e.toElement.title = ti;
                    },
                    close: function() {
                        class_id.value = $scope.name_mon[subject.value].ma_lop;
                        thu.value = $scope.name_mon[subject.value].thu;
                        ghi_chu.value = $scope.name_mon[subject.value].ghi_chu;
                        tiet.value = $scope.name_mon[subject.value].tiet_bat_dau + "-" + $scope.name_mon[subject.value].tiet_ket_thuc;
                        subject.value = $scope.name_mon[subject.value].thong_tin_mon.ten_mon;
                    }

                })

            }).error(function(data){
                console.log("error");
            });

});




