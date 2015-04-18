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

function chuyen_tiet(st , en){
    var tiet1 = [];
    for(var i = st ; i <= en ; i++){
        tiet1[i - st] = i;
    }
    return tiet1;
}
function check_tiet(t1 , t2){
    for(var i = 0 ; i < t1.length ; i++){
        for(var j = 0 ; j < t2.length ; j++){
            if(t1[i] == t2[j]){
                return true;
            }
        }
    }
    return false;
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
            //console.log(data);
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
                $("#subject").autocomplete({
                    source : tenMon,
                    focus: function( e, ui ) {
                        var ti = "Thu " + $scope.name_mon[ui.item.value].thu + "(" + $scope.name_mon[ui.item.value].tiet_bat_dau + "-" + $scope.name_mon[ui.item.value].tiet_ket_thuc + ")";
                        e.toElement.title = ti;
                    },
                    close: function() {
                        $scope.rp = "";
                        var maLop = $scope.name_mon[subject.value].ma_lop;
                        var thu_ = $scope.name_mon[subject.value].thu;
                        var ghiChu = $scope.name_mon[subject.value].ghi_chu;
                        var tenMon = $scope.name_mon[subject.value].thong_tin_mon.ten_mon;
                        var st = $scope.name_mon[subject.value].tiet_bat_dau;
                        var en = $scope.name_mon[subject.value].tiet_ket_thuc;
                        console.log(thu_ + " " + chuyen_tiet(st,en));
                        subject.value = tenMon;
                        var kiem_tra = true;
                        for(var i = 0 ; i < my_tenMon.length ; i++){
                            if(tenMon == my_tenMon[i]){
                                $scope.rp = "Môn học này đã có ! ";
                                alert("Môn học này đã có !");
                                kiem_tra = false;
                                break;
                            }
                            //console.log(my_thu[i]);
                            if(thu_ == my_thu[i]){
                                //alert(check_tiet(my_tiet[i] , chuyen_tiet(st,en)));
                                if(check_tiet(my_tiet[i] , chuyen_tiet(st,en))){
                                    $scope.rp = "Môn học đã bị trùng tiết !";
                                    alert("Môn học đã bị trùng tiết !");
                                    kiem_tra = false;
                                    break;
                                }
                            }
                            kiem_tra = true;
                        }
                        if(kiem_tra){
                            $scope.rp = "";
                            subject.value = tenMon;
                            class_id.value = maLop;
                            ghi_chu.value = ghiChu;
                            thu.value = thu_;
                            tiet.value = st + "-" + en;
                        }
                    }

                })

            }).error(function(data){
                //console.log("error");
            });

});




