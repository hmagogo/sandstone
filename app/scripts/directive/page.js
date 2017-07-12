sdsomwebApp.directive("page", function () {
    "use strict";
    return {
        restrict: "E",
        scope: {
            totalCount: "=",
            pageCount: "=",
            currentPage: "=",
            selectSize: "&",
            goPage: "&",
            showMaxPage: "@",
            firstText: "@",
            lastText: "@",
            previousText: "@",
            nextText: "@",
            GO: "@"
        },

        templateUrl: "views/common/page.html",
        controller: function ($scope, $attrs, $parse) {
            //$scope.SelectdCollection = {};
            var self = this;

            //与下拉框绑定
            $scope.selectCount = 10;

            //设置下拉框中的数值
            $scope.pageSizeList = [10, 20, 50, 100, 200];

            //获得每页展示多少条记录，并求得页数
            this.init = function (defaultItemsPerPage) {
                if ($attrs.pageCount) {
                    $scope.$parent.$watch($parse($attrs.pageCount), function (value) {
                        self.pageCount = parseInt(value, 10);
                        $scope.totalPage = self.calculateTotalPages();
                    });
                } else {
                    this.pageCount = defaultItemsPerPage;
                }
            };

            //计算页数
            this.calculateTotalPages = function () {
                return Math.ceil($scope.totalCount / this.pageCount);
            };

            //监控总记录条数是否发生变化，如改变，需要重新计算页数
            $scope.$watch("totalCount", function () {
                $scope.totalPage = self.calculateTotalPages();
                if($scope.totalPage == undefined || isNaN($scope.totalPage)){
                	$scope.totalPage=1
                }
            });

            //回填PAGESIZE值
            $scope.$watch("pageCount", function (newValue, oldValue) {
                $scope.selectCount = newValue;
            });

            //监控总页数，调整展示页码
            $scope.$watch("totalPage", function () {
                //alert($scope.currentPage+ "=当前第几页=");
                $scope.pages = self.getPages($scope.totalPage, $scope.currentPage);
            });

            //监控下拉框中数值变化，调整展示页码
            $scope.changePage = function () {
                if ("" == $scope.selectCount || null == $scope.selectCount) {
                    $scope.selectCount = $scope.pageSizeList[0];
                    return;
                }
                $scope.selectSize({currentPage: "1", pageCount: $scope.selectCount});
            };
            //监控跳转的页数只能为数字
            $scope.$watch("GO", function () {
                var re = /[^\d]/g;
                if ($scope.GO !== "" && !re.test($scope.GO) && $scope.GO > 0) {
                    $scope.pages = self.getPages($scope.totalPage, $scope.currentPage);
                } else {
                    $scope.GO = "";
                }
            });
            //跳转到某一页
            $scope.setCurrentPage = function (pageno) {
                if (pageno == "..." || pageno == "" || pageno === 0) {
                    return;
                }
                else if(pageno > $scope.totalPage) {
                   // $scope.GO = $scope.totalPage;
                    pageno = $scope.totalPage;
                }

                $scope.goPage({currentPage: pageno, pageCount: this.pageCount});
                if (pageno != $scope.GO) {
                    $scope.GO = "";
                }
            };

            //监控当前页，然后调整展示页码
            $scope.$watch("currentPage", function () {
                $scope.pages = self.getPages($scope.totalPage, $scope.currentPage);
            });
        },
        replace: true,
        link: function (scope, element, attrs, ctrl) {

            ctrl.init(50);

            //根据总页数，当前页，以及页面展示最大数目，来取得展示情况
            // 1、总页数为0：展示第一页
            // 2、总页数<展示最大数目：展示全部
            // 3、当前页到末页<展示最大数据： 展示后6页
            // 4、首页与第二页: 展示前三页+"..."+后两页
            // 5、保持当前页在第二个页码列中。

            ctrl.getPages = function (totalPage, currentPage) {
                var pages = [];
                currentPage = parseInt(currentPage);
                totalPage = parseInt(totalPage);
                //总页数为0：展示第一页
                if (totalPage === 0) {
                    pages.push(1);
                }
                //总页数<最大展示页数：展示全部
                else if (totalPage <= attrs.showMaxPage) {
                    for (var i = 1; i <= totalPage; i++) {
                        pages.push(i);
                    }
                }
                //当前页靠近首页前4页，显示：首页前4页，..., 尾页后2页
                else if (totalPage > attrs.showMaxPage && currentPage <= 4) {
                    pages.push(1);
                    pages.push(2);
                    pages.push(3);
                    pages.push(4);
                    pages.push("...");
                    pages.push(totalPage - 1);
                    pages.push(totalPage);
                }
                // 当前页靠近尾页后4页，显示
                else if(totalPage > attrs.showMaxPage && (totalPage - currentPage) < 4){
                    pages.push(1);
                    pages.push(2);
                    pages.push("...");
                    pages.push(totalPage - 3);
                    pages.push(totalPage - 2);
                    pages.push(totalPage - 1);
                    pages.push(totalPage);
                }
                //当前页既不靠近首页前4页也不靠近尾页后4页，
                else {
                	pages.push(1);
                    pages.push(2);
                    pages.push("...");
                    pages.push(currentPage-1);
                    pages.push(currentPage);
                    pages.push(currentPage+1);
                    pages.push("....");
                    pages.push(totalPage);
                }
                return pages;
            };
        }
    };
});
