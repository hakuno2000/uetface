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
function chuyen_tiet(st , en){
    var ti = [];
    for(var i = st ; i <= en ; i++){
        ti[i - st] = i;
    }
    return ti;
}
function check_tiet(tiet1 , tiet2){
    for(var i = 0 ; i < tiet1.length ; i++)
        for(var j = 0 ; j < tiet2.length; j++)
            if(tiet1[i] == tiet2[j]) return true;

    return false;
}


var user=angular.module('user',[]);
user.controller('timetable',function($scope,$http,$q){
    var getClass=function(){
        $http.get('/api/user/find_class')
            .success(function(data){
                $scope.theories=data[0];
                $scope.practices=data[1];
                for(i = 0 ; i < $scope.theories.length ; i++){
                    day = chuyen($scope.theories[i].thong_tin_lop.thu )+ "_" + $scope.theories[i].thong_tin_lop.tiet_bat_dau;
                    number = $scope.theories[i].thong_tin_lop.tiet_ket_thuc - $scope.theories[i].thong_tin_lop.tiet_bat_dau + 1 ;
                    xoa(day,number);
                    $("#"+day).html("<span class='lophoc' class_id='"+$scope.theories[i].ma_lop+"' ghi_chu='"+ $scope.theories[i].ghi_chu +"'>"+$scope.theories[i].thong_tin_lop.thong_tin_mon.ten_mon +"<br>(" + $scope.theories[i].thong_tin_lop.giang_duong + ")</span>");
                }


                for(i = 0 ; i < $scope.practices.length ; i++){
                    day = chuyen($scope.practices[i].thong_tin_lop.thu )+ "_" + $scope.practices[i].thong_tin_lop.tiet_bat_dau;
                    number = $scope.practices[i].thong_tin_lop.tiet_ket_thuc - $scope.practices[i].thong_tin_lop.tiet_bat_dau + 1 ;
                    xoa(day,number);

                    $("#"+day).html("<span class='lophoc' class_id='"+$scope.practices[i].ma_lop+"' ghi_chu='"+ $scope.practices[i].ghi_chu +"'>"+$scope.practices[i].thong_tin_lop.thong_tin_mon.ten_mon +"<br>(" + $scope.practices[i].thong_tin_lop.giang_duong + ")</span>");
                }

            }).error(function(data){
                console.log(data);
            });
    }
    getClass();
    $(function () {
        $.contextMenu({
            selector: '.lophoc',
            // superseeds "global" callback
            callback: function (key, options) {

            },
            items: {
                "edit": {
                    name: "Xóa môn",
                    callback: function (key, options) {
                        var del=confirm("Bạn có chắc chắn xóa môn này không?");
                        if(del==true){
                            var data={};
                            data.class_id=$(this).attr('class_id');
                            data.ghi_chu=$(this).attr('ghi_chu');
                            $http.post('/api/user/remove_class',data)
                                .success(function(data){
                                    getClass();
                                    location.reload();
                                }).error(function(data){
                                    console.log(data);
                                });
                        }

                    }
                },
                "exit": {
                    name: "Quay lại"
                }
            }
        });
    });
}).controller('add_class',function($http,$scope){
    $http.get('/api/user/add_class')
        .success(function(data){
            $scope.name_mon=data[0];

            var my_tenMon = [];
            var my_thu = [];
            var my_tiet = [];
            $http.get('/api/user/find_class')
                .success(function(data1){
                    $scope.theories=data1[0];
                    $scope.practices = data1[1];
                    var len = $scope.theories.length;
                    for(var i = 0 ; i < len ; i++){
                        my_tenMon[i] = $scope.theories[i].thong_tin_lop.thong_tin_mon.ten_mon;
                        my_thu[i] = $scope.theories[i].thong_tin_lop.thu;
                        my_tiet[i] = chuyen_tiet($scope.theories[i].thong_tin_lop.tiet_bat_dau , $scope.theories[i].thong_tin_lop.tiet_ket_thuc);
                    }
                    var len_total = len + $scope.practices.length;
                    for(var j = len ; j < len_total; j++){
                        var k = j - len;
                        my_tenMon[j] = $scope.practices[k].thong_tin_lop.thong_tin_mon.ten_mon;
                        my_thu[j] = $scope.practices[k].thong_tin_lop.thu;
                        my_tiet[j] = chuyen_tiet($scope.practices[k].thong_tin_lop.tiet_bat_dau , $scope.practices[k].thong_tin_lop.tiet_ket_thuc);
                    }
                }).error(function(data1){
                    //console.log(data);
                });


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
                },
                close: function(){
                    $scope.rp = "";
                    var kiem_tra = true;
                    for(var i = 0 ; i < my_tenMon.length ; i++) {
                        //console.log(my_tenMon[i] + "- thu" + my_thu[i] + " Tiet " + my_tiet[i]);
                        if (subject.value == my_tenMon[i]) {
                            $scope.rp = "Môn học này đã có ! ";
                            alert("Môn học này đã có !");
                            kiem_tra = false;
                            break;
                        }
                        if (thu.value == my_thu[i]) {
                            if (check_tiet(my_tiet[i], chuyen_tiet(tiet.value.split("-")[0], tiet.value.split("-")[0]))) {
                                $scope.rp = "Môn học đã bị trùng tiết !";
                                alert("Môn học đã bị trùng tiết !");
                                kiem_tra = false;
                                break;
                            }
                        }
                        kiem_tra = true;
                    }
                    if(kiem_tra == false){
                        class_id.value = "";
                        thu.value = "";
                        tiet.value = "";
                        ghi_chu.value = "";
                    }
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
                location.reload();
            }).error(function(data){
                console.log(data);
            });
    }
});
