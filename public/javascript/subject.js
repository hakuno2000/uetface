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
            console.log(err);
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
                console.log(err);
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
                console.log(err);
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
                console.log(err);
            });
    }
    $scope.edit=function(data){
        $scope.purpose='Chỉnh sửa môn học';
        $scope.action='edit';
        $scope.subject=data;
    }
    $scope.doAction=function(){
        if($scope.subject){
            $http.post('/admin/subject/api',{action:$scope.action,subject:$scope.subject})
                .success(function(data){
                    console.log(data);
                }).error(function(data){
                    console.log(err);
                });
        }
    }
});