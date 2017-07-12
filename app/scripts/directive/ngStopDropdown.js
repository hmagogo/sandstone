/**
 * Created by huangminxuan on 2016/5/16.
 */
sdsomwebApp.directive('ngStopDropdown', [function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            element.click(function (event) {
                event.stopPropagation();
            });
        }
    }
}]);
