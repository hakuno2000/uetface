/**
 * Created by Phi on 2/16/2015.
 */
var process=angular.module('Subject',[]);
process.controller('SubjectController',function($scope,$filter,$http){
    var orderBy = $filter('orderBy');
    $scope.action="add";
    $scope.submit='Thêm môn học';
    $scope.purpose='Thêm môn học';
    number_page='1';
    $scope.order = function(predicate, reverse) {
        $scope.classes = orderBy($scope.classes, predicate, reverse);
    };
    $scope.order('-ma_mon',false);
    $http.get('/admin/subject/api')
        .success(function(data){
            $scope.classes=data.rows;
            $scope.number_page=data.number_page;
        }).error(function(data){
            console.log(data);
        });
    $scope.setPage=function(n){
        if(n<=3){
            $scope.page_num=n;
            if(n<=3) $scope.page_show=1;
        }else if(n>=$scope.number_page-3){
            $scope.page_num=n;
            if(n>=$scope.number_page-3) $scope.page_show=$scope.number_page-4;
        }
        else{
            $scope.page_num=n;
            $scope.page_show=n-2;
        }
        $http.get('/admin/subject/api?page_num='+$scope.page_num+'&page_length='+$scope.page_length)
            .success(function(data){
                $scope.classes=data.rows;
                $scope.number_page=data.number_page;
                if($scope.page_num>$scope.number_page){
                    $scope.page_num=$scope.number_page;
                    $scope.page_show=$scope.number_page-4;
                }
                if($scope.page_show+4>$scope.number_page){
                    $scope.page_show=$scope.number_page-4;
                }
            }).error(function(data){
                console.log(data);
            });
    }
    $scope.Prev=function(){
        if($scope.page_num-1<1){

        }else{
            $scope.page_num=$scope.page_num-1;
            if($scope.page_num>=2&&$scope.page_num<=$scope.number_page-4){
                $scope.page_show=$scope.page_show-1;
            }else if($scope.page_num-$scope.page_show<0){
                $scope.page_show=$scope.page_num;
            }
        }
        $http.get('/admin/subject/api?page_num='+$scope.page_num+'&page_length='+$scope.page_length)
            .success(function(data){
                $scope.classes=data.rows;
                $scope.number_page=data.number_page;
            }).error(function(data){
                console.log(data);
            });
    }
    $scope.Next=function(){
        if($scope.page_num+1>$scope.number_page){

        }else{
            $scope.page_num=$scope.page_num+1;
            if($scope.page_num>=2&&$scope.page_num<=$scope.number_page-4){
                $scope.page_show=$scope.page_show+1;

            }else if($scope.page_num-$scope.page_show>4){
                $scope.page_show=$scope.page_num-4;
            }
        }
        $http.get('/admin/subject/api?page_num='+$scope.page_num+'&page_length='+$scope.page_length)
            .success(function(data){
                $scope.classes=data.rows;
                $scope.number_page=data.number_page;
            }).error(function(data){
                console.log(data);
            });
    }
    $scope.edit=function(data){
        $scope.purpose='Chỉnh sửa môn học';
        $scope.action='edit';
        $scope.enable=true;
        $scope.submit='Xác nhận chỉnh sửa.';
        $scope.subject=data;
        $scope.subject.change=data.ma_mon;
    }
    $scope.doAction=function(){
        if($scope.subject){
            if($scope.action=='add'){
                $http.post('/admin/subject/api',{action:$scope.action,subject:$scope.subject})
                    .success(function(data){
                        $scope.rp=data.rp;
                        if(data.type=='error'){
                            $scope.type_rp='color:red';
                        }else{
                            $scope.subject=angular.copy({});
                            $scope.type_rp='color:green';
                        }
                    }).error(function(data){
                        console.log(data);
                    });
            }else if($scope.action=='edit'){
                console.log($scope.subject);
                $http.put('/admin/subject/api',{action:$scope.action,subject:$scope.subject})
                    .success(function(data){
                        $scope.rp=data.rp;
                        if(data.type=='error'){
                            $scope.type_rp='color:red';
                        }else{
                            $scope.subject=angular.copy({});
                            $scope.type_rp='color:green';
                            $scope.enable=false;
                            $scope.action='add';
                            $scope.purpose='Thêm môn học';
                            $scope.submit='Thêm môn';
                        }
                    }).error(function(data){
                        console.log(data);
                    });
            }
        }
    }
    $scope.reset=function(){
        $scope.subject=angular.copy({});
        $scope.type_rp='color:green';
        $scope.enable=false;
        $scope.action='add';
        $scope.purpose='Thêm môn học';
        $scope.submit='Thêm môn';
    };
    $scope.remove=function(data){
        if(window.confirm('Bạn có chắc chắn không?')){
            console.log("it's ok");
            $http.delete('/admin/subject/api?ma_mon='+data.ma_mon,{})
                .success(function(data){
                    console.log(data);
                    $http.get('/admin/subject/api')
                        .success(function(data){
                            $scope.classes=data.rows;
                            $scope.number_page=data.number_page;
                        }).error(function(data){
                            console.log(data);
                        });
                }).error(function(data){
                    console.log(data);
                });
        }
    };
});