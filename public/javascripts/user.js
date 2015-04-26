/**
 * Created by Phi on 3/30/2015.
 */
var day, i , number;
var my_tenMon = [];
var my_thu = [];
var my_tiet = [];

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

function check_tiet(tiet1 , tiet2){
    var t1_1 = Number(tiet1.split("-")[0]);
    var t1_2 = Number(tiet1.split("-")[1]);
    var t2_1 = Number(tiet2.split("-")[0]);
    var t2_2 = Number(tiet2.split("-")[1]);
    if(t2_1 >= t1_1 && t2_1 <= t1_2) return true;
    else if (t2_2 >= t1_1 && t2_2 <= t1_2) return true;
    else return false;
}


var user=angular.module('user',[]);
user.controller('timetable',function($scope,$http,$q){
    var getClass=function(){
        $http.get('/api/user/find_class')
            .success(function(data){
                $scope.theories=data[0];
                $scope.practices=data[1];
                for(i = 0 ; i < $scope.theories.length ; i++){
                    my_tenMon[i] = $scope.theories[i].thong_tin_lop.thong_tin_mon.ten_mon;
                    my_thu[i] = $scope.theories[i].thong_tin_lop.thu;
                    my_tiet[i] = $scope.theories[i].thong_tin_lop.tiet_bat_dau + "-" + $scope.theories[i].thong_tin_lop.tiet_ket_thuc;

                    day = chuyen($scope.theories[i].thong_tin_lop.thu )+ "_" + $scope.theories[i].thong_tin_lop.tiet_bat_dau;
                    number = $scope.theories[i].thong_tin_lop.tiet_ket_thuc - $scope.theories[i].thong_tin_lop.tiet_bat_dau + 1 ;
                    xoa(day,number);
                    if($scope.theories[i].thong_tin_lop.hasOwnProperty("lich_thi")){
                        var lichthi=$scope.theories[i].thong_tin_lop.lich_thi.gio+" thứ "+$scope.theories[i].thong_tin_lop.lich_thi.thu+" ngày "+$scope.theories[i].thong_tin_lop.lich_thi.ngay+"\n" +
                            "Giảng đường: "+$scope.theories[i].thong_tin_lop.lich_thi.giang_duong+"\nHình thức thi: "+$scope.theories[i].thong_tin_lop.lich_thi.HTT;
                    }
                    else{
                        var lichthi="Không có dữ liệu về lịch thi";
                    }
                    $("#"+day).html("<span class='lophoc' class_id='"+$scope.theories[i].ma_lop+"' ghi_chu='"+ $scope.theories[i].ghi_chu +"' lich_thi='"+ lichthi +"'>"+$scope.theories[i].thong_tin_lop.thong_tin_mon.ten_mon +"<br>(" + $scope.theories[i].thong_tin_lop.giang_duong + ")</span>");
                }

                var j = $scope.theories.length;
                for(i = 0 ; i < $scope.practices.length ; i++){
                    my_tenMon[j+i] = $scope.practices[i].thong_tin_lop.thong_tin_mon.ten_mon;
                    my_thu[j+i] = $scope.practices[i].thong_tin_lop.thu;
                    my_tiet[i+j] = $scope.practices[i].thong_tin_lop.tiet_bat_dau + "-" + $scope.practices[i].thong_tin_lop.tiet_ket_thuc;

                    day = chuyen($scope.practices[i].thong_tin_lop.thu )+ "_" + $scope.practices[i].thong_tin_lop.tiet_bat_dau;
                    number = $scope.practices[i].thong_tin_lop.tiet_ket_thuc - $scope.practices[i].thong_tin_lop.tiet_bat_dau + 1 ;
                    xoa(day,number);
                    $("#"+day).html("<span class='lophoc' class_id='"+$scope.practices[i].ma_lop+"' ghi_chu='"+ $scope.practices[i].ghi_chu +"' lich_thi='Mời bạn xem ở lớp lý thuyết!'>"+$scope.practices[i].thong_tin_lop.thong_tin_mon.ten_mon +"<br>(" + $scope.practices[i].thong_tin_lop.giang_duong + ")</span>");
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
                "tài liệu môn học":{
                    name:"Tài liệu",
                    callback: function(key,options){
                        var link="http://bluebee-uet.com/listOfSubject/subject?subject_code="+$(this).attr('class_id').split(" ")[0];
                        var win=window.open(link, '_blank');
                        win.focus();
                    }
                },
                "lịch thi":{
                    name:"Lịch thi",
                    callback: function(key,options){
                        alert($(this).attr('lich_thi'));
                    }
                },
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
    $scope.load=function(){
        $scope.addClass=!$scope.addClass;
        $http.get('/api/user/add_class')
            .success(function(data){
                $scope.ly_thuyet= data[0];
                $scope.thuc_hanh = data[1];
                $scope.name_mon = $scope.ly_thuyet.concat($scope.thuc_hanh);

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
                           // console.log(my_tenMon[i] + "- thu" + my_thu[i] + " Tiet " + my_tiet[i]);
                            if (subject.value == my_tenMon[i]) {
                                $scope.rp = "Môn học này đã có ! ";
                                alert("Môn học này đã có !");
                                kiem_tra = false;
                                break;
                            }
                            if (thu.value == my_thu[i]) {

                                if (check_tiet(my_tiet[i], tiet.value)) {
                                    // 8 -10 vs 9-10
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

    }
    $scope.add=function(){
        console.log('demo');
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
}).controller('lich_thi',function($http,$scope){
    $scope.load = function() {
        $scope.lichThi = !$scope.lichThi;
        $http.get('/api/user/lich_thi')
            .success(function(data){
                $scope.rp = "hello";
            })
    }
});
