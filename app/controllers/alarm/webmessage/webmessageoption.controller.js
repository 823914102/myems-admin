'use strict';

app.controller('WebMessageOptionController', function($scope, $timeout,
	WebMessageAnalysisService) {
	$scope.daterange = {
		startDate: moment().subtract(7,'days'),
		endDate: moment()
	};
	$scope.dtOptions = {
		timePicker: false,
		timePicker24Hour: true,
		timePickerIncrement: 1,
		timePickerSeconds: true,
		startView:2,
		autoApply: true,
		locale:{
			format: 'YYYY-MM-DD',
			applyLabel: "确定",
			cancelLabel: "取消",
		},

		eventHandlers:{
			'apply.daterangepicker':function(ev,picker){
				//$scope.execute();
			}
		}

	};

	$scope.execute = function() {
		var query = {
			datestart: $scope.daterange.startDate.format().slice(0, 10),
			dateend: $scope.daterange.endDate.format().slice(0, 10)
		};
		$scope.$emit('handleEmitWebMessageOptionChanged', {
			load: true,
			period:$scope.currentPeriod
		});
		WebMessageAnalysisService.getAnalysisResult(query, function(error, data) {
				if (!error) {
					$scope.$emit('handleEmitWebMessageOptionChanged', data);
				}
		});

	};
	$timeout(function() {
		$scope.execute();
	}, 0);
	$scope.$on('handleBroadcastWebMessageTableChanged', function(event) {
		$scope.execute();
	});
});
