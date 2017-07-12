sdsomwebApp.directive("divTemplate", function(){
	"use strict";
	return{
		restrict: 'AE',
		replace: true,
		template: '<div id="{{idValue}}"class="modal hide fade"'
			+' tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'
			+'<div class="modal-header" style="font-size:15px;">'
			+'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>'
			+'<h3 id="myModalLabel">创建存储池</h3></div>'
			+'<div class="modal-body"><p>名称</p><p><input></p></div>'
			+'<div class="modal-footer"><button class="btn btn-primary">确定</button>'
			+'<button class="btn" data-dismiss="modal" aria-hidden="true">取消</button></div>'
			+'</div>',
		controller: function($scope, $attrs, $parse){
			var self = this;
			$scope.idValue = $attrs.divName;
		}
	}
})
