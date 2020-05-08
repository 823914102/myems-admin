'use strict';

app.controller('EnergyFlowDiagramMasterController', function($scope) {

	$scope.$on('handleEmitEnergyFlowDiagramChanged', function(event) {
		$scope.$broadcast('handleBroadcastEnergyFlowDiagramChanged');
	});

});
