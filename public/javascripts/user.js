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
                $("#"+day).html("<span id='lophoc'>"+$scope.theories[i].thong_tin_lop.thong_tin_mon.ten_mon +"<br>(" + $scope.theories[i].thong_tin_lop.giang_duong + ")</span>");

            }


            for(i = 0 ; i < $scope.practices.length ; i++){
                day = chuyen($scope.practices[i].thong_tin_lop.thu )+ "_" + $scope.practices[i].thong_tin_lop.tiet_bat_dau;
                number = $scope.practices[i].thong_tin_lop.tiet_ket_thuc - $scope.practices[i].thong_tin_lop.tiet_bat_dau + 1 ;
                xoa(day,number);

                $("#"+day).html("<span id='lophoc'>"+$scope.practices[i].thong_tin_lop.thong_tin_mon.ten_mon +"<br>(" + $scope.practices[i].thong_tin_lop.giang_duong + ")</span>");
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
                    obj.period= $scope.name_mon[i].tiet_bat_dau+ "-" + $scope.name_mon[i].tiet_ket_thuc;
                    obj.day=$scope.name_mon[i].thu;
                    obj.note=$scope.name_mon[i].ghi_chu;
                    obj.class_id=$scope.name_mon[i].ma_lop;
                    obj.value = $scope.name_mon[i].thong_tin_mon.ten_mon;
                    tenMon[i] = obj;
                }
                $("#subject").autocomplete({
                    source : tenMon,
                    focus: function( e, ui ) {
                        $("#class_id").val(ui.item.class_id);
                        $("#thu").val(ui.item.day);
                        $("#tiet").val(ui.item.period);
                        $("#ghi_chu").val(ui.item.note);
                        //var ti = "Thứ " + $scope.name_mon[ui.item.value].thu + "(" + $scope.name_mon[ui.item.value].tiet_bat_dau + "-" + $scope.name_mon[ui.item.value].tiet_ket_thuc + ")";
                        //e.toElement.title = ti;
                    }
                })

            }).error(function(data){
                console.log("error");
            });
        $scope.add=function(){
            var data={};
            data.class_id=$('#class_id').val();
            data.ghi_chu=$('#ghi_chu').val();
            $http.post('/api/user/add_class',data)
                .success(function(data){
                    $scope.rp=data;
                }).error(function(data){
                    console.log(data);
                });
        }
});




