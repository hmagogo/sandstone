/**
 * Created by HMX on 2016/8/3.
 */
sdsomwebApp.directive('ngFixedCol', [function () {
    'use strict';
    return {
        link: function ($scope, $elem, $attrs, $ctrl) {
            var self          = $elem[0],
                $self         = angular.element(self),
                $wrapper      = $self.closest('.table-wrapper'),
                $fixedHeads   = $wrapper.find('.fixed-body'),
                $fixedColumns = $wrapper.find('.fixed-column');

            /*
             * return void
             * bind scroll event
             */
            $self.bind('scroll', function() {
                // col
                $fixedColumns.find('.tbody table').css({
                    'margin-top': -$self.scrollTop()
                });
                // head
                $fixedHeads.find('.thead table').css({
                    'margin-left': -this.scrollLeft
                });
            });

        }
    };
}]);
